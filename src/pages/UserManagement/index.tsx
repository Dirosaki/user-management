import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ChevronDown,
  KeyRound,
  Laptop,
  LogOut,
  Moon,
  MoonIcon,
  Palette,
  Search,
  SunIcon,
  SunMedium,
  UserPen,
  UserPlus,
} from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import { users } from '@/data/users'
import { useTheme } from '@/hooks/useTheme'
import { useStore } from '@/store'

import { columns, DataTable } from './components/DataTable'

export function UserManagement() {
  const [search, setSearch] = useState('')
  const { theme, setTheme } = useTheme()
  const logout = useStore((state) => state.auth.logout)

  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = searchParams.get('page') ?? 1
  const [pagination, setPagination] = useState({
    pageSize: 15,
    pageIndex: Number(initialPage) - 1,
  })

  const table = useReactTable({
    data: users,
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

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    table.getColumn('name')?.setFilterValue(event.target.value)
  }

  return (
    <div className="flex flex-1 flex-col bg-card">
      <header className="flex items-center justify-between gap-2 px-5 py-4">
        <h1 className="text-xl font-medium">Usuários</h1>

        <Button
          aria-label="Alternar tema"
          className="ml-auto"
          size="icon"
          variant="outline"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <SunIcon
            aria-hidden="true"
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            size={18}
          />
          <MoonIcon
            aria-hidden="true"
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            size={18}
          />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="group relative gap-1 px-3" variant="outline">
              Diego Gomes
              <ChevronDown
                className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
                size={18}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs leading-none text-muted-foreground">Conectado com</p>
                <p className="text-sm font-medium leading-none">diego@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserPen className="mr-2 size-4" />
                <span>Editar perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <KeyRound className="mr-2 size-4" />
                <span>Editar senha</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette className="mr-2 size-4" />
                <span>Tema</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    <SunMedium className="mr-2 size-4" />
                    <span>Claro</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 size-4" />
                    <span>Escuro</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Laptop className="mr-2 size-4" />
                    <span>Sistema</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 size-4" />
              <span>Sair da conta</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

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

          <Button className="group relative min-w-10 p-0 sm:px-4 sm:py-2" type="button">
            <span className="hidden sm:inline">Novo usuário</span>
            <div className="pl-0 transition-all duration-200 sm:w-0 sm:translate-x-full sm:opacity-0 sm:group-hover:mx-1 sm:group-hover:w-5 sm:group-hover:translate-x-0 sm:group-hover:pl-2 sm:group-hover:opacity-100">
              <UserPlus size={18} absoluteStrokeWidth />
            </div>
          </Button>
        </div>
        <DataTable table={table} />
      </main>
    </div>
  )
}
