import {
  LOGIN_INPUT_CLASS_NAME,
  LOGIN_LABEL_CLASS_NAME,
} from '@/constants/login'
import { UserIcon } from 'lucide-react'

export function LoginUsernameField() {
  return (
    <div>
      <label htmlFor="username" className={`mb-1 ${LOGIN_LABEL_CLASS_NAME}`}>
        Username
      </label>
      <div className="relative">
        <UserIcon
          aria-hidden
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        />
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className={`${LOGIN_INPUT_CLASS_NAME} pl-9`}
        />
      </div>
    </div>
  )
}
