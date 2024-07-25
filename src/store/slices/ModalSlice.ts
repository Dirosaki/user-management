import { StoreSlice } from '../store'

export type ModalStore = {
  openedModal: string | null
}

type ModalActions = {
  show: (name: string) => void
  hide: () => void
  toggle: (state: string) => void
}

export type ModalSlice = ModalActions & ModalStore

export const createModalSlice: StoreSlice<ModalSlice> = (set) => ({
  openedModal: null,

  show: (name) =>
    set((state) => {
      state.modal.openedModal = name
    }),
  hide: () =>
    set((state) => {
      state.modal.openedModal = null
    }),
  toggle: (name) =>
    set((state) => {
      state.modal.openedModal = state.modal.openedModal ? null : name
    }),
})
