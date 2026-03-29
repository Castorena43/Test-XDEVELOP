"use client"

import Link from "next/link";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from "@/features/auth/store/auth.store";

const links = [
  { href: '/users', name: 'Usuarios' },
  { href: '/posts', name: 'Publicaciones' },
  { href: '/books', name: 'Libros' },
]

export const Navbar = () => {

  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    document.cookie = "accessToken=; Max-Age=0; path=/";
    router.replace('/login')
  }

  return (
    <aside className="w-64 border-r bg-background p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-3">Dashboard</h2>
      <p className="mb-2">Email: {user?.email}</p>
      <p className="mb-2">Role: {user?.role}</p>
      <Separator className="mb-4" />
      
      <nav className="flex flex-col gap-2">
        {
          links.map(link => (
            <Link href={link.href} key={link.href}>
              <Button
                variant={pathname === link.href ? "default" : "ghost"}
                className="w-full justify-start ghost"
              >
                {link.name}
              </Button>
            </Link>
          ))
        }
        <Button
          variant="outline"
          className="w-full justify-start ghost"
          onClick={handleLogout}
        >
          Cerrar sesion
        </Button>
      </nav>
    </aside>

  )
}
