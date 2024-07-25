import { Roles } from '@/types/permissions'

import { StoreSlice } from '../store'

export type User = {
  id: string
  name: string
  email: string
  role: Roles
  createdAt: string
  lastLogin: string
  password: string
}

export type AuthStore = {
  users: User[]
  loggedInUser: User | null
}

type LoginFn = { email: string; password: string }
type RegisterFn = { name: string; email: string; password: string }

type AuthActions = {
  login: (params: LoginFn) => Promise<void>
  register: (params: RegisterFn) => Promise<void>
  logout: () => void
}

export type AuthSlice = AuthActions & AuthStore

export const createAuthSlice: StoreSlice<AuthSlice> = (set) => ({
  users: [
    {
      name: 'Diego Gomes',
      email: 'diegosgomes27@gmail.com',
      password: '12345678',
      role: 'user',
      id: 'sahusa',
      createdAt: '2024-07-24T18:23:00.794Z',
      lastLogin: '',
    },
  ],
  loggedInUser: null,

  login: ({ email, password }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          set((state) => {
            const findUser = state.auth.users.find(
              (user) => user.email === email && user.password === password
            )

            if (!findUser) {
              reject(new Error('Credencias inválidas ou usuário não cadastrado!'))
            } else {
              state.auth.loggedInUser = findUser
            }
          })
        )
      }, 500)
    }),

  register: (payload) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          set((state) => {
            const userExists = state.auth.users.find((user) => user.email === payload.email)

            if (userExists) {
              throw new Error('Usuário já cadastrado!')
            }

            const newUser: User = {
              ...payload,
              role: 'user',
              id: 'sahusa',
              createdAt: new Date().toISOString(),
              lastLogin: '',
            }

            state.auth.users.push(newUser)
            state.auth.loggedInUser = newUser
          })
          resolve()
        } catch (error) {
          reject(error)
        }
      }, 500)
    }),

  logout: () =>
    set((state) => {
      state.auth.loggedInUser = null
    }),
})
