import {
  LOGIN_INPUT_CLASS_NAME,
  LOGIN_LABEL_CLASS_NAME,
} from '@/constants/login'
import { KeyRound } from 'lucide-react'
import { ForgotPasswordButton } from './ForgotPasswordButton'

export function LoginPasswordField() {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor="password" className={LOGIN_LABEL_CLASS_NAME}>
          Password
        </label>
        <ForgotPasswordButton />
      </div>
      <div className="relative">
        <KeyRound
          aria-hidden
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        />
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={`${LOGIN_INPUT_CLASS_NAME} pl-9`}
        />
      </div>
    </div>
  )
}
