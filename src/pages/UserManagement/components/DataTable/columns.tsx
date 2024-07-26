import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/Badge'
import { User } from '@/store/slices/UserSlice'
import { getRole } from '@/utils/getRole'

import { TableActions } from '../TableActions'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <span className="text-nowrap">{row.original.name}</span>,
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    accessorKey: 'role',
    header: 'Função',
    size: 200,
    cell: ({ row }) => <Badge variant="secondary">{getRole[row.original.role]}</Badge>,
  },
  {
    accessorKey: 'actions',
    header: '',
    size: 100,
    cell: ({ row }) => <TableActions user={row.original} />,
  },
]
