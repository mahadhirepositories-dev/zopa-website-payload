import { readFileSync } from 'fs'

const file = readFileSync('scratch/debug-query.mjs', 'utf8')
const match = file.match(/const query = `([\s\S]+?)`/)[1]
console.log('Query length:', match.length)
console.log('--- SUBSTRING AROUND POSITION 29592 ---')
console.log(match.substring(29450, 29700))
