import { describe, expect, it } from 'vitest'
import { parseRepoSlug } from '../src/utils/updates/parseRepoSlug'

describe('parseRepoSlug', () => {
  it('parses owner/repo strings', () => {
    expect(parseRepoSlug('VexaMail/vexa-insight-dashboard')).toEqual({
      owner: 'VexaMail',
      repo: 'vexa-insight-dashboard',
    })
  })
  it('parses GitHub https URLs', () => {
    expect(
      parseRepoSlug('https://github.com/VexaMail/vexa-insight-dashboard'),
    ).toEqual({
      owner: 'VexaMail',
      repo: 'vexa-insight-dashboard',
    })
  })
  it('parses git+https URLs and strips .git', () => {
    expect(
      parseRepoSlug(
        'git+https://github.com/VexaMail/vexa-insight-dashboard.git',
      ),
    ).toEqual({ owner: 'VexaMail', repo: 'vexa-insight-dashboard' })
  })
  it('returns null for non-GitHub hosts', () => {
    expect(parseRepoSlug('https://gitlab.com/foo/bar')).toBeNull()
  })
  it('returns null for null/undefined/empty', () => {
    expect(parseRepoSlug(null)).toBeNull()
    expect(parseRepoSlug(undefined)).toBeNull()
    expect(parseRepoSlug('')).toBeNull()
    expect(parseRepoSlug('not-a-slug')).toBeNull()
  })
})
