import type { ChangeDirection } from './ChangeDirection'

/** One line of "What changed since the previous period". */
export type ChangeItem = {
  id: string
  /** The headline figure, e.g. "+120%", "+3", "-0.7 pts". */
  value: string
  title: string
  detail: string
  direction: ChangeDirection
  href: string | null
}
