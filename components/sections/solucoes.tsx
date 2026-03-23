"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, TreeDeciduous, CheckCircle, Lightbulb, Loader2 } from "lucide-react"

interface Solution {
  id: string
  slug: string
  name: string
  short_description: string | null
  description: string | null
  image_url: string | null
  icon: string | null
  benefits: string[]
  is_active: boolean
}

const iconMap: Record<string, React.ElementType> = {
  Leaf: Leaf,
  Trees: TreeDeciduous,
  TreeDeciduous: TreeDeciduous,
  Lightbulb: Lightbulb,
}

export function SolucoesSection() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchSolutions() {
      const { data, error } = await supabase
        .from("solutions")
        .select("id, slug, name, short_description, description, image_url, icon, benefits, is_active")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (!error && data) {
        setSolutions(data)
      }
      setIsLoading(false)
    }

    fetchSolutions()
  }, [supabase])

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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : solutions.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {solutions.map((solution) => {
              const Icon = iconMap[solution.icon || "Leaf"] || Leaf
              const features = solution.benefits?.slice(0, 4) || []
              
              return (
                <Link
                  key={solution.id}
                  href={`/solucoes/${solution.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-accent hover:shadow-2xl transition-all duration-500 h-full">
                    {/* Image Section */}
                    <div className="aspect-[16/9] sm:aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                      {solution.image_url ? (
                        <Image
                          src={solution.image_url}
                          alt={solution.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-20 h-20 text-primary/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Overlay Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-white/70">Solução para</p>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                              {solution.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-6">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                        {solution.short_description || solution.description}
                      </p>

                      {/* Features Grid */}
                      {features.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-xs sm:text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                              <span className="text-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

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
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma solução disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  )
}
