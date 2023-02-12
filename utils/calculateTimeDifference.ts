import validateTime from "./validateTime"

const moment = require("moment")

export default function calculateTimeDifference(time1: string, time2: string) {
  if (validateTime(time1) && validateTime(time2)) {
    const startTime = moment(time1, "HH:mm a")
    const endTime = moment(time2, "HH:mm a")

    const duration = moment.duration(endTime.diff(startTime))
    const hours = parseInt(duration.asHours())
    const minutes = parseInt(duration.asMinutes()) % 60

    return `${hours}.${minutes}`
  } else return "N/A"
}
