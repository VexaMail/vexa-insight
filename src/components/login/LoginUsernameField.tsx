import {
  LOGIN_INPUT_CLASS_NAME,
  LOGIN_LABEL_CLASS_NAME,
} from '@/constants/login'

export function LoginUsernameField() {
  return (
    <div>
      <label htmlFor="username" className={`mb-1 ${LOGIN_LABEL_CLASS_NAME}`}>
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        required
        className={LOGIN_INPUT_CLASS_NAME}
      />
    </div>
  )
}
