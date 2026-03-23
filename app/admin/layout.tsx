import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | Bio Embalagens Agro",
  description: "Painel administrativo da Bio Embalagens Agro",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
