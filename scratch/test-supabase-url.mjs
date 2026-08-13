import https from 'https'

const testUrl = 'https://junhxesyfpnqapxaulvj.supabase.co/storage/v1/object/public/media/g1-2.png'

https.get(testUrl, (res) => {
  console.log('Status code:', res.statusCode)
  let data = ''
  res.on('data', chunk => data += chunk)
  res.on('end', () => console.log('Body:', data))
})
