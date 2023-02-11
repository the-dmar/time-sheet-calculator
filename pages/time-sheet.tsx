import { Input } from "@/styles/General.styled"
import { useState } from "react"

type InputType = "start" | "end"

interface InputLocation {
  rowIndex: number
  inputType: InputType
}

const startingInputValues = [
  { day: "Sunday", start: "", end: "" },
  { day: "Monday", start: "", end: "" },
  { day: "Tuesday", start: "", end: "" },
  { day: "Wednesday", start: "", end: "" },
  { day: "Thursday", start: "", end: "" },
  { day: "Friday", start: "", end: "" },
  { day: "Saturday", start: "", end: "" },
]

export default function TimeSheet() {
  const [inputValues, setInputValues] = useState(startingInputValues)
  const [inputIndexes, setInputIndexes] = useState<InputLocation[]>([])

  const clickHandler = (rowIndex: number, inputType: InputType) => {
    setInputIndexes(inputIndexes => [...inputIndexes, { rowIndex, inputType }])
  }

  const blurHandler = () => {
    setTimeout(() => {
      const { attributes } = document.activeElement as HTMLElement
      const isInput = attributes?.["data-input"]?.value
      if (isInput !== "time") setInputIndexes([])
    }, 10)
  }

  const editSelectedInputs = (value: string) => {
    let newInputValues = [...inputValues]
    inputIndexes.forEach(({ rowIndex, inputType }) => {
      newInputValues[rowIndex][inputType] = value
    })

    setInputValues(newInputValues)
  }

  const isSelected = (currentRowIndex: number, currentType: InputType) => {
    let isInSelectedArray = inputIndexes.find(
      ({ rowIndex, inputType }) =>
        rowIndex === currentRowIndex && currentType === inputType
    )

    if (typeof isInSelectedArray === "object") return true
    else return false
  }

  const handleKeydown = (
    key: string,
    rowIndex: number,
    inputType: InputType
  ) => {
    if (key === "Escape") {
      setInputIndexes([{ rowIndex, inputType }])
    }

    if (key === "Tab") {
      if (inputType === "end") {
        setInputIndexes([{ rowIndex: rowIndex + 1, inputType: "start" }])
      } else setInputIndexes([{ rowIndex: rowIndex, inputType: "end" }])
    }
  }

  return (
    <div>
      {inputValues.map(({ day, start, end }, rowIndex) => (
        <div key={rowIndex}>
          <label>{day}</label>
          <Input
            selected={isSelected(rowIndex, "start")}
            data-input="time"
            onChange={e => editSelectedInputs(e.target.value)}
            value={start}
            onClick={() => clickHandler(rowIndex, "start")}
            onBlur={blurHandler}
            onKeyDown={e => handleKeydown(e.key, rowIndex, "start")}
          />
          <Input
            selected={isSelected(rowIndex, "end")}
            data-input="time"
            onChange={e => editSelectedInputs(e.target.value)}
            value={end}
            onClick={() => clickHandler(rowIndex, "end")}
            onBlur={blurHandler}
            onKeyDown={e => handleKeydown(e.key, rowIndex, "end")}
          />
        </div>
      ))}
      <pre>{JSON.stringify(inputIndexes)}</pre>
    </div>
  )
}
