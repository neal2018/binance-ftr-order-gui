export const asAny = (_: any) => _ // suppress error in volar

export const roundToPrecision = (value: number, decimals: number) => {
  const pow = Math.pow(10, decimals)
  return Math.round((value + Number.EPSILON) * pow) / pow
}
