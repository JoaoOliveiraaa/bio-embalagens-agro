import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HeroSection } from "@/components/sections/hero"
import { NumerosSection } from "@/components/sections/numeros"
import { NossaHistoriaSection } from "@/components/sections/nossa-historia"
import { MissaoVisaoValoresSection } from "@/components/sections/missao-visao-valores"
import { SolucoesSection } from "@/components/sections/solucoes"
import { ProdutosSection } from "@/components/sections/produtos"
import { CTABannerSection } from "@/components/sections/cta-banner"
import { TrabalheConoscoSection } from "@/components/sections/trabalhe-conosco"
import { ContatoSection } from "@/components/sections/contato"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <NumerosSection />
        <ProdutosSection />
        <SolucoesSection />
        <NossaHistoriaSection />
        <MissaoVisaoValoresSection />
        <CTABannerSection />
        <TrabalheConoscoSection />
        <ContatoSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
