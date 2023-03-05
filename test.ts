const handlePaste = (pasteEvent: ClipboardEvent) => {
  const clipboardData = pasteEvent.clipboardData?.getData("Text")
  if (typeof clipboardData === "string") {
    const reformattedClipboardData = reformatPasteData(clipboardData)
    console.log(reformattedClipboardData)
  }
}

const reformatPasteData = (clipboardData: string) => {
  return clipboardData
    .split("\n")
    .map(row =>
      row
        .split("")
        .filter(el => !/(\t|\r)/.test(el))
        .map(el => ({ value: el }))
    )

    .filter(row => row.length !== 0)
}
