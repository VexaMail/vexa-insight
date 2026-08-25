import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createImapLogger } from '../utils/imap/createImapLogger'
import { isImapDebugEnabled } from '../utils/imap/isImapDebugEnabled'

describe('isImapDebugEnabled', () => {
  let original: string | undefined

  beforeEach(() => {
    original = process.env.VEXA_IMAP_DEBUG
  })
  afterEach(() => {
    if (original === undefined) delete process.env.VEXA_IMAP_DEBUG
    else process.env.VEXA_IMAP_DEBUG = original
  })

  it('defaults to false when unset', () => {
    delete process.env.VEXA_IMAP_DEBUG
    expect(isImapDebugEnabled()).toBe(false)
  })
  it('is true only for explicit on-like values', () => {
    for (const value of ['true', '1', 'yes', 'on', 'TRUE', ' On ']) {
      process.env.VEXA_IMAP_DEBUG = value
      expect(isImapDebugEnabled()).toBe(true)
    }
  })
  it('is false for anything else', () => {
    for (const value of ['false', '0', 'no', 'off', '', 'maybe']) {
      process.env.VEXA_IMAP_DEBUG = value
      expect(isImapDebugEnabled()).toBe(false)
    }
  })
})

describe('createImapLogger', () => {
  let original: string | undefined

  beforeEach(() => {
    original = process.env.VEXA_IMAP_DEBUG
  })
  afterEach(() => {
    if (original === undefined) delete process.env.VEXA_IMAP_DEBUG
    else process.env.VEXA_IMAP_DEBUG = original
    vi.restoreAllMocks()
  })

  it('drops the protocol trace but keeps warnings and errors', () => {
    delete process.env.VEXA_IMAP_DEBUG
    const debug = vi.spyOn(console, 'debug').mockImplementation(() => undefined)
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const logger = createImapLogger()
    logger.debug({ msg: 'ENVELOPE ("subject") ' })
    logger.info({ msg: 'authenticated' })
    logger.warn({ msg: 'slow response' })
    logger.error({ msg: 'connection closed' })

    expect(debug).not.toHaveBeenCalled()
    expect(info).not.toHaveBeenCalled()
    expect(warn).toHaveBeenCalledOnce()
    expect(error).toHaveBeenCalledOnce()
  })

  it('logs everything when VEXA_IMAP_DEBUG is on', () => {
    process.env.VEXA_IMAP_DEBUG = 'true'
    const debug = vi.spyOn(console, 'debug').mockImplementation(() => undefined)
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined)

    const logger = createImapLogger()
    logger.debug({ msg: 'trace' })
    logger.info({ msg: 'authenticated' })

    expect(debug).toHaveBeenCalledOnce()
    expect(info).toHaveBeenCalledOnce()
  })
})
