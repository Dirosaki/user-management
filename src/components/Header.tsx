import {
  Laptop,
  LogOut,
  Moon,
  MoonIcon,
  Palette,
  SunIcon,
  SunMedium,
  User,
  UserPen,
} from 'lucide-react'

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
import { EditUserModal } from '@/components/modals/EditUserModal'
import { ViewProfileModal } from '@/components/modals/ViewProfileModal'
import { useTheme } from '@/hooks/useTheme'
import { useStore } from '@/store'

export function Header() {
  const { theme, setTheme } = useTheme()
  const logout = useStore((state) => state.auth.logout)
  const user = useStore((state) => state.auth.loggedInUser)
  const showModal = useStore((state) => state.modal.show)

  return (
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

      {user && (
        <EditUserModal name="edit-profile" user={user}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Abrir menu"
                className="group relative w-10 min-w-10 overflow-hidden transition-all sm:data-[state=open]:w-20 sm:hover:w-20 sm:focus-visible:w-20"
                type="button"
                variant="outline"
              >
                <User
                  className="absolute transition-all sm:group-hover:-translate-y-full sm:group-hover:opacity-0 sm:group-focus-visible:-translate-y-full sm:group-focus-visible:opacity-0 sm:group-data-[state=open]:-translate-y-full sm:group-data-[state=open]:opacity-0"
                  size={18}
                />
                <div className="absolute pl-0 opacity-0 transition-all duration-200 sm:translate-y-full sm:group-hover:translate-y-0 sm:group-hover:pl-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:pl-0 sm:group-focus-visible:opacity-100 sm:group-data-[state=open]:translate-y-0 sm:group-data-[state=open]:pl-0 sm:group-data-[state=open]:opacity-100">
                  <span className="text-nowrap" aria-hidden>
                    {user.name}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-sm leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <ViewProfileModal user={user}>
                  <DropdownMenuItem
                    onClick={() => showModal('view-profile')}
                    onSelect={(event) => event.preventDefault()}
                  >
                    <User className="mr-2 size-4" />
                    <span>Meu perfil</span>
                  </DropdownMenuItem>
                </ViewProfileModal>
                <DropdownMenuItem
                  onClick={() => showModal('edit-profile')}
                  onSelect={(event) => event.preventDefault()}
                >
                  <UserPen className="mr-2 size-4" />
                  <span>Editar perfil</span>
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
        </EditUserModal>
      )}
    </header>
  )
}
