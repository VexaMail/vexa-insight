import { describe, expect, it } from 'vitest'
import { parseFullRescanFlag } from '../app/api/v1/admin/trigger-poll/parseFullRescanFlag'
import { getSinceDate } from '../src/utils/imap/getSinceDate'
import { DEFAULT_DAYS_BACK } from '../src/utils/install/defaultDaysBack'
import { parseIngestionDaysBack } from '../src/utils/install/parseIngestionDaysBack'

describe('parseIngestionDaysBack', () => {
  const cases: Array<[unknown, number]> = [
    [undefined, DEFAULT_DAYS_BACK],
    [0, DEFAULT_DAYS_BACK],
    [-5, DEFAULT_DAYS_BACK],
    [400, DEFAULT_DAYS_BACK],
    ['not a number', DEFAULT_DAYS_BACK],
    [1, 1],
    [7, 7],
    ['14', 14],
    [365, 365],
  ]

  it.each(cases)('maps %s to %s', (input, expected) => {
    expect(parseIngestionDaysBack(input)).toBe(expected)
  })
})

describe('getSinceDate', () => {
  it('drops the date filter for the full rescan window', () => {
    expect(getSinceDate(0).getFullYear()).toBe(2000)
  })

  it('subtracts the window from today', () => {
    const since = getSinceDate(10)
    const days = (Date.now() - since.getTime()) / 86_400_000
    expect(days).toBeGreaterThan(9.9)
    expect(days).toBeLessThan(10.1)
  })
})

describe('parseFullRescanFlag', () => {
  const asRequest = (body: string) =>
    new Request('http://localhost/api/v1/admin/trigger-poll', {
      method: 'POST',
      body,
    }) as unknown as Parameters<typeof parseFullRescanFlag>[0]

  it('reads an explicit true', async () => {
    await expect(
      parseFullRescanFlag(asRequest('{"fullRescan":true}')),
    ).resolves.toBe(true)
  })

  it('defaults to false for other values', async () => {
    await expect(
      parseFullRescanFlag(asRequest('{"fullRescan":"yes"}')),
    ).resolves.toBe(false)
    await expect(parseFullRescanFlag(asRequest('{}'))).resolves.toBe(false)
  })

  it('defaults to false when the body is missing or invalid', async () => {
    await expect(parseFullRescanFlag(asRequest(''))).resolves.toBe(false)
    await expect(parseFullRescanFlag(asRequest('nonsense'))).resolves.toBe(
      false,
    )
  })
})
