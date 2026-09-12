export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json({
    version: '2026-09-12-v1',
    timestamp: new Date().toISOString(),
  })
}
