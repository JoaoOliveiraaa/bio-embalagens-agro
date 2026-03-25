"use client"

import Image from "next/image"
import { Award, Users, Target, Calendar } from "lucide-react"

const milestones = [
  {
    icon: Calendar,
    year: "2017",
    title: "O Início",
    description: "Fundação da Bio Embalagens Agro a partir de um desafio da Geocom"
  },
  {
    icon: Target,
    year: "Desafio",
    title: "Inovação",
    description: "Desenvolvimento do primeiro tubete biodegradável para Cotesia"
  },
  {
    icon: Award,
    year: "Pioneiros",
    title: "Referência",
    description: "Primeiros no Brasil a criar embalagens para controle biológico"
  },
  {
    icon: Users,
    year: "Hoje",
    title: "Crescimento",
    description: "Expandindo soluções para diversos setores do agronegócio"
  },
]

export function NossaHistoriaSection() {
  return (
    <section id="nossa-historia" className="py-16 md:py-24 lg:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 bg-secondary text-primary rounded-full text-sm font-medium mb-4">
              Quem Somos
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Nossa História de Inovação
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Em 2017, a empresa pioneira no desenvolvimento da tecnologia de
                aplicação de agente biológico (Cotesia) via drone, Geocom,
                juntamente com as biofábricas do agente biológico referências no
                mercado, nos lançou um desafio:{" "}
                <strong className="text-foreground">
                  desenvolver uma embalagem biodegradável que permitisse
                  acondicionar a Cotesia sem a fuga da mesma.
                </strong>
              </p>

              <p>
                Com esse desafio em mãos, nasceu a Bio Embalagens Agro. Como
                seus fundadores já possuíam empresas no ramo de embalagens
                biodegradáveis com segmento no agronegócio, idealizaram e
                desenvolveram com pioneirismo o hoje conhecido
                &ldquo;Tubete&rdquo;.
              </p>
            </div>

            {/* Timeline/Milestones */}
            <div className="grid grid-cols-2 gap-4">
              {milestones.map((item) => (
                <div
                  key={item.title}
                  className="p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon className="w-5 h-5 text-primary group-hover:text-white" />
                    </div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Collage */}
          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary relative shadow-lg">
                  <Image
                    src="images/bannereucalipto.jpg"
                    alt="Campo de cana-de-açúcar"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-primary flex items-center justify-center p-6 shadow-lg">
                  <div className="text-center text-white">
                    <div className="text-4xl sm:text-5xl font-bold mb-2">7+</div>
                    <div className="text-sm text-white/80">Anos de Experiência</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary relative shadow-lg">
                  <Image
                    src="images/bannereucalipto2.jpg"
                    alt="Plantação de eucalipto"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary relative shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80"
                    alt="Agricultura sustentável"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-2xl -z-10 hidden lg:block" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-2xl -z-10 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
