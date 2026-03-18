"use client"

import { Leaf, Eye, Heart, CheckCircle } from "lucide-react"

const values = [
  {
    icon: Leaf,
    title: "Missão",
    description:
      "A Bio Embalagens Agro utiliza a inovação e tecnologia para desenvolver embalagens biodegradáveis para o agro.",
    highlight: "Nosso propósito é fornecer embalagens que não agridam ao meio ambiente e ajudem no desenvolvimento das plantas.",
    color: "primary",
  },
  {
    icon: Eye,
    title: "Visão",
    description:
      "Ser referência nacional no desenvolvimento de embalagens biodegradáveis para o agronegócio.",
    highlight: "Aliando tecnologia de ponta e sustentabilidade em cada produto.",
    color: "accent",
  },
  {
    icon: Heart,
    title: "Valores",
    description:
      "Satisfação dos nossos clientes, valorização e respeito às pessoas.",
    highlight: "Inovação gerando impacto positivo no agro e respeito ao meio ambiente.",
    color: "destructive",
  },
]

const principles = [
  "Compromisso com a sustentabilidade",
  "Inovação constante",
  "Qualidade em cada produto",
  "Respeito ao meio ambiente",
  "Parceria com o produtor",
  "Excelência no atendimento",
]

export function MissaoVisaoValoresSection() {
  return (
    <section className="py-16 md:py-24 lg:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(45,106,79,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(82,183,136,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Nossos Princípios
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Missão, Visão e Valores
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Os pilares que guiam nossa jornada em direção a um agronegócio mais sustentável
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12 md:mb-16">
          {values.map((item) => (
            <div
              key={item.title}
              className="group relative bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div
                className={`h-1.5 w-full ${
                  item.color === "primary"
                    ? "bg-primary"
                    : item.color === "accent"
                    ? "bg-accent"
                    : "bg-destructive"
                }`}
              />
              
              <div className="p-6 md:p-8">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                    item.color === "primary"
                      ? "bg-primary text-primary-foreground"
                      : item.color === "accent"
                      ? "bg-accent text-accent-foreground"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  <item.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>
                
                <p className={`text-sm font-medium leading-relaxed ${
                  item.color === "primary"
                    ? "text-primary"
                    : item.color === "accent"
                    ? "text-accent"
                    : "text-destructive"
                }`}>
                  {item.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Principles List */}
        <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6 text-center">
            O que nos move todos os dias
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {principles.map((principle) => (
              <div
                key={principle}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm text-foreground">{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
