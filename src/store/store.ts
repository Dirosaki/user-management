import { StateCreator } from 'zustand'

import { AuthSlice, AuthStore } from './slices/AuthSlice'

export type Store = {
  auth: AuthSlice
}

export type StorePersist = {
  auth: AuthStore
}

export type StoreSlice<TSlice> = StateCreator<
  Store,
  [['zustand/devtools', never], ['zustand/immer', never], ['zustand/persist', unknown]],
  [],
  TSlice
>
