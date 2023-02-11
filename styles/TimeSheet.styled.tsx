import styled from "styled-components"

export const TimeSheetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  max-width: 80%;
  margin: auto;
  gap: 1rem;

  & > * {
    margin: auto;
  }
`

export const HorizontalHeaderLine = styled.div`
  height: 1px;
  grid-column: 1/7;
  margin: 0 3rem;
  background-color: lightgray;
`

export const ColumnHeader = styled.h3``
