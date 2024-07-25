import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search, UserPlus } from 'lucide-react'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { CreateUserModal } from '@/components/modals/CreateUserModal'
import { useStore } from '@/store'
import { getUserPermission } from '@/utils/getUserPermission'

import { columns, DataTable } from './components/DataTable'

export function UserManagement() {
  const [search, setSearch] = useState('')
  const users = useStore((state) => state.users.data)
  const myId = useStore((state) => state.auth.loggedInUser?.id)
  const showNewUserModal = useStore((state) => state.modal.show)

  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = searchParams.get('page') ?? 1
  const [pagination, setPagination] = useState({
    pageSize: 15,
    pageIndex: Number(initialPage) - 1,
  })

  const sortedUsers = useMemo(
    () => users.filter((user) => user.id !== myId).sort((a, b) => a.name.localeCompare(b.name)),
    [myId, users]
  )

  const table = useReactTable({
    data: sortedUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  useEffect(() => {
    setSearchParams({ page: String(pagination.pageIndex + 1) })
  }, [pagination.pageIndex, setSearchParams])

  const { can, cannot } = getUserPermission('user-management')

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)

    table.setGlobalFilter(event.target.value)
  }

  if (cannot('read')) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-300">
        <h1 className="max-w-lg text-center text-lg">
          Você não possuí as permissões necessárias para acessar essa página, contate um
          administrador.
        </h1>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col bg-card">
      <Header />

      <main className="mt-2 flex flex-1 flex-col px-5">
        <div className="flex justify-between gap-2">
          <div className="relative flex w-full max-w-56 items-center">
            <Search className="absolute left-3 text-muted-foreground" size={18} />
            <input
              className="peer flex h-10 w-full rounded-md border border-input bg-background px-3 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Pesquisar usuários..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          {can('create') && (
            <CreateUserModal>
              <Button
                className="group relative min-w-10 p-0 sm:px-4 sm:py-2"
                type="button"
                onClick={() => showNewUserModal('create-user')}
              >
                <span className="hidden sm:inline">Novo usuário</span>
                <div className="pl-0 transition-all duration-200 sm:w-0 sm:translate-x-full sm:opacity-0 sm:group-hover:mx-1 sm:group-hover:w-5 sm:group-hover:translate-x-0 sm:group-hover:pl-2 sm:group-hover:opacity-100">
                  <UserPlus size={18} absoluteStrokeWidth />
                </div>
              </Button>
            </CreateUserModal>
          )}
        </div>
        <DataTable table={table} />
      </main>
    </div>
  )
}
