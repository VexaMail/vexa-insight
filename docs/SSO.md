# Single sign-on (OIDC) — experimental

Vexa ships an OpenID Connect (OIDC) client gated behind a feature flag. It is
**experimental**: the just-in-time provisioning is intentionally liberal (any
user the IdP authenticates becomes a `viewer`-role local account) and there is
no SCIM, group sync, or session-token revocation on the IdP side. Use it for
small self-hosted deployments where the IdP itself enforces the allowlist.

## Enable

Set every variable below and restart the app. If any of them is empty, the SSO
endpoints return 404 and the password login keeps working.

```sh
export VEXA_AUTH_PROVIDER=oidc
export OIDC_ISSUER_URL=https://idp.example.com
export OIDC_CLIENT_ID=vexa-dashboard
export OIDC_CLIENT_SECRET=...
export OIDC_REDIRECT_URI=https://vexa.example.com/api/auth/oidc/callback
# Optional. Default: "openid profile email".
export OIDC_SCOPES="openid profile email"
# Optional. Default: false. See "Account linking" below before enabling.
export OIDC_ALLOW_EMAIL_LINKING=false
```

`src/lib/env.ts` validates these at boot via Zod; a missing variable does not
crash the app but disables SSO. `src/utils/auth/isOidcEnabled.ts` is the single
source of truth.

## Flow

1. The user clicks "Sign in with SSO" (UI link points to
   `/api/auth/oidc/start`).
2. `/start` fetches `<issuer>/.well-known/openid-configuration`, sets a
   short-lived `vexa_oidc_state` and `vexa_oidc_verifier` cookie (5 min,
   httpOnly, sameSite=lax), and redirects to the authorization endpoint with
   `response_type=code`, PKCE (`S256`), and the configured scopes.
3. The IdP redirects back to `OIDC_REDIRECT_URI` with `code` and `state`.
4. `/callback` validates the state cookie, exchanges the code for tokens using
   the stored PKCE verifier (client auth via `client_secret_basic`), fetches
   userinfo, and resolves the local user from the `(issuer, sub)` pair, creating
   a fresh row with role `viewer` when no account is bound yet. See "Account
   linking".
5. A normal session cookie is issued; an `auth.login.success` row is appended to
   `audit_log` with `metadata = { provider: 'oidc' }`.

## Audit and rotation

- Every callback writes one of `auth.login.success` / `auth.login.failure` (see
  [src/services/auth/oidc/](../src/services/auth/oidc)) with the IdP recorded
  under `metadata.provider`.
- Discovery is cached in-process for 10 minutes. Restart the app or wait for TTL
  after rotating IdP endpoints.
- Provisioned users hold an unguessable placeholder password hash so password
  login cannot succeed against them. Removing the local user row is the way to
  revoke access for an SSO account.

## Account linking

The local row an SSO session belongs to is decided by the `(issuer, sub)` pair
stored in `users.oidc_issuer` / `users.oidc_subject`. The subject is the only
identifier an OpenID provider guarantees to be stable and unique; an email claim
is not, and many providers will happily assert an address the account never
proved it controls.

Two rules follow, and both are enforced in
`src/services/auth/oidc/provisionUserFromUserInfo.ts`:

- An email claim is used for the display username only when the provider marks
  it `email_verified`. An unverified address is ignored and the subject becomes
  the username.
- A login never adopts a pre-existing local account. If a row already exists
  with that username and no binding to this subject, the login fails rather than
  handing over the account. Without this an attacker who can get any IdP to
  assert the administrator's address would inherit the administrator's session.

Set `OIDC_ALLOW_EMAIL_LINKING=true` to allow that adoption for the one login
that first matches a verified email to an existing username. The binding is
written at that moment, so later logins match on the subject. Turn it on only
when you control the IdP and trust its email verification, and turn it off again
once the accounts you wanted are linked.

## Known gaps (do not ship without addressing)

- **No allowlist.** Anyone the IdP authenticates becomes a local viewer.
  Configure your IdP to only release groups/users you trust.
- **No group → role mapping.** New users land on `viewer`; admins must promote
  them manually.
- **No id_token JWT verification.** We trust the userinfo response served over
  TLS by the issuer. Adding signature verification against `jwks_uri` is the
  obvious next step before this is production-ready.
- **No backchannel logout.** Logging out locally does not invalidate the IdP
  session.
- **No multi-tenancy.** One issuer per deployment.

See [src/services/auth/oidc/](../src/services/auth/oidc/) for the implementation
and `app/api/auth/oidc/{start,callback}/route.ts` for the routes.
