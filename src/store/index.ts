import { produce } from 'immer'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { createAuthSlice } from './slices/AuthSlice'
import { createModalSlice } from './slices/ModalSlice'
import { createUserSlice } from './slices/UserSlice'
import { Store, StorePersist } from './store'

export const useStore = create<Store>()(
  devtools(
    persist(
      immer((...params) => ({
        auth: createAuthSlice(...params),
        users: createUserSlice(...params),
        modal: createModalSlice(...params),
      })),
      {
        name: 'user-management',
        partialize: (state) => {
          const storage = {
            auth: { loggedInUser: state.auth.loggedInUser },
            users: { data: state.users.data },
          } satisfies StorePersist

          return storage
        },
        merge: (persistedState, currentState) =>
          produce(currentState, (draft) => {
            Object.entries(draft).forEach(([key, initialSliceValue]) => {
              const typeSafeKey = key as keyof typeof persistedState
              const persistedSliceValue = (persistedState as Store)[typeSafeKey]

              Object.assign(initialSliceValue, persistedSliceValue)
            })
          }),
      }
    ),
    { enabled: import.meta.env.DEV }
  )
)
