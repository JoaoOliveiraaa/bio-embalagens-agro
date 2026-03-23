"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, Upload, CheckCircle, Heart, Leaf, Users, AlertCircle, Loader2 } from "lucide-react"

const benefits = [
  {
    icon: Heart,
    title: "Ambiente Acolhedor",
    description: "Valorizamos cada colaborador",
  },
  {
    icon: Leaf,
    title: "Propósito Verde",
    description: "Trabalhe por um futuro sustentável",
  },
  {
    icon: Users,
    title: "Crescimento",
    description: "Oportunidades de desenvolvimento",
  },
]

export function TrabalheConoscoSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [fileName, setFileName] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const form = formRef.current
      if (!form) return

      const formData = new FormData(form)

      const response = await fetch("/api/trabalhe-conosco", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        const msg = data.debug ? `${data.error}\n\nDetalhe: ${data.debug}` : (data.error || "Erro ao enviar candidatura")
        throw new Error(msg)
      }

      setIsSubmitted(true)
      setFileName("")
      form.reset()
      
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar candidatura. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("O arquivo deve ter no máximo 5MB")
        e.target.value = ""
        return
      }
      setFileName(file.name)
      setError("")
    }
  }

  return (
    <section id="trabalhe-conosco" className="py-16 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-secondary text-primary rounded-full text-sm font-medium mb-4">
              Carreiras
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Trabalhe Conosco
            </h2>
            
            <p className="text-muted-foreground mb-8 text-pretty">
              Faça parte da nossa equipe! Estamos sempre em busca de talentos
              que compartilhem nossa paixão por sustentabilidade e inovação no
              agronegócio.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Satisfação da equipe</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">7+</div>
                <div className="text-sm text-muted-foreground">Anos de história</div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div>
            {isSubmitted ? (
              <div className="text-center py-12 px-6 bg-card rounded-2xl shadow-lg border border-border">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Currículo enviado com sucesso!
                </h3>
                <p className="text-muted-foreground">
                  Analisaremos seu perfil e entraremos em contato em breve.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Candidate-se</h3>
                    <p className="text-sm text-muted-foreground">Preencha o formulário abaixo</p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome"
                        required
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        required
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Área de interesse</Label>
                      <Input
                        id="position"
                        name="position"
                        type="text"
                        placeholder="Ex: Produção, Administrativo"
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv">Currículo (PDF, DOC - máx. 5MB) *</Label>
                    <div className="relative">
                      <Input
                        id="cv"
                        name="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        disabled={isSubmitting}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="h-12 px-4 border border-input rounded-lg bg-background flex items-center gap-3 text-muted-foreground hover:border-primary transition-colors">
                        <Upload className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm truncate">
                          {fileName || "Clique para enviar seu currículo"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary hover:bg-primary/90 font-semibold text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Currículo"
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Suas informações são tratadas com sigilo e segurança.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
