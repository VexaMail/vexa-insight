import { Button } from '@/components/ui'
import { LogIn } from 'lucide-react'
import type { LoginSubmitButtonProps } from './LoginSubmitButtonProps'

export function LoginSubmitButton({
  isPending,
}: Readonly<LoginSubmitButtonProps>) {
  return (
    <Button type="submit" disabled={isPending} className="h-11 w-full">
      <LogIn />
      {isPending ? 'Signing in…' : 'Sign in'}
    </Button>
  )
}
