import nodemailer from 'nodemailer'
import puppeteer from 'puppeteer'
import { Payload } from 'payload'

type OrderItem = {
  product: any
  quantity?: number
}

function buildOrderHtml(items: OrderItem[], order: any) {
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
          <td style="padding:8px;border:1px solid #ddd">₹${(price / 100).toFixed(2)}</td>
          <td style="padding:8px;border:1px solid #ddd">₹${(total / 100).toFixed(2)}</td>
        </tr>`
    })
    .join('')

  const subtotal = items.reduce((sum, item) => {
    const p = typeof item.product === 'object' ? item.product : null
    return sum + (p?.priceInINR ?? 0) * (item.quantity ?? 1)
  }, 0)

  return `
    <!DOCTYPE html>
    <html>
    <head><style>body{font-family:Arial,sans-serif;padding:40px}</style></head>
    <body>
      <h1 style="color:#D4A843">Zopa - Order Confirmation</h1>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
      <p><strong>Email:</strong> ${order.customerEmail}</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0">
        <thead>
          <tr style="background:#D4A843;color:white">
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
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">₹${(subtotal / 100).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <p style="color:#666">Thank you for your purchase!</p>
    </body>
    </html>`
}

async function generatePdf(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'load' })
  const pdf = await page.pdf({ format: 'A4', printBackground: true })
  await browser.close()
  return Buffer.from(pdf)
}

export async function sendOrderEmail(payload: Payload, order: any, items: OrderItem[]) {
  const html = buildOrderHtml(items, order)
  const pdfBuffer = await generatePdf(html)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
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
}