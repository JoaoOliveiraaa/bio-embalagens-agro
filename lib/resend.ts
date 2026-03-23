import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = "Bio Embalagens Agro <onboarding@resend.dev>"
const TO = "contato@bioembalagensagro.com.br"

export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface WorkWithUsEmailData {
  name: string
  email: string
  phone: string
  position?: string
  cvFile?: File | null
}

function buildContactHtml(data: ContactEmailData): string {
  const { name, email, phone, subject, message } = data
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #2D6A4F 0%, #52B788 100%); padding: 30px; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Nova Mensagem de Contato</h1>
    </div>
    <div style="background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2D6A4F;">Nome:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2D6A4F;">E-mail:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${escapeHtml(email)}" style="color: #52B788;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2D6A4F;">Telefone:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${phone ? escapeHtml(phone) : "Não informado"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2D6A4F;">Assunto:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${escapeHtml(subject)}</td>
        </tr>
      </table>
      <div style="margin-top: 20px;">
        <strong style="color: #2D6A4F;">Mensagem:</strong>
        <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 10px; border: 1px solid #e0e0e0;">
          ${escapeHtml(message).replace(/\n/g, "<br>")}
        </div>
      </div>
    </div>
    <p style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
      Enviado pelo formulário de contato do site Bio Embalagens Agro.
    </p>
  </body>
</html>
`
}

function buildWorkWithUsHtml(data: WorkWithUsEmailData, hasCv: boolean): string {
  const { name, email, phone, position } = data
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #2D6A4F 0%, #52B788 100%); padding: 30px; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Nova Candidatura - Trabalhe Conosco</h1>
    </div>
    <div style="background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2D6A4F;">Nome:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2D6A4F;">E-mail:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${escapeHtml(email)}" style="color: #52B788;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2D6A4F;">Telefone:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${escapeHtml(phone)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2D6A4F;">Área de Interesse:</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${position ? escapeHtml(position) : "Não especificada"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0;"><strong style="color: #2D6A4F;">Currículo:</strong></td>
          <td style="padding: 10px 0;">${hasCv ? '<span style="color: #52B788;">Anexado ao e-mail</span>' : "Não enviado"}</td>
        </tr>
      </table>
    </div>
    <p style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
      Enviado pelo formulário "Trabalhe Conosco" do site Bio Embalagens Agro.
    </p>
  </body>
</html>
`
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function sendContactEmail(data: ContactEmailData) {
  const { data: result, error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: data.email,
    subject: "Novo contato pelo site",
    html: buildContactHtml(data),
  })
  return { data: result, error }
}

export async function sendWorkWithUsEmail(data: WorkWithUsEmailData) {
  const attachments: { filename: string; content: Buffer }[] = []
  if (data.cvFile && data.cvFile.size > 0) {
    const bytes = await data.cvFile.arrayBuffer()
    attachments.push({
      filename: data.cvFile.name,
      content: Buffer.from(bytes),
    })
  }

  const { data: result, error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: data.email,
    subject: "Novo candidato - Trabalhe Conosco",
    html: buildWorkWithUsHtml(data, attachments.length > 0),
    attachments: attachments.length > 0 ? attachments : undefined,
  })
  return { data: result, error }
}
