import { ReactNode } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/Dialog'
import { useStore } from '@/store'
import { User } from '@/store/slices/UserSlice'
import { formatShortDate } from '@/utils/formatters'
import { getRole } from '@/utils/getRole'

import { Button } from '../Button'

type ViewProfileModalProps = {
  children: ReactNode
  user: User
}

const MODAL_NAME = 'view-profile'

export function ViewProfileModal({ children, user }: ViewProfileModalProps) {
  const myId = useStore((state) => state.auth.loggedInUser?.id)
  const { openedModal, toggle, show } = useStore((state) => state.modal)

  return (
    <Dialog open={openedModal === MODAL_NAME} onOpenChange={() => toggle(MODAL_NAME)}>
      {children}
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle>{myId === user.id ? 'Meu perfil' : 'Visualizar perfil'}</DialogTitle>
        </DialogHeader>
        <div className="[&>p]:mb-4 [&>strong]:text-sm [&>strong]:font-medium [&>strong]:text-muted-foreground">
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

        <Button type="button" onClick={() => show(myId ? 'edit-profile' : 'edit-user')}>
          Editar perfil
        </Button>
      </DialogContent>
    </Dialog>
  )
}
