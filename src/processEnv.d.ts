// The environment variables this app reads, declared as real properties.
//
// Next inlines `process.env.NODE_ENV` by matching the member expression
// literally at build time, so those accesses have to stay dot notation. Under
// `noPropertyAccessFromIndexSignature` that is an error against ProcessEnv's
// index signature unless the property exists, which is what this declaration
// does. The list doubles as the app's env contract: a variable that is not
// here is a typo, which is the point of the flag. Keep it in step with
// `.env.example` and `docs/`.
declare namespace NodeJS {
  // `interface`, not `type`, and it has to be: this augments Node's own
  // ProcessEnv by declaration merging, which only interfaces do. The
  // consistent-type-definitions rule is right everywhere else.
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ProcessEnv {
    DATABASE_URL?: string
    GEODATADIR?: string
    LLM_BACKEND?: string
    NEXT_RUNTIME?: string
    SECRET_KEY?: string
    VEXA_ALLOWED_ORIGINS?: string
    VEXA_IMAP_DEBUG?: string
    VEXA_UPDATE_CHECK_ENABLED?: string
    VEXA_UPDATE_REPO?: string
  }
}
