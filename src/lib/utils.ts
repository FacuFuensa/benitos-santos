import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// formatPrice(15000) → "$15.000"
// Uses Argentine convention (dot as thousands separator)
export function formatPrice(amount: number): string {
  return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
