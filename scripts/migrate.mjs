/**
 * PeakSkills — Supabase Migration Runner
 * Uses fetch + Supabase service_role key to run DDL statements
 * via the PostgREST pg_catalog endpoint or direct DB connection.
 *
 * Usage: node scripts/migrate.mjs
 */
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Load env ──────────────────────────────────────────────────
const envText = readFileSync(join(__dirname, '..', '.env.local'), 'utf8')
const env = Object.fromEntries(
  envText.split('\n')
    .map(l => l.match(/^([A-Z_]+[A-Z0-9_]*)="?([^"]*)"?$/))
    .filter(Boolean)
    .map(m => [m[1], m[2].trim()])
)

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
const SERVICE_KEY  = env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔗  URL:', SUPABASE_URL)
console.log('🔑  Key:', SERVICE_KEY ? SERVICE_KEY.substring(0, 20) + '...' : 'MISSING')
console.log('')

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌  Missing env vars'); process.exit(1)
}

// ── Load SQL and split into statements ────────────────────────
const sqlRaw = readFileSync(join(__dirname, '..', 'supabase', 'migration.sql'), 'utf8')

// Normalize: remove comment lines, then split on semicolons
const statements = sqlRaw
  .split('\n')
  .filter(l => !l.trim().startsWith('--'))  // remove full-line comments
  .join('\n')
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 4)  // skip empty/whitespace-only

console.log(`📂  ${statements.length} statements to execute`)
console.log('')

// ── Helper: POST one SQL statement via the Supabase pg RPC ────
// Supabase exposes a raw SQL endpoint via the service role at
// POST /rest/v1/rpc/query  { "sql": "..." }
// This is NOT available by default, so we'll use the approach of
// inserting directly via the REST API for DML, and handle DDL separately.
//
// ACTUALLY — the right approach is using the Supabase Management API:
// POST https://api.supabase.com/v1/projects/{ref}/database/query
// Auth: Bearer <access_token>   (not service_role — personal token!)
//
// Since we don't have a personal access token, let's try via pg directly.
// We have psql available — build the connection string from the URL.

const projectRef = SUPABASE_URL.split('//')[1].split('.')[0]
console.log(`📋  Project ref: ${projectRef}`)
console.log('')

// ── Try to POST to Supabase db/query via management API ───────
// This requires a Supabase Access Token (not the anon/service key)
// We'll skip this and output the correct psql command instead.

// ── Extract DB host from Supabase URL ─────────────────────────
// Supabase DB host format: db.{ref}.supabase.co
const dbHost = `db.${projectRef}.supabase.co`

console.log('══════════════════════════════════════════════════════')
console.log('📌  TO RUN THE MIGRATION, USE ONE OF THESE OPTIONS:')
console.log('══════════════════════════════════════════════════════')
console.log('')
console.log('OPTION 1 — Supabase Studio (easiest, no setup):')
console.log(`  1. Open: https://supabase.com/dashboard/project/${projectRef}/sql/new`)
console.log('  2. Click "New query"')
console.log('  3. Paste the file: supabase\\migration.sql  (Ctrl+A, Ctrl+C from the file)')
console.log('  4. Click the green RUN button (or press Ctrl+Enter)')
console.log('')
console.log('OPTION 2 — psql (you have psql 17 installed):')
console.log(`  psql "postgresql://postgres.${projectRef}:[YOUR-DB-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres" -f supabase\\migration.sql`)
console.log('')
console.log('  Get your DB password from:')
console.log(`  https://supabase.com/dashboard/project/${projectRef}/settings/database`)
console.log('  (Under "Connection string" → copy the password)')
console.log('')
console.log('══════════════════════════════════════════════════════')

// ── Try a simple connectivity test with the anon key ─────────
console.log('🔍  Testing REST API connectivity...')
try {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    }
  })
  console.log(`✅  REST API reachable — status ${res.status}`)
  
  // Try to check if categories table already exists
  const catRes = await fetch(`${SUPABASE_URL}/rest/v1/categories?select=count&limit=1`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'count=exact'
    }
  })
  
  if (catRes.status === 200) {
    const count = catRes.headers.get('content-range')
    console.log(`✅  "categories" table already EXISTS (${count ?? 'some'} rows) — migration was already run!`)
    
    // Check programs
    const progRes = await fetch(`${SUPABASE_URL}/rest/v1/programs?select=title`, {
      headers: { 'apikey': SERVICE_KEY, 'Authorization': `Bearer ${SERVICE_KEY}` }
    })
    const programs = await progRes.json()
    console.log(`✅  "programs" table has ${programs.length} row(s)`)
    if (programs.length > 0) {
      programs.forEach(p => console.log(`   • ${p.title}`))
    }
  } else if (catRes.status === 404) {
    console.log('⚠️   "categories" table does NOT exist yet — migration needed.')
    console.log('     Please use Option 1 above (Supabase Studio) to run migration.sql')
  } else {
    const body = await catRes.text()
    console.log(`⚠️   Unexpected status ${catRes.status}: ${body.substring(0, 200)}`)
  }
} catch (e) {
  console.error('❌  API unreachable:', e.message)
}
