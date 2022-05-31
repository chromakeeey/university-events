export const search = (text: string, pattern: string) => {
  const position = []
  let found = true
  for (let i = 0; i < text.length; i++) {
    found = true
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) {
        found = false
        break
      }
    }
    if (found) {
      position.push(i)
    }
  }

  return !!position.length
}
