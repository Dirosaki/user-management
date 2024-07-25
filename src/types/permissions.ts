export type Roles = 'admin' | 'user'

export type Pages = 'user-management'

export type Actions = '*' | 'create' | 'delete' | 'read' | 'update'

type PagePermissions = {
  [key in Pages]: Actions[]
}

export type Permissions = Record<Roles, PagePermissions>
