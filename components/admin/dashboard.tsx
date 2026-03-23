"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Lightbulb,
  LogOut,
  Plus,
  LayoutDashboard,
} from "lucide-react"
import { ProductsManager } from "./products-manager"
import { SolutionsManager } from "./solutions-manager"

interface AdminUser {
  id: string
  email: string
  name: string | null
}

interface Product {
  id: string
  slug: string
  name: string
  short_description: string | null
  description: string | null
  image_url: string | null
  gallery_urls: string[]
  specifications: Record<string, string>
  applications: string[]
  benefits: string[]
  badge: string | null
  is_active: boolean
  sort_order: number
}

interface Solution {
  id: string
  slug: string
  name: string
  short_description: string | null
  description: string | null
  image_url: string | null
  icon: string | null
  content: Record<string, unknown>
  benefits: string[]
  is_active: boolean
  sort_order: number
}

interface AdminDashboardProps {
  adminUser: AdminUser
  initialProducts: Product[]
  initialSolutions: Solution[]
}

export function AdminDashboard({
  adminUser,
  initialProducts,
  initialSolutions,
}: AdminDashboardProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [solutions, setSolutions] = useState<Solution[]>(initialSolutions)
  const [activeTab, setActiveTab] = useState("dashboard")
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  const activeProducts = products.filter((p) => p.is_active).length
  const activeSolutions = solutions.filter((s) => s.is_active).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#2D6A4F] text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoBioEmbalagem_branco-q3kQPe1WEnNssFAhv6niozo41X9GKE.png"
              alt="Bio Embalagens Agro"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
            <span className="hidden md:block text-sm opacity-80">
              Painel Administrativo
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:block">
              Olá, {adminUser.name || adminUser.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Produtos</span>
            </TabsTrigger>
            <TabsTrigger value="solutions" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Soluções</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Produtos
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {activeProducts} ativos
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Soluções
                  </CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{solutions.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {activeSolutions} ativas
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Produtos Inativos
                  </CardTitle>
                  <Package className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-500">
                    {products.length - activeProducts}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Fora de produção
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Soluções Inativas
                  </CardTitle>
                  <Lightbulb className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-500">
                    {solutions.length - activeSolutions}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Não disponíveis
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Gerencie seu conteúdo rapidamente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setActiveTab("products")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Novo Produto
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setActiveTab("solutions")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Nova Solução
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produtos Recentes</CardTitle>
                  <CardDescription>
                    Últimos produtos cadastrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {products.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              product.is_active ? "bg-green-500" : "bg-orange-500"
                            }`}
                          />
                          <span className="text-sm">{product.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {product.is_active ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <ProductsManager
              products={products}
              onProductsChange={setProducts}
            />
          </TabsContent>

          {/* Solutions Tab */}
          <TabsContent value="solutions">
            <SolutionsManager
              solutions={solutions}
              onSolutionsChange={setSolutions}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
