import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Buscar dados do admin
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!adminUser) {
    redirect("/admin/login")
  }

  // Buscar produtos e soluções
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })

  const { data: solutions } = await supabase
    .from("solutions")
    .select("*")
    .order("sort_order", { ascending: true })

  return (
    <AdminDashboard
      adminUser={adminUser}
      initialProducts={products || []}
      initialSolutions={solutions || []}
    />
  )
}
