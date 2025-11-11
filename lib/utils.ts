import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const FormatDate = (DateString : string) => {
  const date = new Date(DateString)
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle:"medium"
  })

  return formatter.format(date)
}

export const FormatCurrency = (amount : number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style:'currency',
    currency:'IDR',
    maximumSignificantDigits:3
  })

  return formatter.format(amount)
}
