"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageCircle, MapPin, CheckCircle, Send, Clock, AlertCircle, Loader2 } from "lucide-react"

export function ContatoSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id.replace("contact-", "")]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const msg = data.debug ? `${data.error}\n\nDetalhe: ${data.debug}` : (data.error || "Erro ao enviar mensagem")
        throw new Error(msg)
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar mensagem. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contato" className="py-16 md:py-24 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Fale Conosco
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Entre em Contato
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Estamos prontos para atender você. Entre em contato pelos canais
            abaixo ou envie sua mensagem pelo formulário.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="space-y-4">
              {/* Quick Contact Cards */}
              <a
                href="tel:+551634191777"
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="font-semibold text-foreground">(16) 3419-1777</p>
                </div>
              </a>

              <a
                href="https://wa.me/5516997488066"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-[#25D366] hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="font-semibold text-foreground">(16) 99748-8066</p>
                </div>
              </a>

              <a
                href="mailto:contato@bioembalagensagro.com.br"
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">E-mail</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base break-all">
                    contato@bioembalagensagro.com.br
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Endereço</p>
                  <p className="font-semibold text-foreground">
                    Rua Dino Guelf, 244 - Vila Alpes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    São Carlos - SP, CEP: 13570-321
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Horário de Atendimento</p>
                  <p className="font-semibold text-foreground">Segunda a Sexta</p>
                  <p className="text-sm text-muted-foreground">08:00 às 18:00</p>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-video rounded-xl overflow-hidden bg-muted relative mt-4 hidden lg:block">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.037!2d-47.8897!3d-22.0176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDAxJzAzLjQiUyA0N8KwNTMnMjIuOSJX!5e0!3m2!1sen!2sbr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Bio Embalagens Agro"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>

          {/* Contact Form - Takes 3 columns on large screens */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {isSubmitted ? (
              <div className="text-center py-12 px-6 bg-card rounded-2xl shadow-lg border border-border h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Mensagem enviada com sucesso!
                </h3>
                <p className="text-muted-foreground">
                  Responderemos o mais breve possível.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Envie sua mensagem
                </h3>

                {error && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Nome *</Label>
                      <Input
                        id="contact-name"
                        type="text"
                        placeholder="Seu nome"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">E-mail *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Telefone</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Assunto *</Label>
                      <Input
                        id="contact-subject"
                        type="text"
                        placeholder="Assunto da mensagem"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Mensagem *</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Escreva sua mensagem aqui..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="min-h-[140px] resize-none"
                    />
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
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Ao enviar, você concorda com nossa política de privacidade.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Mobile Map */}
        <div className="aspect-video rounded-xl overflow-hidden bg-muted relative mt-8 lg:hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.037!2d-47.8897!3d-22.0176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDAxJzAzLjQiUyA0N8KwNTMnMjIuOSJX!5e0!3m2!1sen!2sbr!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Bio Embalagens Agro"
            className="absolute inset-0"
          />
        </div>
      </div>
    </section>
  )
}
