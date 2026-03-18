"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, Upload, CheckCircle, Heart, Leaf, Users } from "lucide-react"

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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
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

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Área de interesse</Label>
                      <Input
                        id="position"
                        type="text"
                        placeholder="Ex: Produção, Administrativo"
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv">Currículo (PDF, DOC) *</Label>
                    <div className="relative">
                      <Input
                        id="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
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
                    className="w-full h-12 bg-primary hover:bg-primary/90 font-semibold text-base"
                  >
                    Enviar Currículo
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
