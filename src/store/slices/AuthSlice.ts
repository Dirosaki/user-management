import { withDelay } from '@/utils/withDelay'

import { StoreSlice } from '../store'

import { User } from './UserSlice'

export type AuthStore = {
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
  loggedInUser: null,

  login: ({ email, password }) =>
    withDelay((resolve, reject) => {
      try {
        set((state) => {
          const findUser = state.users.data.find(
            (user) => user.email === email && user.password === password
          )

          if (!findUser) {
            throw new Error('Credencias inválidas ou usuário não cadastrado!')
          }

          const updatedUser: User = {
            ...findUser,
            lastLogin: new Date().toISOString(),
          }

          state.auth.loggedInUser = updatedUser
          Object.assign(findUser, updatedUser)
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    }, 1000),
  register: (payload) =>
    withDelay((resolve, reject) => {
      try {
        set((state) => {
          const userExists = state.users.data.find((user) => user.email === payload.email)

          if (userExists) throw new Error('Usuário já cadastrado!')

          const newUser: User = {
            id: new Date().getTime().toString(),
            role: 'user',
            createdAt: new Date().toISOString(),
            lastLogin: null,
            ...payload,
          }

          state.users.data.push(newUser)
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    }),
  logout: () =>
    set((state) => {
      state.auth.loggedInUser = null
    }),
})
