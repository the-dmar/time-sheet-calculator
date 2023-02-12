export default function validateTime(time: string) {
  return /\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/g.test(time)
}
