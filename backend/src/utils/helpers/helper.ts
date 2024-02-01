import { sub } from 'date-fns'

export const removeEmptyProperties = (obj: any): any => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

export const convertToBrazilianTimezone = (date: Date): any => {
  const newDate = sub(date, { hours: 3 })
  const dateInit = newDate.toISOString()
  const dateEnd = sub(newDate, { minutes: -30 }).toISOString()

  return { dateInit, dateEnd }
}

export const dateTimezoneBR = (date: Date): any => {
  const newDate = sub(date, { hours: 3 })
  const dateFinal = newDate.toISOString()

  return dateFinal
}

export const dateNow = (): Date => {
  return sub(new Date(), { hours: 3 })
}

export type MockModule<T = any> = {
  [K in keyof T]?: jest.Mock
}
