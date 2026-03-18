import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, TreeDeciduous, CheckCircle } from "lucide-react"

const solutions = [
  {
    title: "Solução para Cana de Açúcar",
    subtitle: "Controle Biológico de Pragas",
    description:
      "Embalagens biodegradáveis desenvolvidas especialmente para o setor canavieiro, auxiliando no controle biológico de pragas como a broca-da-cana através da liberação de parasitoides.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    href: "/solucoes/cana-de-acucar",
    icon: Leaf,
    features: [
      "Controle da Broca-da-Cana",
      "Liberação de Cotesia flavipes",
      "100% Biodegradável",
      "Aplicação via Drone",
    ],
    stats: { value: "Cotesia", label: "Agente Biológico" },
  },
  {
    title: "Solução para Eucalipto",
    subtitle: "Manejo Florestal Sustentável",
    description:
      "Soluções inovadoras para o setor florestal, com embalagens que auxiliam no manejo integrado de pragas em plantações de eucalipto, promovendo uma silvicultura mais sustentável.",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&q=80",
    href: "/solucoes/eucalipto",
    icon: TreeDeciduous,
    features: [
      "Manejo de Pragas Florestais",
      "Silvicultura Sustentável",
      "Alta Eficiência",
      "Redução de Químicos",
    ],
    stats: { value: "MIP", label: "Manejo Integrado" },
  },
]

export function SolucoesSection() {
  return (
    <section id="solucoes" className="py-16 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary text-primary rounded-full text-sm font-medium mb-4">
            O Que Oferecemos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Nossas Soluções
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Desenvolvemos soluções inovadoras e sustentáveis para atender às
            necessidades específicas do agronegócio brasileiro.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution) => (
            <Link
              key={solution.title}
              href={solution.href}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-accent hover:shadow-2xl transition-all duration-500 h-full">
                {/* Image Section */}
                <div className="aspect-[16/9] sm:aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <solution.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-white/70">{solution.subtitle}</p>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                          {solution.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Stats Badge */}
                  <div className="absolute top-4 right-4 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-center">
                    <div className="text-sm sm:text-base font-bold text-white">{solution.stats.value}</div>
                    <div className="text-[10px] sm:text-xs text-white/70">{solution.stats.label}</div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    {solution.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {solution.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-xs sm:text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent font-semibold group/btn"
                  >
                    Saiba Mais sobre esta solução
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
