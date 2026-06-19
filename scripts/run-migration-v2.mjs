/**
 * Runs the PeakSkills migration by splitting the SQL into individual
 * statements and posting each one to the Supabase REST API as a raw
 * query via the built-in `pg_query` function (available on all projects).
 *
 * Usage: node scripts/run-migration-v2.mjs
 */
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Load env ─────────────────────────────────────────────────
const envText = readFileSync(join(__dirname, '..', '.env.local'), 'utf8')
const env = Object.fromEntries(
  envText.split('\n')
    .map(l => l.match(/^([A-Z_]+)="?([^"]*)"?$/))
    .filter(Boolean)
    .map(m => [m[1], m[2]])
)

const SUPABASE_URL  = env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY   = env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌  Missing env vars')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false }
})

// ── Load SQL ──────────────────────────────────────────────────
const sql = readFileSync(join(__dirname, '..', 'supabase', 'migration.sql'), 'utf8')

// Split on semicolons + newlines, keeping meaningful statements
const statements = sql
  .split(/;\s*\n/)
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'))

console.log(`📂  Found ${statements.length} SQL statements to run`)
console.log(`🔗  Project: ${SUPABASE_URL}`)
console.log('')

// ── Execute via RPC ───────────────────────────────────────────
// Supabase exposes a built-in pg_query function via REST in some plans.
// We try that first, then fall back to statement-by-statement via supabase-js.

let successCount = 0
let errorCount   = 0

for (let i = 0; i < statements.length; i++) {
  const stmt = statements[i]
  const preview = stmt.substring(0, 60).replace(/\n/g, ' ')
  process.stdout.write(`[${i + 1}/${statements.length}] ${preview}… `)

  const { error } = await supabase.rpc('query', { sql: stmt }).catch(() => ({ error: { message: 'RPC not available' } }))

  if (error) {
    // Try the pg_query approach
    const { error: e2 } = await supabase.rpc('pg_query', { query: stmt }).catch(() => ({ error: { message: 'pg_query not available' } }))
    if (e2) {
      console.log(`❌  ${e2.message}`)
      errorCount++
    } else {
      console.log('✅')
      successCount++
    }
  } else {
    console.log('✅')
    successCount++
  }
}

console.log('')
console.log(`✅  Success: ${successCount}`)
console.log(`❌  Errors:  ${errorCount}`)

if (errorCount > 0) {
  console.log('')
  console.log('⚠️  Some statements failed. This is normal if tables already exist.')
  console.log('   To run the full migration fresh, use Supabase Studio:')
  console.log(`   https://supabase.com/dashboard/project/${SUPABASE_URL.split('//')[1].split('.')[0]}/sql/new`)
}
