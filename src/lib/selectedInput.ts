// BUG: #30 Prisma cant accept dynamic values and infer types back
export const selectedInput = (input: string[] | undefined): object => {
  if (!input) return {}
  const select = input.reduce((acc, select) => {
    return { ...acc, [select]: true }
  }, {})

  // Always return ID
  return { id: true, ...select }
}
