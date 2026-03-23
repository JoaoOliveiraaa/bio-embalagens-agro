"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Package,
  Eye,
  EyeOff,
  GripVertical,
  Save,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload, GalleryUpload } from "@/components/admin/image-upload"

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

interface ProductsManagerProps {
  products: Product[]
  onProductsChange: (products: Product[]) => void
}

const emptyProduct: Omit<Product, "id"> = {
  slug: "",
  name: "",
  short_description: "",
  description: "",
  image_url: "",
  gallery_urls: [],
  specifications: {},
  applications: [],
  benefits: [],
  badge: "",
  is_active: true,
  sort_order: 0,
}

export function ProductsManager({ products, onProductsChange }: ProductsManagerProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(emptyProduct)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [specificationsText, setSpecificationsText] = useState("")
  const [applicationsText, setApplicationsText] = useState("")
  const [benefitsText, setBenefitsText] = useState("")
  const { toast } = useToast()
  const supabase = createClient()

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const parseSpecifications = (text: string): Record<string, string> => {
    const specs: Record<string, string> = {}
    text.split("\n").forEach((line) => {
      const [key, value] = line.split(":").map((s) => s.trim())
      if (key && value) {
        specs[key] = value
      }
    })
    return specs
  }

  const specsToText = (specs: Record<string, string>): string => {
    return Object.entries(specs)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")
  }

  const handleCreate = async () => {
    setIsLoading(true)
    try {
      const productData = {
        ...newProduct,
        slug: newProduct.slug || generateSlug(newProduct.name),
        specifications: parseSpecifications(specificationsText),
        applications: applicationsText.split("\n").filter(Boolean),
        benefits: benefitsText.split("\n").filter(Boolean),
        sort_order: products.length + 1,
      }

      const { data, error } = await supabase
        .from("products")
        .insert(productData)
        .select()
        .single()

      if (error) throw error

      onProductsChange([...products, data])
      setIsCreateOpen(false)
      setNewProduct(emptyProduct)
      setSpecificationsText("")
      setApplicationsText("")
      setBenefitsText("")
      toast({
        title: "Produto criado!",
        description: `${data.name} foi adicionado com sucesso.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao criar produto",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async () => {
    if (!editingProduct) return
    setIsLoading(true)
    try {
      const productData = {
        ...editingProduct,
        specifications: parseSpecifications(specificationsText),
        applications: applicationsText.split("\n").filter(Boolean),
        benefits: benefitsText.split("\n").filter(Boolean),
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id)
        .select()
        .single()

      if (error) throw error

      onProductsChange(
        products.map((p) => (p.id === data.id ? data : p))
      )
      setIsEditOpen(false)
      setEditingProduct(null)
      toast({
        title: "Produto atualizado!",
        description: `${data.name} foi atualizado com sucesso.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao atualizar produto",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", deleteId)

      if (error) throw error

      onProductsChange(products.filter((p) => p.id !== deleteId))
      setDeleteId(null)
      toast({
        title: "Produto excluído!",
        description: "O produto foi removido com sucesso.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao excluir produto",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleActive = async (product: Product) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .update({ is_active: !product.is_active, updated_at: new Date().toISOString() })
        .eq("id", product.id)
        .select()
        .single()

      if (error) throw error

      onProductsChange(
        products.map((p) => (p.id === data.id ? data : p))
      )
      toast({
        title: data.is_active ? "Produto ativado!" : "Produto desativado!",
        description: `${data.name} foi ${data.is_active ? "ativado" : "desativado"}.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao atualizar status",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setSpecificationsText(specsToText(product.specifications || {}))
    setApplicationsText((product.applications || []).join("\n"))
    setBenefitsText((product.benefits || []).join("\n"))
    setIsEditOpen(true)
  }

  const openCreateDialog = () => {
    setNewProduct(emptyProduct)
    setSpecificationsText("")
    setApplicationsText("")
    setBenefitsText("")
    setIsCreateOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Produtos</h2>
          <p className="text-muted-foreground">
            Gerencie os produtos exibidos no site
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="bg-[#2D6A4F] hover:bg-[#1B4332]">
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Produto</DialogTitle>
              <DialogDescription>
                Preencha os campos para adicionar um novo produto ao catálogo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome *</label>
                  <Input
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    placeholder="Ex: Cápsula CV22"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={newProduct.slug}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, slug: e.target.value })
                    }
                    placeholder="capsula-cv22 (auto)"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição Curta</label>
                <Input
                  value={newProduct.short_description || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, short_description: e.target.value })
                  }
                  placeholder="Breve descrição para listagens"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição Completa</label>
                <Textarea
                  value={newProduct.description || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  placeholder="Descrição detalhada do produto"
                  rows={4}
                />
              </div>
              <ImageUpload
                value={newProduct.image_url}
                onChange={(url) => setNewProduct({ ...newProduct, image_url: url })}
                folder="products"
                slug={newProduct.slug || newProduct.name || "produto"}
                label="Imagem principal"
              />
              <GalleryUpload
                values={newProduct.gallery_urls || []}
                onChange={(urls) => setNewProduct({ ...newProduct, gallery_urls: urls })}
                folder="products"
                slug={newProduct.slug || newProduct.name || "galeria"}
                label="Galeria de imagens"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Badge (opcional)</label>
                  <Input
                    value={newProduct.badge || ""}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, badge: e.target.value })
                    }
                    placeholder="Ex: Novo, Mais Vendido"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Especificações (uma por linha, formato: chave: valor)
                </label>
                <Textarea
                  value={specificationsText}
                  onChange={(e) => setSpecificationsText(e.target.value)}
                  placeholder="Material: Celulose&#10;Dimensões: 22mm x 15mm&#10;Capacidade: 200 pupas"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Aplicações (uma por linha)
                  </label>
                  <Textarea
                    value={applicationsText}
                    onChange={(e) => setApplicationsText(e.target.value)}
                    placeholder="Controle biológico&#10;Aplicação via drone&#10;Liberação em campo"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Benefícios (um por linha)
                  </label>
                  <Textarea
                    value={benefitsText}
                    onChange={(e) => setBenefitsText(e.target.value)}
                    placeholder="100% biodegradável&#10;Fácil aplicação&#10;Ecológico"
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={newProduct.is_active}
                  onCheckedChange={(checked) =>
                    setNewProduct({ ...newProduct, is_active: checked })
                  }
                />
                <label className="text-sm font-medium">Produto ativo no site</label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreate}
                disabled={isLoading || !newProduct.name}
                className="bg-[#2D6A4F] hover:bg-[#1B4332]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Criar Produto
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card
            key={product.id}
            className={`relative ${!product.is_active ? "opacity-60" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-xs">
                      /{product.slug}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {product.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleActive(product)}
                  >
                    {product.is_active ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-orange-500" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.short_description || "Sem descrição"}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(product)}
                >
                  <Pencil className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setDeleteId(product.id)}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {products.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhum produto cadastrado</p>
              <Button
                variant="link"
                onClick={openCreateDialog}
                className="mt-2"
              >
                Criar primeiro produto
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>
              Atualize as informações do produto.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome *</label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={editingProduct.slug}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, slug: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição Curta</label>
                <Input
                  value={editingProduct.short_description || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      short_description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição Completa</label>
                <Textarea
                  value={editingProduct.description || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
              <ImageUpload
                value={editingProduct.image_url}
                onChange={(url) =>
                  setEditingProduct({ ...editingProduct, image_url: url })
                }
                folder="products"
                slug={editingProduct.slug || editingProduct.name || "produto"}
                label="Imagem principal"
              />
              <GalleryUpload
                values={editingProduct.gallery_urls || []}
                onChange={(urls) =>
                  setEditingProduct({ ...editingProduct, gallery_urls: urls })
                }
                folder="products"
                slug={editingProduct.slug || editingProduct.name || "galeria"}
                label="Galeria de imagens"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Badge</label>
                  <Input
                    value={editingProduct.badge || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        badge: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Especificações (uma por linha, formato: chave: valor)
                </label>
                <Textarea
                  value={specificationsText}
                  onChange={(e) => setSpecificationsText(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Aplicações (uma por linha)
                  </label>
                  <Textarea
                    value={applicationsText}
                    onChange={(e) => setApplicationsText(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Benefícios (um por linha)
                  </label>
                  <Textarea
                    value={benefitsText}
                    onChange={(e) => setBenefitsText(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingProduct.is_active}
                  onCheckedChange={(checked) =>
                    setEditingProduct({ ...editingProduct, is_active: checked })
                  }
                />
                <label className="text-sm font-medium">Produto ativo no site</label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={isLoading || !editingProduct?.name}
              className="bg-[#2D6A4F] hover:bg-[#1B4332]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir produto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O produto será removido
              permanentemente do catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
