import nodemailer from 'nodemailer'
import PDFDocument from 'pdfkit'

type OrderItem = { product: any; quantity?: number }

const BRAND = { gold: '#D4A843', dark: '#1f2937', muted: '#666666' }

export function buildOrderHtml(items: OrderItem[], order: any): string {
  const subtotal = items.reduce((sum, item) => {
    const p = typeof item.product === 'object' ? item.product : null
    return sum + (p?.priceInINR ?? 0) * (item.quantity ?? 1)
  }, 0)
  const rows = items
    .map((item, i) => {
      const p = typeof item.product === 'object' ? item.product : null
      const qty = item.quantity ?? 1
      const price = p?.priceInINR ?? 0
      const total = price * qty
      return `
        <tr>
          <td style="padding:8px;border:1px solid #ddd">${i + 1}</td>
          <td style="padding:8px;border:1px solid #ddd">${p?.title ?? 'Product'}</td>
          <td style="padding:8px;border:1px solid #ddd">${qty}</td>
          <td style="padding:8px;border:1px solid #ddd">\u20B9${(price / 100).toFixed(2)}</td>
          <td style="padding:8px;border:1px solid #ddd">\u20B9${(total / 100).toFixed(2)}</td>
        </tr>`
    })
    .join('')

  return `
    <!DOCTYPE html>
    <html>
    <head><style>body{font-family:Arial,sans-serif;padding:40px}</style></head>
    <body>
      <h1 style="color:${BRAND.gold}">Zopa - Order Confirmation</h1>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
      <p><strong>Email:</strong> ${order.customerEmail ?? ''}</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0">
        <thead>
          <tr style="background:${BRAND.gold};color:white">
            <th style="padding:8px;border:1px solid #ddd">#</th>
            <th style="padding:8px;border:1px solid #ddd">Product</th>
            <th style="padding:8px;border:1px solid #ddd">Qty</th>
            <th style="padding:8px;border:1px solid #ddd">Price</th>
            <th style="padding:8px;border:1px solid #ddd">Total</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="padding:8px;border:1px solid #ddd;text-align:right;font-weight:bold">Subtotal</td>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">\u20B9${(subtotal / 100).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <p style="color:${BRAND.muted}">Thank you for your purchase!</p>
    </body>
    </html>`
}

function generatePdf(order: any, items: OrderItem[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const doc = new PDFDocument({ size: 'A4', margin: 48 })
    doc.on('data', (c) => chunks.push(Buffer.from(c)))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    // Header band
    doc.rect(0, 0, doc.page.width, 90).fill(BRAND.dark)
    doc.fillColor(BRAND.gold).font('Helvetica-Bold').fontSize(24).text('ZOPA', 48, 30)
    doc.fillColor('#ffffff').font('Helvetica').fontSize(11).text('Order Confirmation', 48, 60)

    // Meta
    doc.fillColor(BRAND.dark).fontSize(12)
    doc.text(`Order ID: ${order.id}`, 48, 120)
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 48, 136)
    doc.text(`Email: ${order.customerEmail ?? ''}`, 48, 152)

    // Table header
    let y = 190
    doc.rect(48, y, 500, 22).fill(BRAND.gold)
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(10)
    doc.text('#', 48, y + 6)
    doc.text('Product', 90, y + 6)
    doc.text('Qty', 320, y + 6)
    doc.text('Price', 400, y + 6)
    doc.text('Total', 490, y + 6)
    y += 30

    // Rows
    doc.fillColor(BRAND.dark).font('Helvetica').fontSize(10)
    let subtotal = 0
    for (const [i, item] of items.entries()) {
      const p = typeof item.product === 'object' ? item.product : null
      const qty = item.quantity ?? 1
      const price = p?.priceInINR ?? 0
      subtotal += price * qty
      doc.text(String(i + 1), 48, y)
      doc.text(p?.title ?? 'Product', 90, y, { width: 220 })
      doc.text(String(qty), 320, y)
      doc.text(`\u20B9${(price / 100).toFixed(2)}`, 400, y)
      doc.text(`\u20B9${((price * qty) / 100).toFixed(2)}`, 490, y, { width: 58, align: 'right' })
      y += 20
      if (y > doc.page.height - 80) {
        doc.addPage()
        y = 48
      }
    }

    // Subtotal + footer
    y += 12
    doc.font('Helvetica-Bold').text('Subtotal', 320, y)
    doc.text(`\u20B9${(subtotal / 100).toFixed(2)}`, 548, y, { width: 0, align: 'right' })
    doc.font('Helvetica').fontSize(9).fillColor(BRAND.muted)
      .text('Thank you for your purchase!', 48, y + 24)

    doc.end()
  })
}

export type EmailResult = { ok: true } | { ok: false; error: string }

export async function sendOrderEmail(order: any, items: OrderItem[]): Promise<EmailResult> {
  try {
    const html = buildOrderHtml(items, order)
    const pdfBuffer = await generatePdf(order, items)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 30_000,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: order.customerEmail,
      subject: `Zopa - Order Confirmation (Order #${order.id})`,
      html,
      attachments: [
        {
          filename: `order-${order.id}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    })
    return { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
}