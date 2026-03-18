import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Leaf, Bug, Target, TrendingUp } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solução para Cana de Açúcar | Bio Embalagens Agro",
  description: "Embalagens biodegradáveis para controle biológico de pragas na cultura da cana de açúcar. Liberação eficiente de Cotesia flavipes para combate à broca-da-cana.",
}

const benefits = [
  {
    icon: Bug,
    title: "Controle da Broca-da-Cana",
    description: "Solução eficaz para o controle da Diatraea saccharalis, principal praga da cana de açúcar no Brasil.",
  },
  {
    icon: Leaf,
    title: "100% Biodegradável",
    description: "Nossas embalagens se decompõem naturalmente no campo, sem gerar resíduos ou impactar o meio ambiente.",
  },
  {
    icon: Target,
    title: "Liberação Precisa",
    description: "Design otimizado para garantir a liberação eficiente dos parasitoides no momento ideal.",
  },
  {
    icon: TrendingUp,
    title: "Aumento da Produtividade",
    description: "Redução significativa das perdas causadas por pragas, resultando em maior rendimento da safra.",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "Acondicionamento",
    description: "Os parasitoides Cotesia flavipes são cuidadosamente acondicionados em nossas cápsulas biodegradáveis.",
  },
  {
    step: "02",
    title: "Distribuição",
    description: "As cápsulas são distribuídas estrategicamente nas áreas de cultivo da cana de açúcar.",
  },
  {
    step: "03",
    title: "Liberação",
    description: "Os parasitoides emergem e buscam ativamente as lagartas da broca-da-cana para parasitá-las.",
  },
  {
    step: "04",
    title: "Controle Biológico",
    description: "O ciclo se completa com a redução natural da população de pragas, sem uso de químicos.",
  },
]

export default function CanaDeAcucarPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80"
            alt="Plantação de cana de açúcar"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/#solucoes"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Soluções
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl text-balance">
            Solução para Cana de Açúcar
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8 text-pretty">
            Embalagens biodegradáveis desenvolvidas especialmente para o controle biológico 
            de pragas na cultura da cana de açúcar, garantindo uma produção mais sustentável e eficiente.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Solicitar Orçamento
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* About the Problem */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-secondary text-primary rounded-full text-sm font-medium mb-4">
                O Desafio
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                A Broca-da-Cana: Principal Praga do Setor Canavieiro
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Diatraea saccharalis, conhecida como broca-da-cana, é responsável por perdas 
                significativas na produção de cana de açúcar no Brasil. A lagarta perfura os 
                colmos, causando a morte da gema apical, perda de peso e abertura de portas 
                para doenças como a podridão-vermelha.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                O controle biológico através da liberação de parasitoides como a Cotesia flavipes 
                é a forma mais sustentável e eficaz de combater essa praga, e nossas embalagens 
                biodegradáveis são fundamentais nesse processo.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Perdas de até 30% na produção sem controle adequado",
                  "Redução da qualidade do açúcar e etanol produzidos",
                  "Controle químico ineficiente e prejudicial ao ambiente",
                  "Controle biológico é a solução mais sustentável",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80"
                  alt="Cana de açúcar em detalhes"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">10M+</div>
                <div className="text-sm text-primary-foreground/80">hectares de cana no Brasil</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Vantagens
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Benefícios da Nossa Solução
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card p-6 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-secondary text-primary rounded-full text-sm font-medium mb-4">
              Processo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Como Funciona
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="bg-card p-6 rounded-2xl border border-border h-full">
                  <span className="text-5xl font-bold text-primary/10 mb-4 block">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Pronto para Aumentar sua Produtividade?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-pretty">
            Entre em contato conosco e descubra como nossas soluções podem ajudar 
            no controle biológico de pragas na sua lavoura de cana de açúcar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Solicitar Orçamento
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/#contato">
                Falar Conosco
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
