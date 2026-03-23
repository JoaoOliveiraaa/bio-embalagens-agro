import { NextRequest, NextResponse } from "next/server"
import { sendWorkWithUsEmail } from "@/lib/resend"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const position = formData.get("position") as string | null
    const cvFile = formData.get("cv") as File | null

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Por favor, preencha todos os campos obrigatórios." },
        { status: 400 }
      )
    }

    const { data, error } = await sendWorkWithUsEmail({
      name,
      email,
      phone,
      position: position || undefined,
      cvFile: cvFile ?? undefined,
    })

    if (error) {
      console.error("Resend error:", error)
      const showDebug = process.env.ENABLE_EMAIL_DEBUG === "true"
      return NextResponse.json(
        {
          error: "Erro ao enviar candidatura. Tente novamente.",
          ...(showDebug && { debug: error.message }),
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Candidatura enviada com sucesso!", id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error("API work-with-us error:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente mais tarde." },
      { status: 500 }
    )
  }
}
