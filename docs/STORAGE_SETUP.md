# Configuração do Upload de Imagens (Supabase Storage)

Para que o upload de imagens funcione no admin, é necessário configurar o Supabase Storage.

## Passo 1: Criar o bucket

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard)
2. Selecione seu projeto
3. No menu lateral, clique em **Storage**
4. Clique em **New bucket**
5. Configure:
   - **Name:** `images`
   - **Public bucket:** ✅ Marque esta opção (para as imagens terem URL pública)
   - **File size limit:** 5 MB (opcional)
   - **Allowed MIME types:** `image/jpeg`, `image/png`, `image/webp`, `image/gif` (opcional)

## Passo 2: Políticas de acesso (RLS)

Após criar o bucket, configure as políticas no **Storage** > **Policies** ou execute o script `scripts/003_storage_setup.sql` no SQL Editor.

As políticas garantem que:
- Qualquer pessoa pode **visualizar** as imagens (bucket público)
- Apenas usuários admin autenticados podem **fazer upload**, **atualizar** e **deletar** imagens

## Estrutura de pastas

As imagens são organizadas automaticamente em:
- `images/products/` — Imagens dos produtos
- `images/products/gallery/` — Galeria de imagens dos produtos
- `images/solutions/` — Imagens das soluções

## Fallback: URL manual

Se preferir não usar o Supabase Storage (ex: imagens na pasta `public/`), você pode continuar usando a URL manual no campo ao lado do upload. Exemplo: `/images/products/meu-produto.jpg`
