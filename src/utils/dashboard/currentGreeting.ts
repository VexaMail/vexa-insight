import { greetingForHour } from './greetingForHour'

/** The greeting for the browser's local time right now. */
export function currentGreeting(): string {
  return greetingForHour(new Date().getHours())
}
