import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://junhxesyfpnqapxaulvj.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmh4ZXN5ZnBucWFweGF1bHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyMTc4MTQsImV4cCI6MjAzODc5MzgxNH0.8aQ_tM6N6G_4Ym4_J3Q5Z3_3J3Q5Z3_3J3Q5Z3_3J3Q' // anon key or service key

async function checkSupabaseBucket() {
  const supabase = createClient(SUPABASE_URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmh4ZXN5ZnBucWFweGF1bHZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzIxNzgxNCwiZXhwIjoyMDM4NzkzODE0fQ.EYqY1J_m60WlV7_J-J1y5Z4-gJ55Z4-gJ55Z4-gJ55Z4')
  
  const { data, error } = await supabase.storage.from('media').list()
  if (error) {
    console.error('List error:', error)
  } else {
    console.log('Bucket files:', data.map(f => f.name))
  }
}

checkSupabaseBucket().catch(console.error)
