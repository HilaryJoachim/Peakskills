// Migration runner — uses Supabase REST API to execute raw SQL
// via the pg_query RPC (available on all Supabase projects)
const https = require('https')
const fs = require('fs')
const path = require('path')

// Load env
const envPath = path.join(__dirname, '..', '.env.local')
const env = fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const m = line.match(/^([^=]+)="?([^"]*)"?$/)
    if (m) acc[m[1].trim()] = m[2].trim()
    return acc
  }, {})

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const sqlPath = path.join(__dirname, '..', 'supabase', 'migration.sql')
const sql = fs.readFileSync(sqlPath, 'utf8')

// Supabase allows executing SQL via the REST endpoint with service_role key
const url = new URL('/rest/v1/rpc/exec_sql', SUPABASE_URL)

// Split into statements and run them one by one
// (Supabase REST doesn't support multi-statement in one call)
async function runQuery(statement) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: statement })
    const urlObj = new URL(SUPABASE_URL)
    const options = {
      hostname: urlObj.hostname,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Length': Buffer.byteLength(body),
      }
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve({ status: res.statusCode, body: data }))
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

// The cleanest approach: use Supabase's pg extension via REST
// Actually the correct way is to POST to /rest/v1/rpc/exec_sql
// but that function needs to be created first.
// 
// The REAL correct way for Supabase is to use the Management API
// or just call the Postgres connection string directly.
//
// Best approach: POST to Supabase SQL Editor API via management API
async function runViaMgmtApi() {
  const projectRef = SUPABASE_URL.replace('https://', '').split('.')[0]
  console.log(`📡 Project ref: ${projectRef}`)
  console.log(`🔗 Supabase URL: ${SUPABASE_URL}`)
  console.log('')
  console.log('ℹ️  The migration needs to be run directly in Supabase Studio.')
  console.log('   The service_role key cannot execute raw DDL via the REST API.')
  console.log('')
  console.log('📋 INSTRUCTIONS:')
  console.log('   1. Go to: https://supabase.com/dashboard/project/' + projectRef + '/sql/new')
  console.log('   2. Paste the contents of: supabase/migration.sql')
  console.log('   3. Click "Run"')
  console.log('')
  console.log('   OR use the Supabase CLI (if installed):')
  console.log('   > supabase db push')
  console.log('')

  // Try the management API as a fallback
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql })
    const projectRef2 = SUPABASE_URL.replace('https://', '').split('.')[0]
    const options = {
      hostname: 'api.supabase.com',
      path: `/v1/projects/${projectRef2}/database/query`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Length': Buffer.byteLength(body),
      }
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve({ status: res.statusCode, body: data }))
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

runViaMgmtApi().then(result => {
  console.log(`Management API response: ${result.status}`)
  try {
    const parsed = JSON.parse(result.body)
    if (result.status === 200 || result.status === 201) {
      console.log('✅ Migration executed successfully via Management API!')
      console.log(JSON.stringify(parsed, null, 2))
    } else {
      console.log('⚠️  Management API result:', JSON.stringify(parsed, null, 2))
      console.log('')
      console.log('👆 Please run the migration manually in Supabase Studio.')
    }
  } catch {
    console.log('Response:', result.body.substring(0, 500))
  }
}).catch(err => {
  console.error('Error:', err.message)
})
