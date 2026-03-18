"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Filter } from "lucide-react"

const categories = [
  { id: "all", label: "Todos" },
  { id: "capsulas", label: "Cápsulas" },
  { id: "gaiolas", label: "Gaiolas" },
  { id: "outros", label: "Outros" },
]

const products = [
  {
    name: "Cápsula CV22",
    subtitle: "Biodegradável",
    slug: "capsula-cv22",
    category: "capsulas",
    description:
      "Cápsula biodegradável ideal para acondicionamento de agentes biológicos de controle de pragas.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    badge: "Mais Vendido",
  },
  {
    name: "Gaiola para Armadilha",
    subtitle: "Modelo 66",
    slug: "gaiola-modelo-66",
    category: "gaiolas",
    description:
      "Gaiola especialmente desenvolvida para armadilhas de monitoramento de pragas agrícolas.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80",
    badge: null,
  },
  {
    name: "Gaiola para Armadilha",
    subtitle: "Modelo 70",
    slug: "gaiola-modelo-70",
    category: "gaiolas",
    description:
      "Versão ampliada da gaiola para armadilhas, atendendo a diferentes necessidades de monitoramento.",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80",
    badge: null,
  },
  {
    name: "Cápsula CVP 60",
    subtitle: "Biodegradável",
    slug: "capsula-cvp-60",
    category: "capsulas",
    description:
      "Cápsula com design otimizado para melhor desempenho no campo e maior durabilidade.",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&q=80",
    badge: "Novo",
  },
  {
    name: "Cone para Hidroponia",
    subtitle: "Sustentável",
    slug: "cone-hidroponia",
    category: "outros",
    description:
      "Solução biodegradável para cultivos hidropônicos, facilitando o desenvolvimento das raízes.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: null,
  },
  {
    name: "Cápsula CVC60",
    subtitle: "Biodegradável",
    slug: "capsula-cvc60",
    category: "capsulas",
    description:
      "Cápsula compacta e eficiente para diversas aplicações no agronegócio sustentável.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80",
    badge: null,
  },
]

export function ProdutosSection() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory)

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

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.slug}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
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
                  {product.subtitle}
                </span>
              </div>
              
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                  {product.description}
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
