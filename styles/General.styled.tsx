import styled from "styled-components"

interface InputProps {
  selected: boolean
}

export const Input = styled.input<InputProps>`
  border: 1px solid ${({ selected }) => (selected ? "red" : "#ced4da")};
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  outline: transparent;
  transition: border 0.25s ease;
`
