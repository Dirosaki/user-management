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

const schema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório.').email('E-mail inválido.'),
})

type FormData = z.infer<typeof schema>

export function ForgotPassword() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { formState } = form

  const handleSubmit = form.handleSubmit(async () => {
    toast.error('Estamos sem back-end no momento, tente criar uma nova conta.')
  })

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Esqueci minha senha</CardTitle>
          <CardDescription>
            Digite seu e-mail para enviarmos as instruções para criação de uma nova senha.
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

              <Button className="w-full" disabled={formState.isSubmitting} type="submit">
                {formState.isSubmitting ? (
                  <LoaderCircle
                    className="animate-spin duration-700"
                    data-testid="loader"
                    size={20}
                  />
                ) : (
                  'Enviar'
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link className="underline transition-colors hover:text-primary" to="/login">
                Voltar para o login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
