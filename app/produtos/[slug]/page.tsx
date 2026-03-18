import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { products, getProductBySlug, getAllProductSlugs } from "@/lib/products"
import { ArrowLeft, Check, MessageCircle, FileText } from "lucide-react"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  if (!product) {
    return {
      title: "Produto não encontrado | Bio Embalagens Agro",
    }
  }

  return {
    title: `${product.name} ${product.subtitle} | Bio Embalagens Agro`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Get related products (excluding current)
  const relatedProducts = products
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Link 
            href="/#produtos"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Produtos
          </Link>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-card">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((img, index) => (
                  <div 
                    key={index}
                    className="aspect-square relative rounded-xl overflow-hidden bg-card border-2 border-transparent hover:border-accent transition-colors cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - Imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-4">
                {product.subtitle}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Specs */}
              <div className="bg-card rounded-2xl border border-border p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4">Especificações Técnicas</h3>
                <dl className="space-y-3">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between">
                      <dt className="text-muted-foreground">{spec.label}</dt>
                      <dd className="font-medium text-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Solicitar Orçamento
                </Button>
                <Button size="lg" variant="outline">
                  <FileText className="mr-2 h-5 w-5" />
                  Ficha Técnica
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications & Benefits */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Applications */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Aplicações</h2>
              <ul className="space-y-4">
                {product.applications.map((app) => (
                  <li key={app} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-foreground">{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Benefícios</h2>
              <ul className="space-y-4">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Produtos Relacionados</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.slug}
                href={`/produtos/${relatedProduct.slug}`}
                className="group block"
              >
                <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-accent hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {relatedProduct.subtitle}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedProduct.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Interessado neste produto?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-pretty">
            Entre em contato conosco para solicitar um orçamento personalizado 
            ou tirar suas dúvidas sobre o {product.name}.
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
