import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import type { CreateUserButtonProps } from './CreateUserButtonProps'

export function CreateUserButton({ onClick }: Readonly<CreateUserButtonProps>) {
  return (
    <Button type="button" onClick={onClick} className="h-10">
      <Plus />
      Create user
    </Button>
  )
}
