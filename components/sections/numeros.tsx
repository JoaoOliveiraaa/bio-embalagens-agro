"use client"

import { useEffect, useRef, useState } from "react"
import { Leaf, Package, Users, Award } from "lucide-react"

const stats = [
  {
    icon: Leaf,
    value: 100,
    suffix: "%",
    label: "Biodegradável",
    description: "Todos os nossos produtos são 100% biodegradáveis",
  },
  {
    icon: Package,
    value: 6,
    suffix: "+",
    label: "Produtos",
    description: "Linha completa de soluções para o agro",
  },
  {
    icon: Users,
    value: 7,
    suffix: "+",
    label: "Anos",
    description: "De experiência no mercado",
  },
  {
    icon: Award,
    value: 2,
    suffix: "",
    label: "Soluções",
    description: "Especializadas para cana e eucalipto",
  },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const increment = value / (duration / 16)
          
          const timer = setInterval(() => {
            start += increment
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
      {count}
      {suffix}
    </div>
  )
}

export function NumerosSection() {
  return (
    <section className="py-16 md:py-20 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 bg-secondary text-primary rounded-full text-sm font-medium mb-4">
            Nossos Números
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Por que escolher a Bio Embalagens?
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group text-center p-6 rounded-2xl bg-background hover:bg-secondary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <div className="text-sm sm:text-base font-semibold text-foreground mt-1 mb-2">
                {stat.label}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
