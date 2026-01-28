export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>): void {
    const context = this

    // Clear the existing timer if the function is called again
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    // Set a new timer
    timeoutId = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

export function get<T = any>(
  object: Record<string, any> | null | undefined,
  path: string | string[],
  defaultValue?: T,
): T | undefined {
  // Handle empty or null objects early
  if (!object) return defaultValue

  // Normalize path into an array of strings
  const pathArray = Array.isArray(path)
    ? path
    : path
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean)

  // Traverse the object
  const result = pathArray.reduce((prevObj, key) => {
    return prevObj && typeof prevObj === 'object' ? prevObj[key] : undefined
  }, object as any)

  // Return result or default
  return result === undefined ? defaultValue : (result as T)
}

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result = { ...obj }

  keys.forEach(key => {
    delete result[key]
  })

  return result as Omit<T, K>
}

export const uniq = <T>(arr: T[]): T[] => [...new Set(arr)]

export function without<T>(array: T[], ...values: T[]): T[] {
  const toExclude = new Set(values)
  return array.filter(item => !toExclude.has(item))
}
