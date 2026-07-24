import { describe, expect, it } from 'vitest'
import {
  pageQuerySchema,
  pollStatusPageSizeQuerySchema,
  reportsPageSizeQuerySchema,
} from '../validators/query'

describe('pagination query schemas', () => {
  function param(query: string, key: string): string | undefined {
    return new URLSearchParams(query).get(key) ?? undefined
  }

  describe('pageQuerySchema', () => {
    it('defaults to page 1 when missing or non-numeric', () => {
      expect(pageQuerySchema.parse(param('', 'page'))).toBe(1)
      expect(pageQuerySchema.parse(param('page=abc', 'page'))).toBe(1)
    })

    it('parses numeric values and floors fractions', () => {
      expect(pageQuerySchema.parse(param('page=3', 'page'))).toBe(3)
      expect(pageQuerySchema.parse(param('page=2.9', 'page'))).toBe(2)
    })

    it('clamps values below 1', () => {
      expect(pageQuerySchema.parse(param('page=0', 'page'))).toBe(1)
      expect(pageQuerySchema.parse(param('page=-4', 'page'))).toBe(1)
      expect(pageQuerySchema.parse(param('page=', 'page'))).toBe(1)
    })
  })

  describe('reportsPageSizeQuerySchema', () => {
    it('defaults to 25 when missing or non-numeric', () => {
      expect(reportsPageSizeQuerySchema.parse(param('', 'pageSize'))).toBe(25)
      expect(
        reportsPageSizeQuerySchema.parse(param('pageSize=x', 'pageSize')),
      ).toBe(25)
    })

    it('clamps to the 1..100 range', () => {
      expect(
        reportsPageSizeQuerySchema.parse(param('pageSize=0', 'pageSize')),
      ).toBe(1)
      expect(
        reportsPageSizeQuerySchema.parse(param('pageSize=500', 'pageSize')),
      ).toBe(100)
      expect(
        reportsPageSizeQuerySchema.parse(param('pageSize=50', 'pageSize')),
      ).toBe(50)
    })
  })

  describe('pollStatusPageSizeQuerySchema', () => {
    it('accepts only the allowed page sizes', () => {
      for (const allowed of [50, 100, 300, 500, 1000]) {
        expect(
          pollStatusPageSizeQuerySchema.parse(
            param(`pageSize=${allowed}`, 'pageSize'),
          ),
        ).toBe(allowed)
      }
    })

    it('falls back to 50 for missing, invalid or disallowed values', () => {
      expect(pollStatusPageSizeQuerySchema.parse(param('', 'pageSize'))).toBe(
        50,
      )
      expect(
        pollStatusPageSizeQuerySchema.parse(param('pageSize=abc', 'pageSize')),
      ).toBe(50)
      expect(
        pollStatusPageSizeQuerySchema.parse(param('pageSize=7', 'pageSize')),
      ).toBe(50)
      expect(
        pollStatusPageSizeQuerySchema.parse(
          param('pageSize=99999', 'pageSize'),
        ),
      ).toBe(50)
    })
  })
})
