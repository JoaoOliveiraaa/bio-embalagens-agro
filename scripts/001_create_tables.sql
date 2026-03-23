-- Tabela de usuários admin (referencia auth.users)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  applications TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  badge TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de soluções
CREATE TABLE IF NOT EXISTS public.solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  image_url TEXT,
  icon TEXT,
  content JSONB DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "admin_users_select" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_update" ON public.admin_users;
DROP POLICY IF EXISTS "products_select_public" ON public.products;
DROP POLICY IF EXISTS "products_insert_admin" ON public.products;
DROP POLICY IF EXISTS "products_update_admin" ON public.products;
DROP POLICY IF EXISTS "products_delete_admin" ON public.products;
DROP POLICY IF EXISTS "solutions_select_public" ON public.solutions;
DROP POLICY IF EXISTS "solutions_insert_admin" ON public.solutions;
DROP POLICY IF EXISTS "solutions_update_admin" ON public.solutions;
DROP POLICY IF EXISTS "solutions_delete_admin" ON public.solutions;

-- Políticas para admin_users
CREATE POLICY "admin_users_select" ON public.admin_users 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "admin_users_update" ON public.admin_users 
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para products - Leitura pública
CREATE POLICY "products_select_public" ON public.products 
  FOR SELECT USING (true);

CREATE POLICY "products_insert_admin" ON public.products 
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "products_update_admin" ON public.products 
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "products_delete_admin" ON public.products 
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

-- Políticas para solutions - Leitura pública
CREATE POLICY "solutions_select_public" ON public.solutions 
  FOR SELECT USING (true);

CREATE POLICY "solutions_insert_admin" ON public.solutions 
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "solutions_update_admin" ON public.solutions 
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );

CREATE POLICY "solutions_delete_admin" ON public.solutions 
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
  );
