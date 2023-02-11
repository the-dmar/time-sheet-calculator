import { Input } from "@/styles/General.styled"
import { useState } from "react"

type InputType = "startTime" | "endTime" | "breakTime"

interface InputLocation {
  rowIndex: number
  inputType: InputType
}

const startingInputValues = [
  { day: "Sunday", startTime: "", endTime: "", breakTime: "" },
  { day: "Monday", startTime: "", endTime: "", breakTime: "" },
  { day: "Tuesday", startTime: "", endTime: "", breakTime: "" },
  { day: "Wednesday", startTime: "", endTime: "", breakTime: "" },
  { day: "Thursday", startTime: "", endTime: "", breakTime: "" },
  { day: "Friday", startTime: "", endTime: "", breakTime: "" },
  { day: "Saturday", startTime: "", endTime: "", breakTime: "" },
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
      if (inputType === "endTime") {
        setInputIndexes([{ rowIndex: rowIndex + 1, inputType: "startTime" }])
      } else setInputIndexes([{ rowIndex: rowIndex, inputType: "endTime" }])
    }
  }

  const headers = ["Day", "Start Time", "End Time", "Break Time", "Total"]

  return (
    <div>
      {inputValues.map(({ day, startTime, endTime, breakTime }, rowIndex) => (
        <div key={rowIndex}>
          <label>{day}</label>
          <Input
            selected={isSelected(rowIndex, "startTime")}
            data-input="time"
            onChange={e => editSelectedInputs(e.target.value)}
            value={startTime}
            onClick={() => clickHandler(rowIndex, "startTime")}
            onBlur={blurHandler}
            onKeyDown={e => handleKeydown(e.key, rowIndex, "startTime")}
          />
          <Input
            selected={isSelected(rowIndex, "endTime")}
            data-input="time"
            onChange={e => editSelectedInputs(e.target.value)}
            value={endTime}
            onClick={() => clickHandler(rowIndex, "endTime")}
            onBlur={blurHandler}
            onKeyDown={e => handleKeydown(e.key, rowIndex, "endTime")}
          />
          <Input
            selected={isSelected(rowIndex, "breakTime")}
            data-input="time"
            onChange={e => editSelectedInputs(e.target.value)}
            value={breakTime}
            onClick={() => clickHandler(rowIndex, "breakTime")}
            onBlur={blurHandler}
            onKeyDown={e => handleKeydown(e.key, rowIndex, "breakTime")}
          />
          <div>2.25</div>
        </div>
      ))}
      <pre>{JSON.stringify(inputIndexes)}</pre>
    </div>
  )
}
