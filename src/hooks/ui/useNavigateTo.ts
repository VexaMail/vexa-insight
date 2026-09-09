import type { NavigatorProps } from '@/types/ui'
import { useRouter } from 'next/navigation'

/** Opens an item through the caller's handler, else by pushing its route. */
export function useNavigateTo(props: NavigatorProps): (id: string) => void {
  const router = useRouter()

  return (id: string) => {
    if (props.onNavigate) props.onNavigate(id)
    else if (props.basePath) router.push(`${props.basePath}/${id}`)
  }
}
