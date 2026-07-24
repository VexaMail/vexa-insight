import { describe, expect, it } from 'vitest'
import {
  auditLogLimitQuerySchema,
  daysFilterQuerySchema,
  domainIdQuerySchema,
  jobRunHistoryLimitQuerySchema,
  nonEmptyTextQuerySchema,
  oidcCallbackQuerySchema,
  trendDaysQuerySchema,
  trendPeriodQuerySchema,
} from '../validators/query'

describe('filter query schemas', () => {
  function raw(query: string, key: string): string | null {
    return new URLSearchParams(query).get(key)
  }

  function optional(query: string, key: string): string | undefined {
    return raw(query, key) ?? undefined
  }

  describe('domainIdQuerySchema', () => {
    it('returns null when missing or non-numeric', () => {
      expect(domainIdQuerySchema.parse(raw('', 'domainId'))).toBeNull()
      expect(
        domainIdQuerySchema.parse(raw('domainId=abc', 'domainId')),
      ).toBeNull()
    })

    it('returns the numeric id when supplied', () => {
      expect(domainIdQuerySchema.parse(raw('domainId=42', 'domainId'))).toBe(42)
    })
  })

  describe('nonEmptyTextQuerySchema', () => {
    it('maps missing and empty values to undefined', () => {
      expect(nonEmptyTextQuerySchema.parse(raw('', 'org'))).toBeUndefined()
      expect(nonEmptyTextQuerySchema.parse(raw('org=', 'org'))).toBeUndefined()
    })

    it('passes non-empty values through unchanged', () => {
      expect(nonEmptyTextQuerySchema.parse(raw('org=acme%20inc', 'org'))).toBe(
        'acme inc',
      )
    })
  })

  describe('trendPeriodQuerySchema', () => {
    it('defaults to day when the param is absent', () => {
      expect(trendPeriodQuerySchema.parse(optional('', 'period'))).toBe('day')
    })

    it('accepts the buckets supported by getTrendStats', () => {
      for (const period of ['hour', 'day', 'week']) {
        expect(
          trendPeriodQuerySchema.parse(optional(`period=${period}`, 'period')),
        ).toBe(period)
      }
    })

    it('rejects any other value with the documented message', () => {
      const result = trendPeriodQuerySchema.safeParse(
        optional('period=month', 'period'),
      )
      expect(result.success).toBe(false)
      expect(result.error?.issues[0]?.message).toBe(
        'period must be hour, day, or week',
      )
    })
  })

  describe('trendDaysQuerySchema', () => {
    it('defaults to 30 for missing, non-numeric and zero values', () => {
      expect(trendDaysQuerySchema.parse(optional('', 'days'))).toBe(30)
      expect(trendDaysQuerySchema.parse(optional('days=abc', 'days'))).toBe(30)
      expect(trendDaysQuerySchema.parse(optional('days=0', 'days'))).toBe(30)
    })

    it('clamps to the 1..3650 range', () => {
      expect(trendDaysQuerySchema.parse(optional('days=-5', 'days'))).toBe(1)
      expect(trendDaysQuerySchema.parse(optional('days=99999', 'days'))).toBe(
        3650,
      )
      expect(trendDaysQuerySchema.parse(optional('days=7', 'days'))).toBe(7)
    })
  })

  describe('daysFilterQuerySchema', () => {
    it('returns undefined when missing or invalid', () => {
      expect(daysFilterQuerySchema.parse(optional('', 'days'))).toBeUndefined()
      expect(
        daysFilterQuerySchema.parse(optional('days=abc', 'days')),
      ).toBeUndefined()
      expect(
        daysFilterQuerySchema.parse(optional('days=0', 'days')),
      ).toBeUndefined()
      expect(
        daysFilterQuerySchema.parse(optional('days=-3', 'days')),
      ).toBeUndefined()
    })

    it('returns positive integers unchanged', () => {
      expect(daysFilterQuerySchema.parse(optional('days=14', 'days'))).toBe(14)
    })
  })

  describe('auditLogLimitQuerySchema', () => {
    it('defaults to 100 when missing or non-numeric', () => {
      expect(auditLogLimitQuerySchema.parse(optional('', 'limit'))).toBe(100)
      expect(
        auditLogLimitQuerySchema.parse(optional('limit=abc', 'limit')),
      ).toBe(100)
    })

    it('clamps to the 1..500 range', () => {
      expect(auditLogLimitQuerySchema.parse(optional('limit=0', 'limit'))).toBe(
        1,
      )
      expect(
        auditLogLimitQuerySchema.parse(optional('limit=9000', 'limit')),
      ).toBe(500)
      expect(
        auditLogLimitQuerySchema.parse(optional('limit=25', 'limit')),
      ).toBe(25)
    })
  })

  describe('jobRunHistoryLimitQuerySchema', () => {
    it('defaults to 50 for missing, non-numeric and zero values', () => {
      expect(jobRunHistoryLimitQuerySchema.parse(optional('', 'limit'))).toBe(
        50,
      )
      expect(
        jobRunHistoryLimitQuerySchema.parse(optional('limit=abc', 'limit')),
      ).toBe(50)
      expect(
        jobRunHistoryLimitQuerySchema.parse(optional('limit=0', 'limit')),
      ).toBe(50)
    })

    it('clamps to the 1..100 range', () => {
      expect(
        jobRunHistoryLimitQuerySchema.parse(optional('limit=-2', 'limit')),
      ).toBe(1)
      expect(
        jobRunHistoryLimitQuerySchema.parse(optional('limit=400', 'limit')),
      ).toBe(100)
    })
  })

  describe('oidcCallbackQuerySchema', () => {
    it('accepts a non-empty code and state', () => {
      const result = oidcCallbackQuerySchema.safeParse({
        code: 'auth-code',
        state: 'state-value',
      })
      expect(result.success).toBe(true)
      expect(result.data).toEqual({ code: 'auth-code', state: 'state-value' })
    })

    it('rejects missing or empty values', () => {
      expect(
        oidcCallbackQuerySchema.safeParse({ code: null, state: 'x' }).success,
      ).toBe(false)
      expect(
        oidcCallbackQuerySchema.safeParse({ code: 'x', state: null }).success,
      ).toBe(false)
      expect(
        oidcCallbackQuerySchema.safeParse({ code: '', state: '' }).success,
      ).toBe(false)
    })
  })
})
