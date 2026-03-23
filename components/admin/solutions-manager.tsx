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
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Lightbulb,
  Eye,
  EyeOff,
  GripVertical,
  Save,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload } from "@/components/admin/image-upload"

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

interface SolutionsManagerProps {
  solutions: Solution[]
  onSolutionsChange: (solutions: Solution[]) => void
}

const emptySolution: Omit<Solution, "id"> = {
  slug: "",
  name: "",
  short_description: "",
  description: "",
  image_url: "",
  icon: "",
  content: {},
  benefits: [],
  is_active: true,
  sort_order: 0,
}

export function SolutionsManager({ solutions, onSolutionsChange }: SolutionsManagerProps) {
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null)
  const [newSolution, setNewSolution] = useState<Omit<Solution, "id">>(emptySolution)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [benefitsText, setBenefitsText] = useState("")
  const [contentText, setContentText] = useState("")
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

  const parseContent = (text: string): Record<string, unknown> => {
    try {
      return JSON.parse(text)
    } catch {
      // If not valid JSON, parse as key: value pairs
      const content: Record<string, string> = {}
      text.split("\n").forEach((line) => {
        const [key, ...values] = line.split(":")
        if (key && values.length) {
          content[key.trim()] = values.join(":").trim()
        }
      })
      return content
    }
  }

  const contentToText = (content: Record<string, unknown>): string => {
    return JSON.stringify(content, null, 2)
  }

  const handleCreate = async () => {
    setIsLoading(true)
    try {
      const solutionData = {
        ...newSolution,
        slug: newSolution.slug || generateSlug(newSolution.name),
        content: parseContent(contentText),
        benefits: benefitsText.split("\n").filter(Boolean),
        sort_order: solutions.length + 1,
      }

      const { data, error } = await supabase
        .from("solutions")
        .insert(solutionData)
        .select()
        .single()

      if (error) throw error

      onSolutionsChange([...solutions, data])
      setIsCreateOpen(false)
      setNewSolution(emptySolution)
      setContentText("")
      setBenefitsText("")
      toast({
        title: "Solução criada!",
        description: `${data.name} foi adicionada com sucesso.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao criar solução",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async () => {
    if (!editingSolution) return
    setIsLoading(true)
    try {
      const solutionData = {
        ...editingSolution,
        content: parseContent(contentText),
        benefits: benefitsText.split("\n").filter(Boolean),
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from("solutions")
        .update(solutionData)
        .eq("id", editingSolution.id)
        .select()
        .single()

      if (error) throw error

      onSolutionsChange(
        solutions.map((s) => (s.id === data.id ? data : s))
      )
      setIsEditOpen(false)
      setEditingSolution(null)
      toast({
        title: "Solução atualizada!",
        description: `${data.name} foi atualizada com sucesso.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao atualizar solução",
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
        .from("solutions")
        .delete()
        .eq("id", deleteId)

      if (error) throw error

      onSolutionsChange(solutions.filter((s) => s.id !== deleteId))
      setDeleteId(null)
      toast({
        title: "Solução excluída!",
        description: "A solução foi removida com sucesso.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao excluir solução",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleActive = async (solution: Solution) => {
    try {
      const { data, error } = await supabase
        .from("solutions")
        .update({ is_active: !solution.is_active, updated_at: new Date().toISOString() })
        .eq("id", solution.id)
        .select()
        .single()

      if (error) throw error

      onSolutionsChange(
        solutions.map((s) => (s.id === data.id ? data : s))
      )
      toast({
        title: data.is_active ? "Solução ativada!" : "Solução desativada!",
        description: `${data.name} foi ${data.is_active ? "ativada" : "desativada"}.`,
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

  const openEditDialog = (solution: Solution) => {
    setEditingSolution(solution)
    setContentText(contentToText(solution.content || {}))
    setBenefitsText((solution.benefits || []).join("\n"))
    setIsEditOpen(true)
  }

  const openCreateDialog = () => {
    setNewSolution(emptySolution)
    setContentText("{}")
    setBenefitsText("")
    setIsCreateOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Soluções</h2>
          <p className="text-muted-foreground">
            Gerencie as soluções exibidas no site
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="bg-[#2D6A4F] hover:bg-[#1B4332]">
              <Plus className="w-4 h-4 mr-2" />
              Nova Solução
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Solução</DialogTitle>
              <DialogDescription>
                Preencha os campos para adicionar uma nova solução.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome *</label>
                  <Input
                    value={newSolution.name}
                    onChange={(e) =>
                      setNewSolution({ ...newSolution, name: e.target.value })
                    }
                    placeholder="Ex: Cana de Açúcar"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={newSolution.slug}
                    onChange={(e) =>
                      setNewSolution({ ...newSolution, slug: e.target.value })
                    }
                    placeholder="cana-de-acucar (auto)"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ícone</label>
                  <Input
                    value={newSolution.icon || ""}
                    onChange={(e) =>
                      setNewSolution({ ...newSolution, icon: e.target.value })
                    }
                    placeholder="Leaf, Trees, etc."
                  />
                </div>
              </div>
              <ImageUpload
                value={newSolution.image_url}
                onChange={(url) => setNewSolution({ ...newSolution, image_url: url })}
                folder="solutions"
                slug={newSolution.slug || newSolution.name || "solucao"}
                label="Imagem"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição Curta</label>
                <Input
                  value={newSolution.short_description || ""}
                  onChange={(e) =>
                    setNewSolution({ ...newSolution, short_description: e.target.value })
                  }
                  placeholder="Breve descrição para listagens"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição Completa</label>
                <Textarea
                  value={newSolution.description || ""}
                  onChange={(e) =>
                    setNewSolution({ ...newSolution, description: e.target.value })
                  }
                  placeholder="Descrição detalhada da solução"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Conteúdo Adicional (JSON)
                </label>
                <Textarea
                  value={contentText}
                  onChange={(e) => setContentText(e.target.value)}
                  placeholder='{"hero_title": "Título", "hero_subtitle": "Subtítulo"}'
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Benefícios (um por linha)
                </label>
                <Textarea
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  placeholder="Biodegradável&#10;Econômico&#10;Rapidez"
                  rows={4}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={newSolution.is_active}
                  onCheckedChange={(checked) =>
                    setNewSolution({ ...newSolution, is_active: checked })
                  }
                />
                <label className="text-sm font-medium">Solução ativa no site</label>
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
                disabled={isLoading || !newSolution.name}
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
                    Criar Solução
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Solutions Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {solutions.map((solution) => (
          <Card
            key={solution.id}
            className={`relative ${!solution.is_active ? "opacity-60" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <div>
                    <CardTitle className="text-lg">{solution.name}</CardTitle>
                    <CardDescription className="text-xs">
                      /{solution.slug}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => toggleActive(solution)}
                >
                  {solution.is_active ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-orange-500" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {solution.short_description || "Sem descrição"}
              </p>
              {solution.benefits && solution.benefits.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {solution.benefits.slice(0, 3).map((benefit, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#D8F3DC] text-[#2D6A4F] px-2 py-0.5 rounded"
                    >
                      {benefit}
                    </span>
                  ))}
                  {solution.benefits.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{solution.benefits.length - 3}
                    </span>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(solution)}
                >
                  <Pencil className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setDeleteId(solution.id)}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {solutions.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Lightbulb className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhuma solução cadastrada</p>
              <Button
                variant="link"
                onClick={openCreateDialog}
                className="mt-2"
              >
                Criar primeira solução
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Solução</DialogTitle>
            <DialogDescription>
              Atualize as informações da solução.
            </DialogDescription>
          </DialogHeader>
          {editingSolution && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome *</label>
                  <Input
                    value={editingSolution.name}
                    onChange={(e) =>
                      setEditingSolution({ ...editingSolution, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={editingSolution.slug}
                    onChange={(e) =>
                      setEditingSolution({ ...editingSolution, slug: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ícone</label>
                  <Input
                    value={editingSolution.icon || ""}
                    onChange={(e) =>
                      setEditingSolution({ ...editingSolution, icon: e.target.value })
                    }
                  />
                </div>
              </div>
              <ImageUpload
                value={editingSolution.image_url}
                onChange={(url) =>
                  setEditingSolution({ ...editingSolution, image_url: url })
                }
                folder="solutions"
                slug={editingSolution.slug || editingSolution.name || "solucao"}
                label="Imagem"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição Curta</label>
                <Input
                  value={editingSolution.short_description || ""}
                  onChange={(e) =>
                    setEditingSolution({
                      ...editingSolution,
                      short_description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição Completa</label>
                <Textarea
                  value={editingSolution.description || ""}
                  onChange={(e) =>
                    setEditingSolution({
                      ...editingSolution,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Conteúdo Adicional (JSON)
                </label>
                <Textarea
                  value={contentText}
                  onChange={(e) => setContentText(e.target.value)}
                  rows={6}
                  className="font-mono text-sm"
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
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingSolution.is_active}
                  onCheckedChange={(checked) =>
                    setEditingSolution({ ...editingSolution, is_active: checked })
                  }
                />
                <label className="text-sm font-medium">Solução ativa no site</label>
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
              disabled={isLoading || !editingSolution?.name}
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
            <AlertDialogTitle>Excluir solução?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A solução será removida
              permanentemente.
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
