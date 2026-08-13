import { readFileSync } from 'fs'

const logContent = readFileSync('C:/Users/rdine/.gemini/antigravity/brain/a1fc476c-449a-4da5-9cdf-2fa0c645c20a/.system_generated/tasks/task-1035.log', 'utf8')
const match = logContent.match(/query: `([\s\S]+?)`/)[1]
console.log('Total query length:', match.length)
console.log('--- SUBSTRING AROUND POSITION 33590 ---')
console.log(match.substring(33400, 33750))
