import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MessageCircle, MapPin, Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Nossa História", href: "/#nossa-historia" },
  { label: "Nossas Soluções", href: "/#solucoes" },
  { label: "Nossos Produtos", href: "/#produtos" },
  { label: "Contato", href: "/#contato" },
  { label: "Trabalhe Conosco", href: "/#trabalhe-conosco" },
]

const solutions = [
  { label: "Cana de Açúcar", href: "/solucoes/cana-de-acucar" },
  { label: "Eucalipto", href: "/solucoes/eucalipto" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Tagline - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoBioEmbalagem_branco-q3kQPe1WEnNssFAhv6niozo41X9GKE.png"
                alt="Bio Embalagens Agro"
                width={200}
                height={55}
                className="h-10 sm:h-12 w-auto"
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6 max-w-xs">
              Inovação e tecnologia no desenvolvimento de embalagens
              biodegradáveis para o agronegócio brasileiro.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/bioembalagensagro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/bioembalagensagro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/bioembalagensagro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm sm:text-base mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-sm sm:text-base mb-4">
              Soluções
            </h3>
            <ul className="space-y-2">
              {solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-sm sm:text-base mt-6 mb-4">
              Horário
            </h3>
            <p className="text-sm text-primary-foreground/70">
              Seg - Sex: 08:00 - 18:00
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-semibold text-sm sm:text-base mb-4">Contato</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+551634191777"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>(16) 3419-1777</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5516997488066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0" />
                  <span>(16) 99748-8066</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@bioembalagensagro.com.br"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors break-all"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>contato@bioembalagensagro.com.br</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  Rua Dino Guelf, 244 - Vila Alpes
                  <br />
                  São Carlos - SP
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-primary-foreground/60 text-center sm:text-left">
              {new Date().getFullYear()} Bio Embalagens Agro. Todos os direitos
              reservados. Desenvovido por <a href="https://www.vexisoficial.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Vexis Oficial</a>
            </p>
            <a
              href="#"
              className="flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
