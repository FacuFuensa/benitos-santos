import { describe, it, expect } from 'vitest'
import { formatPrice } from './utils'

describe('formatPrice', () => {
  it('formats thousands with dots (Argentine convention)', () => {
    expect(formatPrice(15000)).toBe('$15.000')
  })

  it('formats numbers under 1000 without separator', () => {
    expect(formatPrice(999)).toBe('$999')
  })

  it('formats 1600 correctly', () => {
    expect(formatPrice(1600)).toBe('$1.600')
  })

  it('formats large numbers', () => {
    expect(formatPrice(17000)).toBe('$17.000')
  })
})
