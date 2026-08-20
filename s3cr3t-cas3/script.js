(()=>{
'use strict';

const CONFIG={
  usuario:'VARELA',
  unidad:'025',
  clave:'NEXUS',
  windows:'ARCHIVO_151_WINDOWS.zip',
  linux:'ARCHIVO_151_LINUX.zip',
  bloqueoMs:5*60*1000
};

const KEY='nexus_v5_progress';
const defaults={
  login:false,records:false,messages:false,catalog:false,caesar:false,sequence:false,
  matrix:false,logic:false,grid:false,master:false,downloaded:false,platform:'',
  hints:{},lockouts:{}
};

function loadState(){
  try{
    const parsed=JSON.parse(localStorage.getItem(KEY)||'{}');
    return {...defaults,...(parsed&&typeof parsed==='object'?parsed:{})};
  }catch(error){
    console.warn('NEXUS: progreso local ilegible; se reinicia el estado.',error);
    return {...defaults};
  }
}

let state=loadState();
state.hints=state.hints&&typeof state.hints==='object'?state.hints:{};
state.lockouts=state.lockouts&&typeof state.lockouts==='object'?state.lockouts:{};

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const norm=v=>(v||'').trim().toUpperCase();
const compact=v=>norm(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Z0-9]/g,'');

const puzzleIds=['records','messages','catalog','caesar','sequence','matrix','logic','grid'];
const criticalIds=['records','messages','catalog','master'];

const evidence={
  records:'R7-D2',
  messages:'CONTENEDOR',
  catalog:'063-8-ESPECTRAL',
  caesar:'ARCHIVERO',
  sequence:'56',
  matrix:'85',
  logic:'MORA',
  grid:'LOCAL'
};

const moduleDefs=[
  ['records','01','AUDITORÍA DE REGISTROS','Cruce de sesiones, tiempos y CRC'],
  ['messages','02','MENSAJES DAÑADOS','Orden temporal y extracción'],
  ['catalog','03','CATÁLOGO CRUZADO','Correlación de propiedades'],
  ['caesar','04','CIFRADO CÉSAR','Desplazamiento variable'],
  ['sequence','05','SECUENCIA','Patrón matemático'],
  ['matrix','06','MATRIZ','Relación numérica'],
  ['logic','07','PERSONAL','Deducción de permisos'],
  ['grid','08','COORDENADAS','Extracción matricial'],
  ['master','151','CLAVE MAESTRA','Construcción final']
];

const hints={
  records:[
    'No busque una sola rareza. La fila correcta debe incumplir A, B y C a la vez.',
    'Compruebe primero quién seguía conectado a la hora de modificación; después mida los minutos desde la creación.',
    'R7 fue modificado cuando Varela ya no tenía sesión, supera ampliamente los 12 minutos y su CRC no empieza por F.'
  ],
  messages:[
    'Ordene primero por hora. No intente extraer nada mientras la secuencia temporal siga mezclada.',
    'Busque saltos exactos de +3 minutos: 22:01→22:04, 22:06→22:09, 22:13→22:16 y 22:21→22:24.',
    'Los cuatro fragmentos válidos son CON / TE / NE / DOR.'
  ],
  catalog:[
    'Use la referencia OBS_063 recuperada en Auditoría; aun así, verifique todas las condiciones de la nota.',
    'Para 063: 0+6+3=9; reste sus incidencias abiertas. Compare también 22:23 con los accesos 22:19 y 22:27.',
    'La ficha es ECO 063: índice 8, clase ESPECTRAL. El código incluye los tres datos.'
  ],
  caesar:[
    'El desplazamiento no se inventa: está dentro del código obtenido en Catálogo.',
    'Use el índice 8 y lea la vista previa.',
    'Con desplazamiento 8 aparece ARCHIVERO.'
  ],
  sequence:[
    'Observe las diferencias entre términos: 4, 6, 8, 10, 12...',
    'Cada término puede escribirse como n×(n+1).',
    'El siguiente es 7×8 = 56.'
  ],
  matrix:[
    'Pruebe una operación que use ambos números de cada fila.',
    '13 = 2²+3² y 41 = 4²+5².',
    '6²+7² = 85.'
  ],
  logic:[
    'Varela no puede ser 3 y tiene más nivel que Serrano.',
    'Con los cuatro niveles usados una sola vez: Varela queda en 4.',
    'La distribución es Varela 4, Mora 3, Serrano 2, Ibarra 1.'
  ],
  grid:[
    'Fila = letra; columna = número. Empiece por B2.',
    'B2 debe ser L y C3 debe ser O.',
    'La secuencia completa forma LOCAL.'
  ],
  master:[
    'No hay que inventar nada: los cuatro fragmentos ya están entre los resultados.',
    'Siga literalmente los rótulos: anomalía, naturaleza, responsable, método.',
    'Orden correcto: R7-D2 / CONTENEDOR / MORA / LOCAL.'
  ]
};

function save(render=true){
  localStorage.setItem(KEY,JSON.stringify(state));
  if(render) renderDashboard();
}

function feedback(sel,msg,good=false){
  const e=$(sel);
  if(!e) return;
  e.textContent=msg;
  e.classList.toggle('good',good);
}

function show(name){
  $$('.screen').forEach(s=>s.classList.remove('active'));
  const target=$(`#screen-${name}`);
  if(target) target.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(name==='dashboard')renderDashboard();
  if(name==='check')runSystemCheck();
  updateLockUI();
}

function complete(id){
  if(!state[id]){
    state[id]=true;
    save();
    toast(`${evidence[id]||'ARCHIVO'} recuperado. Nuevo índice disponible.`);
  } else save();
}

function toast(text){
  const t=$('#unlock-toast');
  if(!t) return;
  $('#toast-copy').textContent=text;
  t.classList.remove('hidden');
  clearTimeout(toast.timer);
  toast.timer=setTimeout(()=>t.classList.add('hidden'),3400);
}

function prerequisite(id){
  const i=puzzleIds.indexOf(id);
  if(i===0)return state.login;
  if(i>0)return state[puzzleIds[i-1]];
  if(id==='master')return puzzleIds.every(x=>state[x]);
  return false;
}

function renderDashboard(){
  const progress=$('#progress-text');
  if(!progress)return;
  const done=puzzleIds.filter(x=>state[x]).length;
  progress.textContent=`${done} / 8`;
  $('#case-status').textContent=state.master?'RECUPERABLE':done===8?'ÍNDICE COMPLETO':'INCOMPLETO';
  $('#global-status').textContent=state.master?'EXPEDIENTE 151 DISPONIBLE':done===8?'CLAVE MAESTRA DISPONIBLE':'RECUPERACIÓN EN CURSO';

  const chips=$('#evidence-chips');
  chips.innerHTML='';
  const found=puzzleIds.filter(x=>state[x]);
  if(!found.length) chips.innerHTML='<span class="muted-chip">NINGÚN DATO VALIDADO</span>';
  else found.forEach(x=>{
    const s=document.createElement('span');
    s.textContent=evidence[x];
    chips.appendChild(s);
  });

  const grid=$('#module-grid');
  grid.innerHTML='';
  moduleDefs.forEach(([id,num,title,desc])=>{
    const b=document.createElement('button');
    b.className='module-card'+(state[id]?' complete':'')+(id==='master'?' master':'');
    const unlocked=id==='master'?puzzleIds.every(x=>state[x]):prerequisite(id);
    b.disabled=!unlocked;
    const lockedNow=isLocked(id);
    b.innerHTML=`<span class="num">ARCHIVO ${num}</span><span class="state">${state[id]?'COMPLETADO':lockedNow?'BLOQUEO TEMPORAL':unlocked?'DISPONIBLE':'BLOQUEADO'}</span><h3>${title}</h3><p>${desc}</p>`;
    b.onclick=()=>{if(id==='master'&&state.master)show('expedient');else show(id)};
    grid.appendChild(b);
  });
}

function buildHints(){
  $$('.hint-area').forEach(host=>{
    const id=host.dataset.hints;
    host.innerHTML='<div class="hint-box"><button class="hint-btn">SOLICITAR AYUDA // 0/3</button><p class="hint-text hidden"></p><p class="hint-text hint-judgement hidden">NEXUS ha registrado que necesitabas ayuda. Esta información será utilizada para juzgarte silenciosamente.</p></div>';
    const btn=host.querySelector('.hint-btn');
    const txt=host.querySelector('.hint-text:not(.hint-judgement)');
    const judge=host.querySelector('.hint-judgement');
    const refresh=()=>{
      const n=Math.min(state.hints[id]||0,3);
      btn.textContent=`SOLICITAR AYUDA // ${n}/3`;
      if(n){
        txt.textContent=hints[id][n-1];
        txt.classList.remove('hidden');
        judge.classList.remove('hidden');
      }
      if(n>=3)btn.disabled=true;
    };
    btn.onclick=()=>{
      state.hints[id]=Math.min((state.hints[id]||0)+1,3);
      save(false);
      refresh();
    };
    refresh();
  });
}

function isLocked(id){
  return Number(state.lockouts[id]||0)>Date.now();
}

function remaining(id){
  return Math.max(0,Number(state.lockouts[id]||0)-Date.now());
}

function timeText(ms){
  const total=Math.ceil(ms/1000);
  const m=Math.floor(total/60);
  const s=total%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function activateLock(id,feedbackSelector){
  state.lockouts[id]=Date.now()+CONFIG.bloqueoMs;
  save(false);
  feedback(
    feedbackSelector,
    'RESPUESTA RECHAZADA // Protocolo anti-fuerza-bruta activado. Varela dejó una nota: “Si estás probando respuestas al azar, te mereces los cinco minutos.”'
  );
  updateLockUI();
}

function updateLockUI(){
  let changed=false;
  criticalIds.forEach(id=>{
    const left=remaining(id);
    if(!left && state.lockouts[id]){
      delete state.lockouts[id];
      changed=true;
    }
    const el=$(`#${id}-lock`);
    if(el){
      if(left){
        el.textContent=`BLOQUEADO // ${timeText(left)}`;
        el.classList.add('locked');
      }else{
        el.textContent='DISPONIBLE';
        el.classList.remove('locked');
      }
    }
    $$(`[data-lock-button="${id}"]`).forEach(btn=>{
      btn.disabled=left>0;
      if(left) btn.dataset.originalText=btn.dataset.originalText||btn.textContent;
      btn.textContent=left>0?`BLOQUEADO ${timeText(left)}`:(btn.dataset.originalText||btn.textContent);
    });
  });
  if(changed) save(false);
}

setInterval(updateLockUI,1000);

$('#login-form').addEventListener('submit',e=>{
  e.preventDefault();
  if(norm($('#login-user').value)===CONFIG.usuario&&norm($('#login-unit').value)===CONFIG.unidad&&norm($('#login-key').value)===CONFIG.clave){
    state.login=true;
    save();
    feedback('#login-feedback','Credenciales aceptadas.',true);
    show('loading');
    animateProgress($('#login-bar'),$('#login-percent'),[0,14,31,48,72,91,100],160,()=>show('dashboard'));
  }else feedback('#login-feedback','Credenciales incompletas o incorrectas.');
});

function animateProgress(bar,label,values,delay,done){
  let i=0;
  bar.style.width='0%';
  label.textContent='0%';
  const tick=()=>{
    const v=values[i++];
    bar.style.width=v+'%';
    label.textContent=v+'%';
    if(i<values.length)setTimeout(tick,delay);
    else setTimeout(done,260);
  };
  tick();
}

$$('[data-back]').forEach(b=>b.onclick=()=>show('dashboard'));

/* PUZZLE 1 — auditoría */
$('#records-form').addEventListener('submit',e=>{
  e.preventDefault();
  if(isLocked('records'))return updateLockUI();
  const raw=$('#records-input').value;
  const value=compact(raw);
  if(!/^R[1-9][A-Z][0-9]$/.test(value)){
    feedback('#records-feedback','FORMATO NO VÁLIDO // Use código de fila + CRC, por ejemplo R4-C3. Este aviso no penaliza.');
    return;
  }
  if(value==='R7D2'){
    complete('records');
    feedback('#records-feedback','Auditoría consistente: las tres reglas convergen en R7.',true);
    $('#records-result').classList.remove('hidden');
  }else activateLock('records','#records-feedback');
});

/* PUZZLE 2 — mensajes */
const messageData=[
  {id:'m1',time:'22:01',who:'VARELA',text:'El índice R7-D2 apunta al bloque correcto.',frag:'AX'},
  {id:'m2',time:'22:04',who:'MORA',text:'Conserva el encabezado; puede ser útil.',frag:'CON'},
  {id:'m3',time:'22:06',who:'VARELA',text:'Hay huecos entre paquetes. No todos cuentan.',frag:'RI'},
  {id:'m4',time:'22:09',who:'MORA',text:'Tenemos una segunda coincidencia temporal.',frag:'TE'},
  {id:'m5',time:'22:13',who:'VARELA',text:'La clasificación anterior era incorrecta.',frag:'VO'},
  {id:'m6',time:'22:16',who:'MORA',text:'Necesitamos nombrar su función, no su aspecto.',frag:'NE'},
  {id:'m7',time:'22:21',who:'VARELA',text:'Último bloque. Después cierro la sesión.',frag:'51'},
  {id:'m8',time:'22:24',who:'MORA',text:'Recibido. El término ya está completo.',frag:'DOR'}
];
const initialMessageOrder=['m5','m2','m8','m1','m6','m3','m7','m4'];
let messageOrder=[...initialMessageOrder];

function renderMessages(){
  const host=$('#message-sort');
  if(!host)return;
  host.innerHTML='';
  messageOrder.forEach((id,index)=>{
    const m=messageData.find(x=>x.id===id);
    const card=document.createElement('div');
    card.className='message-card';
    card.innerHTML=`<div class="message-meta"><b>${m.who}</b><span>${m.time}</span><em>FRAG ${m.frag}</em></div><p>${m.text}</p><div class="message-move"><button type="button" data-dir="-1" ${index===0?'disabled':''}>↑</button><button type="button" data-dir="1" ${index===messageOrder.length-1?'disabled':''}>↓</button></div>`;
    card.querySelectorAll('[data-dir]').forEach(btn=>btn.onclick=()=>{
      const ni=index+Number(btn.dataset.dir);
      [messageOrder[index],messageOrder[ni]]=[messageOrder[ni],messageOrder[index]];
      renderMessages();
    });
    host.appendChild(card);
  });
}
$('#messages-reset-order').onclick=()=>{messageOrder=[...initialMessageOrder];renderMessages();feedback('#messages-feedback','Orden restablecido.');};

$('#messages-form').addEventListener('submit',e=>{
  e.preventDefault();
  if(isLocked('messages'))return updateLockUI();
  const answer=compact($('#messages-input').value);
  if(!/^[A-Z]{5,15}$/.test(answer)){
    feedback('#messages-feedback','FORMATO NO VÁLIDO // Introduzca una palabra alfabética reconstruida. Este aviso no penaliza.');
    return;
  }
  const correctOrder=messageOrder.join('|')===messageData.map(x=>x.id).join('|');
  if(correctOrder&&answer==='CONTENEDOR'){
    complete('messages');
    feedback('#messages-feedback','Orden temporal y extracción confirmados.',true);
    $('#messages-result').classList.remove('hidden');
  }else activateLock('messages','#messages-feedback');
});

/* PUZZLE 3 — catálogo */
const ecos=[
  ['004','TÉRMICA','4','0','22:16','ESTABLE'],
  ['017','MENTAL','7','1','22:21','ESTABLE'],
  ['025','VOLTAICA','5','2','22:25','ESTABLE'],
  ['063','ESPECTRAL','8','1','22:23','INCONSISTENTE'],
  ['092','RESONANTE','9','2','22:30','ESTABLE'],
  ['114','VECTORIAL','4','1','22:24','CUARENTENA']
];
ecos.forEach(([n,c,i,inc,opened,status])=>{
  const row=document.createElement('div');
  row.className='eco-row eco-data-row';
  row.innerHTML=`<b>ECO ${n}</b><span>${c}</span><em>ÍNDICE ${i}</em><span>INC. ${inc}</span><span>ABIERTO ${opened}</span><span class="${status!=='ESTABLE'?'bad':''}">${status}</span>`;
  $('#eco-list').appendChild(row);
});

$('#catalog-form').addEventListener('submit',e=>{
  e.preventDefault();
  if(isLocked('catalog'))return updateLockUI();
  const value=compact($('#catalog-input').value);
  if(!/^\d{4,5}[A-Z]+$/.test(value)){
    feedback('#catalog-feedback','FORMATO NO VÁLIDO // Use NÚMERO + ÍNDICE + CLASE. Separadores y espacios son opcionales. Este aviso no penaliza.');
    return;
  }
  if(value==='0638ESPECTRAL'){
    complete('catalog');
    feedback('#catalog-feedback','Correlación triple confirmada. Índice interno recuperado: 8.',true);
    $('#catalog-result').classList.remove('hidden');
  }else activateLock('catalog','#catalog-feedback');
});

/* PUZZLE 4 — César */
function caesarDecode(text,shift){
  return text.replace(/[A-Z]/g,ch=>String.fromCharCode((ch.charCodeAt(0)-65-shift+26*4)%26+65));
}
$('#shift-input').addEventListener('input',()=>{
  $('#shift-preview').textContent=caesarDecode('IZKPQDMZW',Number($('#shift-input').value)||0);
});
$('#caesar-form').addEventListener('submit',e=>{
  e.preventDefault();
  if(norm($('#caesar-input').value)==='ARCHIVERO'){
    complete('caesar');
    feedback('#caesar-feedback','Texto descifrado correctamente.',true);
    $('#caesar-result').classList.remove('hidden');
  }else feedback('#caesar-feedback','El texto no coincide. Revise el desplazamiento.');
});

/* PUZZLES 5–8 */
$('#sequence-form').addEventListener('submit',e=>{
  e.preventDefault();
  if(Number($('#sequence-input').value)===56){
    complete('sequence');feedback('#sequence-feedback','Secuencia validada.',true);$('#sequence-result').classList.remove('hidden');
  }else feedback('#sequence-feedback','Valor incorrecto.');
});
$('#matrix-form').addEventListener('submit',e=>{
  e.preventDefault();
  if(Number($('#matrix-input').value)===85){
    complete('matrix');feedback('#matrix-feedback','Matriz validada.',true);$('#matrix-result').classList.remove('hidden');
  }else feedback('#matrix-feedback','Relación incorrecta.');
});

['VARELA','MORA','SERRANO','IBARRA'].forEach(n=>{
  const b=document.createElement('button');
  b.textContent=n;
  b.onclick=()=>{
    if(n==='MORA'){
      complete('logic');feedback('#logic-feedback','Distribución de permisos consistente.',true);$('#logic-result').classList.remove('hidden');
    }else feedback('#logic-feedback','Ese empleado no puede ocupar el nivel 3 con todas las pistas.');
  };
  $('#logic-options').appendChild(b);
});

const rows=['A','B','C','D','E'];
const letters=[
  ['A','N','M','C','A'],
  ['L','L','E','I','T'],
  ['R','C','O','V','O'],
  ['L','H','U','E','S'],
  ['V','O','R','C','L']
];
letters.forEach((row,ri)=>{
  const lab=document.createElement('div');
  lab.className='row-label';
  lab.textContent=rows[ri];
  $('#coord-grid').appendChild(lab);
  row.forEach(ch=>{
    const d=document.createElement('div');
    d.textContent=ch;
    $('#coord-grid').appendChild(d);
  });
});
$('#grid-form').addEventListener('submit',e=>{
  e.preventDefault();
  if(norm($('#grid-input').value)==='LOCAL'){
    complete('grid');feedback('#grid-feedback','Coordenadas válidas.',true);$('#grid-result').classList.remove('hidden');
  }else feedback('#grid-feedback','Extracción incorrecta. Recuerde: fila-columna.');
});

/* CLAVE MAESTRA */
let master=[];
const masterTokens=['LOCAL','85','R7-D2','ARCHIVERO','MORA','56','CONTENEDOR','063-8-ESPECTRAL'];

function renderMaster(){
  const slots=$('#master-slots');
  if(!slots)return;
  slots.innerHTML='';
  for(let i=0;i<4;i++){
    const d=document.createElement('div');
    d.className='master-slot';
    d.textContent=master[i]||`POSICIÓN ${i+1}`;
    slots.appendChild(d);
  }
  const bank=$('#master-bank');
  bank.innerHTML='';
  masterTokens.forEach(t=>{
    const b=document.createElement('button');
    b.className='master-token'+(master.includes(t)?' used':'');
    b.textContent=t;
    b.onclick=()=>{if(master.length<4&&!isLocked('master')){master.push(t);renderMaster()}};
    bank.appendChild(b);
  });
}

$('#master-reset').onclick=()=>{
  master=[];
  renderMaster();
  feedback('#master-feedback','');
};
$('#master-check').onclick=()=>{
  if(isLocked('master'))return updateLockUI();
  if(master.length!==4){
    feedback('#master-feedback','FORMATO INCOMPLETO // Debe seleccionar exactamente cuatro fragmentos. Este aviso no penaliza.');
    return;
  }
  if(master.join('|')==='R7-D2|CONTENEDOR|MORA|LOCAL'){
    state.master=true;
    save();
    feedback('#master-feedback','Ruta maestra aceptada. EXPEDIENTE 151 desbloqueado.',true);
    toast('ACCESO CONCEDIDO // EXPEDIENTE 151');
    setTimeout(()=>show('expedient'),800);
  }else activateLock('master','#master-feedback');
};

/* FINAL */
$('#prepare-btn').onclick=()=>show('check');
let checking=false;
function runSystemCheck(){
  if(checking)return;
  checking=true;
  $('#checks').innerHTML='';
  $('#integrity').classList.add('hidden');
  $('#last-check').classList.add('hidden');
  const items=[
    ['Navegador','compatible'],
    ['Sistema','compatible'],
    ['Paciencia del usuario','desconocida'],
    ['Probabilidad de que esto haya sido excesivo','94 %']
  ];
  items.forEach((it,i)=>setTimeout(()=>{
    const d=document.createElement('div');
    d.className='check-item';
    d.innerHTML=`<span>${it[0]}</span><b>${it[1]}</b>`;
    $('#checks').appendChild(d);
    if(i===items.length-1)setTimeout(()=>{
      $('#integrity').classList.remove('hidden');
      animateProgress($('#integrity-bar'),$('#integrity-percent'),[0,18,34,51,68,82,93,99],250,()=>{
        $('#last-check').classList.remove('hidden');
        checking=false;
      });
    },350);
  },i*360));
}

$$('.continue-anyway').forEach(b=>b.onclick=()=>show('download'));

function download(platform,path,btn){
  const a=document.createElement('a');
  a.href=path;
  a.download=path;
  document.body.appendChild(a);
  a.click();
  a.remove();
  state.downloaded=true;
  state.platform=platform;
  save();
  btn.classList.add('done');
  btn.querySelector('em').textContent='TRANSFERIDO';
  $('#after-download').classList.remove('hidden');
}

$('#download-windows').onclick=()=>download('WINDOWS',CONFIG.windows,$('#download-windows'));
$('#download-linux').onclick=()=>download('LINUX',CONFIG.linux,$('#download-linux'));

$('#reset-progress').onclick=()=>{
  if(confirm('¿Reiniciar todo el progreso local de PROYECTO NEXUS?')){
    localStorage.removeItem(KEY);
    location.reload();
  }
};

function hydrate(){
  puzzleIds.forEach(id=>{
    if(state[id]) $(`#${id}-result`)?.classList.remove('hidden');
  });
  if(state.downloaded){
    const b=state.platform==='WINDOWS'?$('#download-windows'):state.platform==='LINUX'?$('#download-linux'):null;
    if(b){
      b.classList.add('done');
      b.querySelector('em').textContent='TRANSFERIDO';
    }
    $('#after-download').classList.remove('hidden');
  }
  if(state.messages) messageOrder=messageData.map(x=>x.id);
  renderMessages();
  renderDashboard();
  renderMaster();
  buildHints();
  updateLockUI();
  show(state.login?'dashboard':'login');
}

setInterval(()=>{$('#clock').textContent=new Date().toLocaleTimeString('es-ES',{hour12:false})},1000);
$('#clock').textContent=new Date().toLocaleTimeString('es-ES',{hour12:false});
hydrate();
})();
