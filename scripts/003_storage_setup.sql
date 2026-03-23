-- Políticas do Supabase Storage para upload de imagens
-- PRÉ-REQUISITO: Crie o bucket "images" no Storage do Supabase (Dashboard > Storage > New bucket)
-- O bucket deve ser PÚBLICO para as URLs funcionarem.
--
-- Execute este script no SQL Editor do Supabase Dashboard

-- Política: Leitura pública (qualquer um pode ver as imagens)
DROP POLICY IF EXISTS "Imagens públicas - leitura" ON storage.objects;
CREATE POLICY "Imagens públicas - leitura"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Política: Apenas admins podem fazer upload
DROP POLICY IF EXISTS "Admin pode fazer upload" ON storage.objects;
CREATE POLICY "Admin pode fazer upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images'
  AND EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Política: Apenas admins podem atualizar
DROP POLICY IF EXISTS "Admin pode atualizar imagens" ON storage.objects;
CREATE POLICY "Admin pode atualizar imagens"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images'
  AND EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Política: Apenas admins podem deletar
DROP POLICY IF EXISTS "Admin pode deletar imagens" ON storage.objects;
CREATE POLICY "Admin pode deletar imagens"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'images'
  AND EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
