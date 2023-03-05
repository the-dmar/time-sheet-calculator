import { useState } from "react"

export default function useTimeValue() {
  const [lastCharacter, setLastCharacter] = useState("")

  const handleNewValue = (newValue: string) => {
    if (!/:{2,}/g.test(newValue)) {
      setLastCharacter(newValue[newValue.length - 1])
      return newValue.toUpperCase()
    }
  }

  const timeValueHandler = (value: string) => {
    if (
      /(^$|[0-9]|a|p|m|:|\s)/gi.test(value) &&
      !/:{2}/.test(value) &&
      value.length <= 8
    ) {
      if (value.length === 1 && !/([0-1])/.test(value)) {
        return handleNewValue(`0${value}:`)
      }

      if (value.length === 2 && lastCharacter !== ":") {
        return handleNewValue(`${value}:`)
      }

      if (value.length === 5 && lastCharacter !== " ") {
        return handleNewValue(`${value} `)
      }
    }
    return handleNewValue(value)
  }

  const clear = () => setLastCharacter("")

  return [timeValueHandler, clear] as const
}
