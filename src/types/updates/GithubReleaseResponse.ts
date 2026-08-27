export type GithubReleaseResponse = {
  readonly tag_name: string
  readonly name: string | null
  readonly body: string | null
  readonly html_url: string
  readonly published_at: string | null
  readonly draft: boolean
  readonly prerelease: boolean
}
