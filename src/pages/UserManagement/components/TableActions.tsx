import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import { DeleteUserModal } from '@/components/modals/DeleteUserModal'
import { EditUserModal } from '@/components/modals/EditUserModal'
import { ViewProfileModal } from '@/components/modals/ViewProfileModal'
import { useStore } from '@/store'
import { User } from '@/store/slices/UserSlice'
import { getUserPermission } from '@/utils/getUserPermission'

type TableActionsProps = {
  user: User
}

export function TableActions({ user }: TableActionsProps) {
  const show = useStore((state) => state.modal.show)

  const { can } = getUserPermission('user-management')

  return (
    <DropdownMenu>
      <div className="flex">
        <DropdownMenuTrigger asChild>
          <Button className="mx-auto size-8 p-0" variant="ghost">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ViewProfileModal user={user}>
          <DropdownMenuItem
            onClick={() => show('view-profile')}
            onSelect={(event) => event.preventDefault()}
          >
            <Eye className="mr-2 size-4" />
            Visualizar perfil
          </DropdownMenuItem>
        </ViewProfileModal>

        {can('update') && (
          <EditUserModal name="edit-user" user={user}>
            <DropdownMenuItem
              onClick={() => show('edit-user')}
              onSelect={(event) => event.preventDefault()}
            >
              <Pencil className="mr-2 size-4" />
              Editar usuário
            </DropdownMenuItem>
          </EditUserModal>
        )}

        {can('delete') && (
          <DeleteUserModal user={user}>
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/5 focus:text-destructive"
              onClick={() => show('delete-user')}
              onSelect={(event) => event.preventDefault()}
            >
              <Trash2 className="mr-2 size-4" />
              Excluir usuário
            </DropdownMenuItem>
          </DeleteUserModal>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
