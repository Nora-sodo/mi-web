// LifePlan account deletion — Supabase Edge Function
// Deploy with JWT verification enabled. Never publish the service-role key.
import { createClient } from 'npm:@supabase/supabase-js@2';

const ORIGIN = 'https://dosonoprojects.top';
const corsHeaders = {
  'Access-Control-Allow-Origin': ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, apikey, x-client-info, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
  'Vary': 'Origin',
};
function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  // CORS is an extra browser safeguard, not the authorization mechanism.
  if (request.headers.get('origin') !== ORIGIN) return json({ error: 'Origin not allowed' }, 403);
  let body: { confirmation?: string };
  try { body = await request.json(); } catch { return json({ error: 'Invalid request' }, 400); }
  if (body?.confirmation !== 'DELETE') return json({ error: 'Confirmation required' }, 400);
  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Bearer ')) return json({ error: 'Authentication required' }, 401);
  const jwt = header.slice(7);
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !anonKey || !serviceRole) return json({ error: 'Server configuration incomplete' }, 503);

  const authClient = createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user }, error: authError } = await authClient.auth.getUser(jwt);
  if (authError || !user?.id) return json({ error: 'Session invalid. Please sign in again.' }, 401);
  // user.id is verified from the session. Never accept a target user ID in request body.
  const admin = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await admin.auth.admin.deleteUser(user.id, false);
  if (error) {
    // Most commonly caused by non-cascading foreign keys or owned Storage objects.
    console.error('Account deletion failed', { userId: user.id, message: error.message });
    return json({ error: 'Could not delete account. The database administrator must check foreign keys and storage ownership.' }, 409);
  }
  return json({ deleted: true });
});
