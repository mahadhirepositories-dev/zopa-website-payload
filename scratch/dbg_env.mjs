import fs from 'fs'
import 'dotenv/config'

const raw = fs.readFileSync('.env', 'utf8')
console.log('has CR:', raw.includes('\r'))
const manual = raw.match(/^DATABASE_URI=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '')
const envVar = process.env.DATABASE_URI
const mask = s => s ? s.slice(0, 22) + '...LEN=' + s.length + ' endsWithCR=' + s.endsWith('\r') : 'UNDEFINED'
console.log('manual :', mask(manual))
console.log('dotenv :', mask(envVar))
try { const u = new URL(envVar); console.log('URL parse ok: user=' + u.username + ' passLen=' + (u.password || '').length + ' host=' + u.hostname + ' db=' + u.pathname) } catch (e) { console.log('URL parse FAILED:', e.message) }
