import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import type { CreateUserButtonProps } from './CreateUserButtonProps'

export function CreateUserButton({ onClick }: Readonly<CreateUserButtonProps>) {
  return (
    <div className="flex justify-end">
      <Button onClick={onClick} className="gap-2">
        <Plus className="h-4 w-4" />
        Create User
      </Button>
    </div>
  )
}
