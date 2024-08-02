import { ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { useStore } from '@/store'
import { User } from '@/store/slices/UserSlice'
import { formatShortDate } from '@/utils/formatters'
import { getRole } from '@/utils/getRole'
import { getUserPermission } from '@/utils/getUserPermission'

import { Button } from '../Button'

type ViewProfileModalProps = {
  children: ReactNode
  user: User
}

const MODAL_NAME = 'view-profile'

export function ViewProfileModal({ children, user }: ViewProfileModalProps) {
  const myId = useStore((state) => state.auth.loggedInUser?.id)
  const { openedModal, toggle, show } = useStore((state) => state.modal)

  const { can } = getUserPermission('user-management')

  const description =
    myId === user.id
      ? 'Visualize as informações do seu perfil aqui.'
      : 'Visualize as informações de perfil do usuário aqui.'

  return (
    <Dialog open={openedModal === MODAL_NAME} onOpenChange={() => toggle(MODAL_NAME)}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{myId === user.id ? 'Meu perfil' : 'Visualizar perfil'}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="[&>p:last-of-type]:mb-0 [&>p]:mb-4 [&>strong]:text-sm [&>strong]:font-medium [&>strong]:text-muted-foreground">
          <strong>Nome:</strong>
          <p>{user.name}</p>
          <strong>E-mail:</strong>
          <p>{user.email}</p>
          <strong>Função:</strong>
          <p>{getRole[user.role]}</p>
          <strong>Data de criação:</strong>
          <p>{formatShortDate(user.createdAt)}</p>
          <strong>Data do último login:</strong>
          <p>{user.lastLogin ? formatShortDate(user.lastLogin) : '-'}</p>
        </div>

        {(can('update') || myId === user.id) && (
          <Button type="button" onClick={() => show(myId ? 'edit-profile' : 'edit-user')}>
            Editar
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
