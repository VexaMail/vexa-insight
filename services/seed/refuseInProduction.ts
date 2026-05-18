export function refuseInProduction(): void {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.VEXA_FORCE_SEED_DEMO !== '1'
  ) {
    console.error(
      '[seed:demo] Refusing to run in NODE_ENV=production. Set VEXA_FORCE_SEED_DEMO=1 to override.',
    )
    process.exit(2)
  }
}
