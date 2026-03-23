import { NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/resend"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Por favor, preencha todos os campos obrigatórios." },
        { status: 400 }
      )
    }

    const { data, error } = await sendContactEmail({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
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
    console.error("API contact error:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente mais tarde." },
      { status: 500 }
    )
  }
}
