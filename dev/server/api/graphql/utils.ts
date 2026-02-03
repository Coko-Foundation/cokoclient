function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function merge(target: any, source: any): any {
  // 1. Initialize result with target (or empty if target isn't an object)
  const output = Object.assign({}, target)

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        // 2. If the key exists in both and both are objects, recurse
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = merge(target[key], source[key])
        }
      } else {
        // 3. If it's a primitive (string, func, etc.), just overwrite
        Object.assign(output, { [key]: source[key] })
      }
    })
  }

  return output
}
