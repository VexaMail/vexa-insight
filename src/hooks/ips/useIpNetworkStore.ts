'use client'

import type { IpNetworkStoreState } from '@/types/ips'
import { create } from 'zustand'

/**
 * Network lookups of this session, by address, so the header chips, the
 * identity panel, the reputation panel and the DNS tab share one answer.
 */
export const useIpNetworkStore = create<IpNetworkStoreState>((set) => ({
  byIp: {},
  setEntry: (ip, entry) => {
    set((state) => ({ byIp: { ...state.byIp, [ip]: entry } }))
  },
}))
