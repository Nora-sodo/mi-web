/**
 * USIC P34 — UX fixes
 * Menú móvil accesible, foco coherente y cierre de overlays.
 */
(() => {
  const sidebar = document.getElementById('sidebar');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('sidebarBackdrop');
  const searchOverlay = document.getElementById('searchOverlay');
  const tutorPanel = document.getElementById('tutorPanel');


  const focusableSelector = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  function trapFocus(container, event) {
    if (event.key !== 'Tab' || !container) return;
    const items = [...container.querySelectorAll(focusableSelector)].filter(el => !el.hidden && el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function setSidebar(open) {
    if (!sidebar || !menu) return;
    sidebar.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    menu.setAttribute('aria-expanded', String(open));
    if (backdrop) {
      backdrop.classList.toggle('open', open);
      backdrop.tabIndex = open ? 0 : -1;
    }
  }

  menu?.addEventListener('click', () => {
    setSidebar(!sidebar?.classList.contains('open'));
  });

  backdrop?.addEventListener('click', () => setSidebar(false));

  document.querySelectorAll('#sidebar [data-route]').forEach(el => {
    el.addEventListener('click', () => setSidebar(false));
  });

  document.addEventListener('keydown', event => {
    if (searchOverlay?.classList.contains('open')) trapFocus(searchOverlay, event);
    if (tutorPanel?.classList.contains('open')) trapFocus(tutorPanel, event);
    if (event.key !== 'Escape') return;
    if (sidebar?.classList.contains('open')) {
      setSidebar(false);
      menu?.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setSidebar(false);
  });

  // Make dynamically-rendered clickable cards keyboard reachable when possible.
  const view = document.getElementById('view');
  const enhance = () => {
    view?.querySelectorAll('.course-card,.catalog-card,.library-item,.area-lesson-card,.goal-card').forEach(el => {
      if (el.matches('button,a,[tabindex]')) return;
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
    });
  };
  new MutationObserver(enhance).observe(view || document.body, {childList:true, subtree:true});
  enhance();

  view?.addEventListener('keydown', event => {
    const el = event.target.closest('[role="button"]');
    if (!el || el.matches('button,a,input,select,textarea')) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      el.click();
    }
  });

  document.body.classList.add('usic-aurora-circuit');
})();
