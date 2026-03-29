"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { LoginCredentials } from "@/features/auth/types/auth.types"
import { useAuthStore } from "@/features/auth/store/auth.store"

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginCredentials) => {
    setErrorMessage(null)

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    })

    const result = await response.json();

    if (!response.ok) {
      setErrorMessage(result?.message ?? 'No fue posible iniciar sesión.')
      return
    }

    setAuth({
      user: {
        email: data.email,
        role: Math.random() < 0.5 ? 'admin' : 'user'
      },
      accessToken: result.token,
      expiresAt: result.expiresAt
    });

    router.replace('/users')
    router.refresh()
  }

  return (
    <main className="grid min-h-screen bg-muted/40">
      <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <Card className="w-full max-w-md border-border/80 shadow-xl shadow-black/5">
          <CardHeader className="space-y-2">
            <div className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
              Iniciar sesión
            </div>
            <CardTitle>Bienvenido de nuevo</CardTitle>
            <CardDescription>
              Ingresa tu correo y contraseña para entrar.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })}
                />
                {
                  errors.email && <small className="text-red-500">Ingresa un email valido.</small>
                }
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register('password', { required: true, minLength: 8 })}
                />
                {
                  errors.password && <small className="text-red-500">La contrasena es requerida y con una longitud de 8 caracteres.</small>
                }
              </div>

              {errorMessage ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              ) : null}

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Validando acceso...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

        </Card>
      </section>
    </main>
  )
}
