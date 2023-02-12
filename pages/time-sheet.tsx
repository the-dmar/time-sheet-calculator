import useTimeValue from "@/hooks/useTimeValue"
import { Input } from "@/styles/General.styled"
import {
  ColumnHeader,
  HorizontalHeaderLine,
  TimeSheetGrid,
} from "@/styles/TimeSheet.styled"
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
  const [timeValueHandler, clear] = useTimeValue()
  const [dragging, setDragging] = useState(false)

  const blurHandler = () => {
    setTimeout(() => {
      const { attributes } = document.activeElement as HTMLElement
      const isInput = attributes?.["data-input"]?.value
      if (isInput !== "time") setInputIndexes([])
    }, 10)
  }

  const editSelectedInputs = (value: string) => {
    const newValue = timeValueHandler(value)
    if (typeof newValue === "string") {
      let newInputValues = [...inputValues]
      inputIndexes.forEach(({ rowIndex, inputType }) => {
        newInputValues[rowIndex][inputType] = newValue
      })

      setInputValues(newInputValues)
    }
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

  const handleMouseDown = (rowIndex: number, inputType: InputType) => {
    setInputIndexes(inputIndexes => [...inputIndexes, { rowIndex, inputType }])
    setDragging(true)
  }

  const handleMouseUp = () => setDragging(false)

  const handleMouseOver = (rowIndex: number, inputType: InputType) => {
    if (dragging) {
      setInputIndexes(inputIndexes => [
        ...inputIndexes,
        { rowIndex, inputType },
      ])
    }
  }

  const headers = [
    "Day",
    "Start Time",
    "End Time",
    "Break Time",
    "Duration",
    "Earnings",
  ]

  return (
    <TimeSheetGrid>
      {headers.map(header => (
        <ColumnHeader>{header}</ColumnHeader>
      ))}
      <HorizontalHeaderLine></HorizontalHeaderLine>
      {inputValues.map(({ day, startTime, endTime, breakTime }, rowIndex) => (
        <>
          <div>{day}</div>
          <Input
            removeCursor={true}
            selected={isSelected(rowIndex, "startTime")}
            data-input="time"
            onChange={e => editSelectedInputs(e.target.value)}
            value={startTime}
            onMouseDown={() => handleMouseDown(rowIndex, "startTime")}
            onMouseUp={handleMouseUp}
            onMouseOver={() => handleMouseOver(rowIndex, "startTime")}
            onBlur={blurHandler}
            onKeyDown={e => handleKeydown(e.key, rowIndex, "startTime")}
          />
          <Input
            removeCursor={true}
            selected={isSelected(rowIndex, "endTime")}
            data-input="time"
            onChange={e => editSelectedInputs(e.target.value)}
            value={endTime}
            onMouseDown={() => handleMouseDown(rowIndex, "endTime")}
            onMouseUp={handleMouseUp}
            onMouseOver={() => handleMouseOver(rowIndex, "endTime")}
            onBlur={blurHandler}
            onKeyDown={e => handleKeydown(e.key, rowIndex, "endTime")}
          />
          <Input
            removeCursor={true}
            selected={isSelected(rowIndex, "breakTime")}
            data-input="time"
            onChange={e => editSelectedInputs(e.target.value)}
            value={breakTime}
            onMouseDown={() => handleMouseDown(rowIndex, "breakTime")}
            onMouseUp={handleMouseUp}
            onMouseOver={() => handleMouseOver(rowIndex, "breakTime")}
            onBlur={blurHandler}
            onKeyDown={e => handleKeydown(e.key, rowIndex, "breakTime")}
          />
          <div>2.25</div>
          <div>$32.00</div>
        </>
      ))}
    </TimeSheetGrid>
  )
}
