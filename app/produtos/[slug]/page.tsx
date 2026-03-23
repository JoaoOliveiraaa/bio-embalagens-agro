import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, MessageCircle, FileText, Package } from "lucide-react"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from("products")
    .select("name, short_description")
    .eq("slug", slug)
    .single()
  
  if (!product) {
    return {
      title: "Produto não encontrado | Bio Embalagens Agro",
    }
  }

  return {
    title: `${product.name} | Bio Embalagens Agro`,
    description: product.short_description || `Conheça o ${product.name} - embalagem biodegradável para o agronegócio.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch product
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !product) {
    notFound()
  }

  // Fetch related products
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("id, slug, name, short_description, image_url")
    .eq("is_active", true)
    .neq("slug", slug)
    .order("sort_order", { ascending: true })
    .limit(3)

  const specs = product.specifications || {}
  const applications = product.applications || []
  const benefits = product.benefits || []
  const gallery = product.gallery_urls || []

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
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-accent/20">
                    <Package className="w-24 h-24 text-primary/30" />
                  </div>
                )}
              </div>
              {gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {gallery.slice(0, 3).map((img: string, index: number) => (
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
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.badge && (
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-4">
                  {product.badge}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.description || product.short_description}
              </p>

              {/* Specs */}
              {Object.keys(specs).length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6 mb-8">
                  <h3 className="font-semibold text-foreground mb-4">Especificações Técnicas</h3>
                  <dl className="space-y-3">
                    {Object.entries(specs).map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <dt className="text-muted-foreground capitalize">{label.replace(/_/g, " ")}</dt>
                        <dd className="font-medium text-foreground">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <a
                    href="https://wa.me/5516997488066"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Solicitar Orçamento
                  </a>
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
      {(applications.length > 0 || benefits.length > 0) && (
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Applications */}
              {applications.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Aplicações</h2>
                  <ul className="space-y-4">
                    {applications.map((app: string) => (
                      <li key={app} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-foreground">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {benefits.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Benefícios</h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit: string) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Produtos Relacionados</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/produtos/${relatedProduct.slug}`}
                  className="group block"
                >
                  <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-accent hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-secondary to-accent/20">
                      {relatedProduct.image_url ? (
                        <Image
                          src={relatedProduct.image_url}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package className="w-12 h-12 text-primary/30" />
                        </div>
                      )}
                      <span className="absolute bottom-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                        Biodegradável
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedProduct.short_description || "Embalagem biodegradável de alta qualidade."}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <a
                href="https://wa.me/5516997488066"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Orçamento
              </a>
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
