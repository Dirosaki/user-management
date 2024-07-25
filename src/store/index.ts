import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { createAuthSlice } from './slices/AuthSlice'
import { Store, StorePersist } from './store'

export const useStore = create<Store>()(
  devtools(
    persist(
      immer((...params) => ({
        auth: createAuthSlice(...params),
      })),
      {
        name: 'softplan',
        partialize: (state) => {
          const storage = {
            auth: { users: state.auth.users, loggedInUser: state.auth.loggedInUser },
          } satisfies StorePersist

          return storage
        },
      }
    ),
    { enabled: import.meta.env.DEV }
  )
)
