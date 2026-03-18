import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Leaf, TreePine, Shield, Sprout } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solução para Eucalipto | Bio Embalagens Agro",
  description: "Embalagens biodegradáveis para manejo integrado de pragas em plantações de eucalipto. Soluções sustentáveis para uma silvicultura mais eficiente.",
}

const benefits = [
  {
    icon: TreePine,
    title: "Proteção Florestal",
    description: "Soluções desenvolvidas para proteger plantações de eucalipto contra as principais pragas do setor.",
  },
  {
    icon: Leaf,
    title: "100% Biodegradável",
    description: "Embalagens que se integram ao ambiente florestal sem deixar resíduos ou impactar o ecossistema.",
  },
  {
    icon: Shield,
    title: "Manejo Integrado",
    description: "Estratégias de controle biológico integradas às práticas de manejo florestal sustentável.",
  },
  {
    icon: Sprout,
    title: "Florestas Saudáveis",
    description: "Contribuímos para o desenvolvimento de florestas plantadas mais saudáveis e produtivas.",
  },
]

const pests = [
  {
    name: "Psilídeo-de-concha",
    scientific: "Glycaspis brimblecombei",
    description: "Praga que afeta as folhas do eucalipto, causando desfolha e redução do crescimento.",
  },
  {
    name: "Percevejo Bronzeado",
    scientific: "Thaumastocoris peregrinus",
    description: "Inseto sugador que causa o bronzeamento das folhas e pode levar à morte da árvore.",
  },
  {
    name: "Vespa-da-galha",
    scientific: "Leptocybe invasa",
    description: "Forma galhas nos brotos e folhas, prejudicando o desenvolvimento das mudas.",
  },
  {
    name: "Gonipterus",
    scientific: "Gonipterus platensis",
    description: "Besouro desfolhador que ataca folhas jovens, comprometendo a fotossíntese.",
  },
]

const advantages = [
  "Redução de até 80% no uso de defensivos químicos",
  "Menor impacto ambiental nas áreas de preservação",
  "Certificação florestal facilitada (FSC, PEFC)",
  "Custo-benefício superior a longo prazo",
  "Manutenção do equilíbrio ecológico",
  "Produtividade sustentável das florestas",
]

export default function EucaliptoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1920&q=80"
            alt="Plantação de eucalipto"
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
            Solução para Eucalipto
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8 text-pretty">
            Embalagens biodegradáveis para o manejo integrado de pragas em plantações de eucalipto, 
            promovendo uma silvicultura mais sustentável e produtiva.
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

      {/* About */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-secondary text-primary rounded-full text-sm font-medium mb-4">
                O Setor Florestal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                Silvicultura Sustentável com Controle Biológico
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O Brasil possui uma das maiores áreas de florestas plantadas de eucalipto do mundo, 
                com mais de 7 milhões de hectares. Manter essas florestas saudáveis e produtivas 
                é um desafio constante, especialmente com a chegada de novas pragas exóticas.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nossas embalagens biodegradáveis foram desenvolvidas para auxiliar no controle 
                biológico de pragas florestais, oferecendo uma alternativa sustentável aos 
                defensivos químicos tradicionais.
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-3">
                {advantages.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80"
                  alt="Floresta de eucalipto"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">7M+</div>
                <div className="text-sm text-primary-foreground/80">hectares de eucalipto</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pests */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Pragas Controladas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Principais Pragas do Eucalipto
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossas soluções auxiliam no controle das principais pragas que afetam as plantações de eucalipto no Brasil.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pests.map((pest) => (
              <div
                key={pest.name}
                className="bg-card p-6 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {pest.name}
                </h3>
                <p className="text-xs text-accent italic mb-3">
                  {pest.scientific}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pest.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-secondary text-primary rounded-full text-sm font-medium mb-4">
              Vantagens
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Por Que Escolher Nossas Soluções
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

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Proteja Suas Florestas de Forma Sustentável
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-pretty">
            Entre em contato conosco e descubra como nossas soluções podem ajudar 
            no manejo integrado de pragas em suas plantações de eucalipto.
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
