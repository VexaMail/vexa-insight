/** A list loaded from an admin API route, with a way to load it again. */
export type AdminCollectionState<T> = {
  readonly items: readonly T[]
  readonly loading: boolean
  readonly error: string | null
  readonly reload: () => Promise<void>
}
