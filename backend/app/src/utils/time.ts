export const epochTime = (date = new Date()): number =>
  Math.floor(date.getTime() / 1000)
