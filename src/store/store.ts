import { StateCreator } from 'zustand'

import { AuthSlice, AuthStore } from './slices/AuthSlice'
import { ModalSlice } from './slices/ModalSlice'
import { UserSlice, UserStore } from './slices/UserSlice'

export type Store = {
  auth: AuthSlice
  users: UserSlice
  modal: ModalSlice
}

export type StorePersist = {
  auth: AuthStore
  users: UserStore
}

export type StoreSlice<TSlice> = StateCreator<
  Store,
  [['zustand/devtools', never], ['zustand/immer', never], ['zustand/persist', unknown]],
  [],
  TSlice
>
