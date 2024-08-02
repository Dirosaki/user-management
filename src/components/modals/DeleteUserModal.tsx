import { LoaderCircle } from 'lucide-react'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { useStore } from '@/store'
import { User } from '@/store/slices/UserSlice'

type DeleteUserModalProps = {
  children: ReactNode
  user: User
}

const MODAL_NAME = 'delete-user'

export function DeleteUserModal({ children, user }: DeleteUserModalProps) {
  const form = useForm()
  const deleteUser = useStore((state) => state.users.delete)
  const { hide, openedModal, toggle } = useStore((state) => state.modal)

  const { formState } = form

  const handleSubmit = form.handleSubmit(async () => {
    try {
      await deleteUser(user.id)
      toast.success('Usuário excluído com sucesso!')
      hide()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Erro ao excluir usuário, tente novamente!')
      }
    }
  })

  return (
    <Dialog open={openedModal === MODAL_NAME} onOpenChange={() => toggle(MODAL_NAME)}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir usuário</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir o usuário:
            <b className="block font-medium">{user.email}</b>
          </DialogDescription>
        </DialogHeader>
        <form noValidate onSubmit={handleSubmit}>
          <div className="flex justify-end gap-2">
            <Button
              className="w-28"
              disabled={formState.isSubmitting}
              type="button"
              variant="outline"
              onClick={hide}
            >
              Cancelar
            </Button>
            <Button
              className="w-28"
              disabled={formState.isSubmitting}
              type="submit"
              variant="destructive"
            >
              {formState.isSubmitting ? (
                <LoaderCircle
                  className="animate-spin duration-700"
                  data-testid="loader"
                  size={20}
                />
              ) : (
                'Sim, excluir!'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
