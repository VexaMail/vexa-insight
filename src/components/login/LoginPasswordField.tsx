import {
  LOGIN_INPUT_CLASS_NAME,
  LOGIN_LABEL_CLASS_NAME,
} from '@/constants/login'
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
      <input
        id="password"
        name="password"
        type="password"
        required
        className={LOGIN_INPUT_CLASS_NAME}
      />
    </div>
  )
}
