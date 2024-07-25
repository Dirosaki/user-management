import { users } from '@/data/users'
import { Roles } from '@/types/permissions'
import { withDelay } from '@/utils/withDelay'

import { StoreSlice } from '../store'

export type User = {
  id: string
  name: string
  email: string
  role: Roles
  createdAt: string
  lastLogin: string | null
  password: string
}

export type UserStore = {
  data: User[]
}

type CreateFn = Omit<User, 'createdAt' | 'id' | 'lastLogin'>

type UpdateFn = CreateFn & Pick<User, 'id'>

type UserActions = {
  create: (params: CreateFn) => Promise<void>
  update: (params: UpdateFn) => Promise<void>
  delete: (id: string) => Promise<void>
}

export type UserSlice = UserActions & UserStore

export const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  data: users,

  create: (payload) =>
    withDelay((resolve, reject) => {
      try {
        set((state) => {
          const findUser = state.users.data.find((user) => user.email === payload.email)

          if (findUser) throw new Error('Usuário já cadastrado!')

          const newUser: User = {
            id: new Date().getTime().toString(),
            createdAt: new Date().toISOString(),
            lastLogin: null,
            ...payload,
          }

          state.users.data.push(newUser)

          resolve()
        })
      } catch (error) {
        reject(error)
      }
    }),

  update: (payload) =>
    withDelay((resolve, reject) => {
      try {
        set((state) => {
          const userExists = state.users.data.find((user) => user.id === payload.id)

          if (!userExists) {
            throw new Error('Usuário não encontrado!')
          }

          Object.assign(userExists, payload)
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    }),
  delete: (id) =>
    withDelay((resolve, reject) => {
      try {
        set((state) => {
          const userExists = state.users.data.findIndex((user) => user.id === id)

          if (!userExists) throw new Error('Usuário não encontrado!')

          state.users.data.splice(userExists, 1)
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    }, 150),
})
