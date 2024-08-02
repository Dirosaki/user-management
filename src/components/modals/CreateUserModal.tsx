import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { ErrorMessage } from '@/components/form/ErrorMessage'
import { Input } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import { Switch } from '@/components/Switch'
import { useStore } from '@/store'

const schema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().min(1, 'O e-mail é obrigatório.').email('E-mail inválido.'),
  password: z.string().min(1, 'A senha deve ter ao menos 6 caracteres.'),
  role: z.boolean().default(false),
})

type FormData = z.infer<typeof schema>

type CreateUserModalProps = {
  children: ReactNode
}

const MODAL_NAME = 'create-user'

export function CreateUserModal({ children }: CreateUserModalProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const createUser = useStore((state) => state.users.create)
  const { hide, openedModal, toggle } = useStore((state) => state.modal)

  const { formState } = form

  const watchRole = form.watch('role')

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      const formattedFormData = {
        ...formData,
        role: formData.role ? 'admin' : 'user',
      } as const

      await createUser(formattedFormData)
      toast.success('Usuário criado com sucesso!')
      hide()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Algo inesperado aconteceu, tente novamente!')
      }
    }
  })

  return (
    <Dialog open={openedModal === MODAL_NAME} onOpenChange={() => toggle(MODAL_NAME)}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo usuário</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para criar um novo usuário. Você pode definir o nome,
            e-mail, função e senha.
          </DialogDescription>
        </DialogHeader>
        <form noValidate onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                autoComplete="name"
                id="name"
                placeholder="Digite seu nome completo"
                type="text"
                {...form.register('name')}
              />
              <ErrorMessage>{formState.errors.name?.message}</ErrorMessage>
            </div>
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
              <Label htmlFor="role">Função</Label>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  {watchRole ? (
                    <p className="text-sm text-muted-foreground">
                      <b className="block font-normal text-foreground">Administrador:</b>
                      Permite acesso a todas as funcionalidades do sistema.
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      <b className="block font-normal text-foreground">Usuário comum:</b>
                      Permite acesso às funcionalidades básicas do sistema.
                    </p>
                  )}
                </div>
                <Controller
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <Switch checked={field.value} id="role" onCheckedChange={field.onChange} />
                  )}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                autoComplete="current-password"
                id="password"
                placeholder="Digite sua senha"
                type="password"
                {...form.register('password')}
              />
              <ErrorMessage>{formState.errors.password?.message}</ErrorMessage>
            </div>
            <Button className="ml-auto w-32" disabled={formState.isSubmitting} type="submit">
              {formState.isSubmitting ? (
                <LoaderCircle
                  className="animate-spin duration-700"
                  data-testid="loader"
                  size={20}
                />
              ) : (
                'Criar usuário'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
