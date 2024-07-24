import { ColumnDef } from '@tanstack/react-table'
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'

export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
  lastLogin: string
  password: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    enableSorting: true,
    cell: ({ row }) => <span className="text-nowrap">{row.original.name}</span>,
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
    enableSorting: true,
  },
  {
    accessorKey: 'role',
    header: 'Função',
    size: 200,
    cell: ({ row }) => {
      const { role } = row.original

      const getRole = {
        admin: 'Admin',
        user: 'Usuário',
      }

      return <Badge variant="secondary">{getRole[role]}</Badge>
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    size: 100,
    cell: () => (
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
          <DropdownMenuItem disabled>
            <Eye className="mr-2 size-4" />
            Visualizar perfil
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil className="mr-2 size-4" />
            Editar usuário
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:bg-destructive/5 focus:text-destructive">
            <Trash2 className="mr-2 size-4" />
            Excluir usuário
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
