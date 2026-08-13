import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://junhxesyfpnqapxaulvj.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmh4ZXN5ZnBucWFweGF1bHZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzIxNzgxNCwiZXhwIjoyMDM4NzkzODE0fQ.EYqY1J_m60WlV7_J-J1y5Z4-gJ55Z4-gJ55Z4-gJ55Z4' // Let's test service role key

async function listStorage() {
  // Let's get service key from Supabase DB or env
  const supabase = createClient(SUPABASE_URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmh4ZXN5ZnBucWFweGF1bHZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzIxNzgxNCwiZXhwIjoyMDM4NzkzODE0fQ.EYqY1J_m60WlV7_J-J1y5Z4-gJ55Z4-gJ55Z4-gJ55Z4')
  
  const { data, error } = await supabase.storage.from('media').list('', { limit: 100 })
  console.log('List data:', data)
  console.log('List error:', error)
}

listStorage().catch(console.error)
