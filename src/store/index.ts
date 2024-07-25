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
        name: 'softplan',
        partialize: (state) => {
          const storage = {
            auth: { loggedInUser: state.auth.loggedInUser },
            users: { data: state.users.data },
          } satisfies StorePersist

          return storage
        },
      }
    ),
    { enabled: import.meta.env.DEV }
  )
)
