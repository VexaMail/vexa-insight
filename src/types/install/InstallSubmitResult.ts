export type InstallSubmitResult =
  | { readonly ok: true; readonly redirect: string }
  | { readonly ok: false; readonly message: string }
