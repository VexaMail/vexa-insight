import type { ListState } from '@/types/stores'
import { create } from 'zustand'

export const useListState = create<ListState>((set, get) => ({
  itemsScope: [],
  currentId: null,
  scopeMode: 'filtered',

  setScope: (itemsScope) => {
    set({ itemsScope })
  },
  setCurrentId: (currentId) => {
    set({ currentId })
  },
  setScopeMode: (scopeMode) => {
    set({ scopeMode })
  },

  navigateContext: (direction) => {
    const { itemsScope, currentId } = get()
    if (!currentId || itemsScope.length === 0) {
      return null
    }

    const currentIndex = itemsScope.indexOf(currentId)
    if (currentIndex === -1) return null

    if (direction === 'next' && currentIndex < itemsScope.length - 1) {
      return itemsScope[currentIndex + 1] ?? null
    }

    if (direction === 'prev' && currentIndex > 0) {
      return itemsScope[currentIndex - 1] ?? null
    }

    return null
  },
}))
