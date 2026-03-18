"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, MessageCircle, MapPin, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Nossa História", href: "/#nossa-historia" },
  {
    label: "Nossas Soluções",
    href: "/#solucoes",
    dropdown: [
      { label: "Cana de Açúcar", href: "/solucoes/cana-de-acucar" },
      { label: "Eucalipto", href: "/solucoes/eucalipto" },
    ],
  },
  {
    label: "Nossos Produtos",
    href: "/#produtos",
    dropdown: [
      { label: "Cápsula CV22", href: "/produtos/capsula-cv22" },
      { label: "Gaiola para Armadilha 66", href: "/produtos/gaiola-modelo-66" },
      { label: "Gaiola para Armadilha 70", href: "/produtos/gaiola-modelo-70" },
      { label: "Cápsula CVP 60", href: "/produtos/capsula-cvp-60" },
      { label: "Cone para Hidroponia", href: "/produtos/cone-hidroponia" },
      { label: "Cápsula CVC60", href: "/produtos/capsula-cvc60" },
    ],
  },
  { label: "Contato", href: "/#contato" },
  { label: "Trabalhe Conosco", href: "/#trabalhe-conosco" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const toggleExpanded = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label)
  }

  return (
    <>
      {/* Top Bar - Hidden on mobile for cleaner look */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-end gap-6">
          <a
            href="tel:+551634191777"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>(16) 3419-1777</span>
          </a>
          <a
            href="https://wa.me/5516997488066"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>(16) 99748-8066</span>
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>São Carlos - SP</span>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-card/98 backdrop-blur-md shadow-md"
            : "bg-card/95 backdrop-blur-sm border-b border-border"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative z-50">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoBioEmbalagem-qqe3Ud8aolhXuDffTOUgFUiTUklWqD.png"
                alt="Bio Embalagens Agro"
                width={180}
                height={50}
                className="h-9 sm:h-10 md:h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.dropdown ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-foreground hover:text-primary hover:bg-secondary/50 font-medium"
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-56">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.label} asChild>
                          <Link href={subItem.href}>{subItem.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    key={item.label}
                    variant="ghost"
                    asChild
                    className="text-foreground hover:text-primary hover:bg-secondary/50 font-medium"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                )
              )}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden relative z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

      </header>

      {/* Mobile Navigation - Full Screen Overlay - OUTSIDE header for proper z-index */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-full max-w-sm bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Menu Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-border bg-card">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoBioEmbalagem-qqe3Ud8aolhXuDffTOUgFUiTUklWqD.png"
                alt="Bio Embalagens Agro"
                width={120}
                height={35}
                className="h-8 w-auto"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto py-2 bg-card">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-border/30 last:border-0">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleExpanded(item.label)}
                        className="w-full flex items-center justify-between px-6 py-4 text-foreground hover:text-primary hover:bg-secondary/50 font-medium transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronRight
                          className={cn(
                            "h-5 w-5 transition-transform duration-200",
                            expandedItem === item.label && "rotate-90"
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          expandedItem === item.label
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="bg-secondary/30 py-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-10 py-3 text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-6 py-4 text-foreground hover:text-primary hover:bg-secondary/50 font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Contact Info */}
            <div className="border-t border-border p-4 space-y-3 bg-secondary/30">
              <a
                href="tel:+551634191777"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">(16) 3419-1777</span>
              </a>
              <a
                href="https://wa.me/5516997488066"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-[#25D366] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                </div>
                <span className="text-sm font-medium">(16) 99748-8066</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
