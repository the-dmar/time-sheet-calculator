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

  return (
    <div>
      {inputValues.map(({ day, start, end }, rowIndex) => (
        <div key={rowIndex}>
          <label>{day}</label>
          <div>
            <label>Start</label>
            <input
              data-input="time"
              onChange={e => editSelectedInputs(e.target.value)}
              value={start}
              onClick={() => clickHandler(rowIndex, "start")}
              onBlur={blurHandler}
            />
          </div>
          <div>
            <label>End</label>
            <input
              data-input="time"
              onChange={e => editSelectedInputs(e.target.value)}
              value={end}
              onClick={() => clickHandler(rowIndex, "end")}
              onBlur={blurHandler}
            />
          </div>
        </div>
      ))}
      <pre>{JSON.stringify(inputIndexes, null, 2)}</pre>
    </div>
  )
}
