import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, ArrowRight } from "lucide-react"

export function CTABannerSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
          alt="Campo agrícola ao pôr do sol"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/85" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-white/20">
            Vamos Conversar?
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Pronto para transformar sua produção?
          </h2>
          
          <p className="text-base sm:text-lg text-white/85 mb-8 text-pretty max-w-xl mx-auto">
            Entre em contato conosco e descubra como nossas soluções
            biodegradáveis podem revolucionar sua produção agrícola.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-6 sm:px-8 h-12 sm:h-14 w-full sm:w-auto"
            >
              <a
                href="https://wa.me/5516997488066"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Fale pelo WhatsApp
              </a>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white font-semibold px-6 sm:px-8 h-12 sm:h-14 w-full sm:w-auto backdrop-blur-sm"
            >
              <a href="tel:+551634191777">
                <Phone className="mr-2 h-5 w-5" />
                (16) 3419-1777
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
              <div className="text-xs sm:text-sm text-white/60">Biodegradável</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">7+</div>
              <div className="text-xs sm:text-sm text-white/60">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">Brasil</div>
              <div className="text-xs sm:text-sm text-white/60">Atendimento Nacional</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
