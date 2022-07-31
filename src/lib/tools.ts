export function isVoid(value: any) {
  return value === undefined || value === null || Number.isNaN(value)
}
