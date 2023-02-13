import useTimeValue from "@/hooks/useTimeValue"
import { Input } from "@/styles/General.styled"
import {
  ColumnHeader,
  HorizontalHeaderLine,
  TimeSheetGrid,
} from "@/styles/TimeSheet.styled"
import calculateTimeDifference from "@/utils/calculateTimeDifference"
import { useState, useCallback } from "react"

type InputType = "startTime" | "endTime" | "breakTime"

interface InputLocation {
  rowIndex: number
  inputType: InputType
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const startingInputValues = days.map(day => ({
  day,
  startTime: "",
  endTime: "",
  breakTime: "",
}))

export default function TimeSheet() {
  const [inputValues, setInputValues] = useState(startingInputValues)
  const [inputIndexes, setInputIndexes] = useState<InputLocation[]>([])
  const [timeValueHandler, clear] = useTimeValue()
  const [dragging, setDragging] = useState(false)
  const [rate, setRate] = useState(35)

  const addDurationAndEarnings = useCallback(() => {
    const newInputValues = inputValues.map(day => {
      console.log({ day })
      if (day.startTime.length === 8 && day.endTime.length === 8) {
        let newDay = {
          ...day,
          duration: calculateTimeDifference(day.startTime, day.endTime),
        }
        return newDay
      } else return day
    })

    setInputValues(newInputValues)
  }, [])

  const blurHandler = () => {
    setTimeout(() => {
      const { attributes } = document.activeElement as HTMLElement
      const isInput = attributes.getNamedItem("data-input")?.nodeValue
      if (isInput !== "time") {
        setDragging(false)
        setInputIndexes([])
      }
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
    setInputIndexes([{ rowIndex, inputType }])
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
      {inputValues.map(({ day, startTime, endTime, breakTime }, rowIndex) => {
        const duration = calculateTimeDifference(startTime, endTime)

        return (
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
            <div>{duration}</div>
            <div>
              {!isNaN(parseFloat(duration))
                ? `$${parseFloat(duration) * rate}`
                : "N/A"}
            </div>
          </>
        )
      })}
    </TimeSheetGrid>
  )
}
