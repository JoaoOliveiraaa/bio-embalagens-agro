"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Filter, Package, Loader2 } from "lucide-react"

interface Product {
  id: string
  slug: string
  name: string
  short_description: string | null
  image_url: string | null
  badge: string | null
  is_active: boolean
}

const categories = [
  { id: "all", label: "Todos" },
  { id: "capsulas", label: "Cápsulas" },
  { id: "gaiolas", label: "Gaiolas" },
  { id: "outros", label: "Outros" },
]

export function ProdutosSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const supabase = createClient()

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("id, slug, name, short_description, image_url, badge, is_active")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (!error && data) {
        setProducts(data)
      }
      setIsLoading(false)
    }

    fetchProducts()
  }, [supabase])

  const getCategory = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes("cápsula") || lowerName.includes("capsula")) return "capsulas"
    if (lowerName.includes("gaiola")) return "gaiolas"
    return "outros"
  }

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => getCategory(p.name) === activeCategory)

  return (
    <section id="produtos" className="py-16 md:py-24 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Catálogo
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Nossos Produtos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Conheça nossa linha completa de embalagens biodegradáveis
            desenvolvidas especialmente para o agronegócio.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 md:mb-10 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length > 0 ? (
          /* Products Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-secondary to-accent/20">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-16 h-16 text-primary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.badge && (
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        product.badge === "Novo"
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
                    Biodegradável
                  </span>
                </div>
                
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {product.short_description || "Embalagem biodegradável de alta qualidade para o agronegócio."}
                  </p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent font-medium group/btn"
                    asChild
                  >
                    <Link href={`/produtos/${product.slug}`}>
                      Saiba Mais
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10 md:mt-12">
          <p className="text-muted-foreground mb-4">
            Não encontrou o que procura? Entre em contato conosco!
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a
              href="https://wa.me/5516997488066"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale com um especialista
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
