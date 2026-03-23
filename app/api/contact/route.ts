import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Por favor, preencha todos os campos obrigatórios." },
        { status: 400 }
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Bio Embalagens Agro <noreply@resend.dev>",
      to: ["contato@bioembalagensagro.com.br"],
      replyTo: email,
      subject: `[Contato Site] ${subject}`,
      html: `
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
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #2D6A4F;">Nome:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #2D6A4F;">E-mail:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                    <a href="mailto:${email}" style="color: #52B788;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #2D6A4F;">Telefone:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                    ${phone || "Não informado"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #2D6A4F;">Assunto:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                    ${subject}
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 20px;">
                <strong style="color: #2D6A4F;">Mensagem:</strong>
                <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 10px; border: 1px solid #e0e0e0;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>
            
            <p style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
              Esta mensagem foi enviada através do formulário de contato do site Bio Embalagens Agro.
            </p>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Erro ao enviar mensagem. Tente novamente." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Mensagem enviada com sucesso!", id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente mais tarde." },
      { status: 500 }
    )
  }
}
