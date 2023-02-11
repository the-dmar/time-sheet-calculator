import styled from "styled-components"

interface InputProps {
  selected: boolean
  removeCursor?: boolean
}

interface FlexProps {
  direction?: string
  alignItems?: string
}

export const Input = styled.input<InputProps>`
  border: 1px solid ${({ selected }) => (selected ? "red" : "#ced4da")};
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  outline: transparent;
  transition: border 0.25s ease;
  cursor: ${({ removeCursor }) => (removeCursor ? "cell" : "")};
  caret-color: ${({ removeCursor }) => (removeCursor ? "transparent" : "")};
`

export const FlexContainer = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? "row"};
  align-items: ${({ alignItems }) => alignItems ?? "normal"};
  width: 100%;
`
