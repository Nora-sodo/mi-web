# Configurar cuentas USIC con Supabase

1. Abre **Supabase → SQL Editor → New query**.
2. Pega todo `SUPABASE_SETUP.sql` y pulsa **Run**.
3. Ve a **Authentication → URL Configuration**:
   - Site URL: `https://dosonoprojects.top/`
   - Redirect URL permitida: `https://dosonoprojects.top/**`
4. En **Authentication → Providers → Email**, deja habilitado Email. Puedes mantener la confirmación por correo activada.
5. Publica la web. `supabase-config.js` solo contiene Project URL + publishable key; son datos públicos de frontend.

**Nunca** pongas `sb_secret_...`, `service_role` o la contraseña de PostgreSQL en GitHub.
