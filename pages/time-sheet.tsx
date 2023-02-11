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
  const [editingInputs, setEditingInputs] = useState<InputLocation[]>([])

  return (
    <div>
      {inputValues.map(({ day, start, end }, rowIndex) => (
        <div key={rowIndex}>
          <label>{day}</label>
          <div>
            <label>Start</label>
            <input data-input="time" value={start} />
          </div>
          <div>
            <label>End</label>
            <input data-input="time" value={end} />
          </div>
        </div>
      ))}
      <pre>{JSON.stringify(editingInputs, null, 2)}</pre>
    </div>
  )
}
