import type { IngestState } from '@/types/IngestState'
import type { IngestStore } from '@/types/IngestStore'
import {
  computeNextStoreState,
  pollProgressPageSizeStorage,
} from '@/utils/ingest'
import { createStore } from 'zustand'

export const createIngestStore = (initState: Partial<IngestState> = {}) => {
  return createStore<IngestStore>()((set) => ({
    selectedJobId: null,
    activeTab: 'pollResults',

    isRunning: false,
    lastCheck: null,
    currentProcessed: 0,
    totalEmails: 0,
    processingEmails: 0,
    etaMs: 0,
    abortStatus: 'idle',
    runRequested: false,
    activeJobRunId: null,
    statusText: null,

    page: 1,
    pageSize: pollProgressPageSizeStorage.defaultSize,
    progressItems: [],
    progressTotal: 0,
    jobStartTime: null,

    ...initState,

    setSelectedJob: (id) =>
      set({ selectedJobId: id, activeTab: 'pollResults' }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    setIsJobRunning: (isRunning) => set({ isRunning }),

    applyPollStatus: (data) =>
      set((state) => computeNextStoreState(state, data)),

    setAbortStatus: (status) => set({ abortStatus: status }),
    setRunRequested: (requested) => set({ runRequested: requested }),
    setPage: (page) => set({ page }),
    setPageSize: (size) => {
      set({ pageSize: size, page: 1 })
      pollProgressPageSizeStorage.set(size)
    },
  }))
}
