"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const BUCKET = "images"
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_SIZE_MB = 5

interface ImageUploadProps {
  value: string | null
  onChange: (url: string) => void
  folder: "products" | "solutions"
  slug?: string
  label?: string
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  folder,
  slug = "image",
  label = "Imagem",
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Envie apenas imagens (JPG, PNG, WebP ou GIF).",
        variant: "destructive",
      })
      return
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: `O tamanho máximo é ${MAX_SIZE_MB}MB.`,
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      const ext = file.name.split(".").pop() || "jpg"
      const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase()
      const fileName = `${safeSlug}-${Date.now()}.${ext}`
      const filePath = `${folder}/${fileName}`

      const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      })

      if (error) {
        if (error.message.includes("Bucket not found") || error.message.includes("does not exist")) {
          toast({
            title: "Bucket não configurado",
            description: "Configure o bucket 'images' no Supabase Storage. Veja o arquivo scripts/003_storage_setup.sql",
            variant: "destructive",
          })
        } else {
          throw error
        }
        return
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET).getPublicUrl(filePath)

      onChange(publicUrl)
      toast({
        title: "Imagem enviada!",
        description: "A imagem foi carregada com sucesso.",
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Erro ao enviar imagem",
        description: "Tente novamente ou use a URL manualmente.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ""
  }

  const removeImage = () => onChange("")

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`
            relative flex-1 w-full min-h-[120px] border-2 border-dashed rounded-lg flex items-center justify-center
            transition-colors cursor-pointer
            ${dragActive ? "border-[#2D6A4F] bg-[#D8F3DC]/50" : "border-muted-foreground/25 hover:border-muted-foreground/50"}
            ${isUploading ? "pointer-events-none opacity-70" : ""}
          `}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            onChange={handleChange}
            className="hidden"
            disabled={isUploading}
          />
          {value ? (
            <div className="relative w-full h-40 rounded overflow-hidden group">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized={value.includes("supabase")}
                sizes="(max-width: 400px) 100vw, 300px"
              />
              {!isUploading && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage()
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-colors"
                  aria-label="Remover imagem"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-6 text-muted-foreground">
              {isUploading ? (
                <Loader2 className="w-10 h-10 animate-spin" />
              ) : (
                <Upload className="w-10 h-10" />
              )}
              <span className="text-sm text-center px-4">
                {isUploading
                  ? "Enviando..."
                  : "Arraste uma imagem ou clique para selecionar"}
              </span>
              <span className="text-xs">JPG, PNG, WebP ou GIF (até {MAX_SIZE_MB}MB)</span>
            </div>
          )}
        </div>
        <div className="w-full sm:w-48 shrink-0">
          <p className="text-xs text-muted-foreground mb-1">Ou use URL manual:</p>
          <Input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/products/ou-url-externa"
            className="text-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  )
}

interface GalleryUploadProps {
  values: string[]
  onChange: (urls: string[]) => void
  folder: "products" | "solutions"
  slug?: string
  label?: string
}

export function GalleryUpload({
  values,
  onChange,
  folder,
  slug = "gallery",
  label = "Galeria de imagens",
}: GalleryUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Envie apenas imagens (JPG, PNG, WebP ou GIF).",
        variant: "destructive",
      })
      return
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: `O tamanho máximo é ${MAX_SIZE_MB}MB.`,
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      const ext = file.name.split(".").pop() || "jpg"
      const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase()
      const fileName = `${safeSlug}-${Date.now()}.${ext}`
      const filePath = `${folder}/gallery/${fileName}`

      const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      })

      if (error) {
        if (error.message.includes("Bucket not found") || error.message.includes("does not exist")) {
          toast({
            title: "Bucket não configurado",
            description: "Configure o bucket 'images' no Supabase Storage.",
            variant: "destructive",
          })
        } else {
          throw error
        }
        return
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET).getPublicUrl(filePath)

      onChange([...values, publicUrl])
      toast({
        title: "Imagem adicionada!",
        description: "A imagem foi adicionada à galeria.",
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Erro ao enviar imagem",
        description: "Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-3">
        {values.map((url, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-lg overflow-hidden border border-muted group"
          >
            <Image
              src={url}
              alt={`Galeria ${index + 1}`}
              fill
              className="object-cover"
              unoptimized={url.includes("supabase")}
              sizes="96px"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 p-1 bg-red-500/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remover"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="w-24 h-24 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
              e.target.value = ""
            }}
            className="hidden"
          />
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <ImageIcon className="w-6 h-6" />
          )}
          <span className="text-xs">Adicionar</span>
        </button>
      </div>
    </div>
  )
}
