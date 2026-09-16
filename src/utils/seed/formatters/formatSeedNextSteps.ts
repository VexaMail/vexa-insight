/**
 * What to do after seeding, which is not the same sentence in both places the
 * seeder runs. A container user reached it through `docker exec` and has no
 * checkout to run `pnpm dev` in; telling them to is the first confusing step.
 */
export function formatSeedNextSteps(isContainer: boolean): string {
  if (isContainer) {
    return '\nNext steps:\n  reload the dashboard — the demo rows are already in the database.\n'
  }
  return '\nNext steps:\n  pnpm dev\n  open http://localhost:3000 and sign in.\n'
}
