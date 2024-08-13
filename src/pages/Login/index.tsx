import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { ErrorMessage } from '@/components/form/ErrorMessage'
import { Input } from '@/components/form/Input'
import { useStore } from '@/store'

const schema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório.').email('E-mail inválido.'),
  password: z.string().min(1, 'A senha deve ter ao menos 6 caracteres.'),
})

type FormData = z.infer<typeof schema>

export function Login() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const login = useStore((state) => state.auth.login)

  const { formState } = form

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      await login(formData)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Algo inesperado aconteceu, tente novamente!')
      }
    }
  })

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>
          Digite suas credenciais abaixo para fazer login em sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                autoComplete="email"
                id="email"
                inputMode="email"
                placeholder="example@example.com"
                type="email"
                {...form.register('email')}
              />
              <ErrorMessage>{formState.errors.email?.message}</ErrorMessage>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  className="ml-auto inline-block text-sm underline transition-colors hover:text-primary"
                  to="/forgot-password"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input
                autoComplete="current-password"
                id="password"
                placeholder="Digite sua senha"
                type="password"
                {...form.register('password')}
              />
              <ErrorMessage>{formState.errors.password?.message}</ErrorMessage>
            </div>
            <Button className="w-full" disabled={formState.isSubmitting} type="submit">
              {formState.isSubmitting ? (
                <LoaderCircle
                  className="animate-spin duration-700"
                  data-testid="loader"
                  size={20}
                />
              ) : (
                'Entrar'
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Não possuí uma conta?&nbsp;
            <Link className="underline transition-colors hover:text-primary" to="/register">
              Cadastre-se
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
