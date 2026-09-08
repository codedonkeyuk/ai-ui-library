import type { JSX } from "react/jsx-runtime";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid var(--main-bdr-color);
  border-radius: 8px;

  &:focus-visible {
    outline: 2px solid var(--prim-btn-bg-color);
    outline-offset: 2px;
  }
`;

const ScreenReaderNotice = styled.span`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: sans-serif;
  font-size: 14px;
  text-align: left;
`;

const StyledTableHead = styled.thead`
  background-color: var(--alt1-bg-color);
  border-bottom: 2px solid var(--main-bdr-color);
`;

const StyledTableBody = styled.tbody`
  & > tr:not(:last-child) {
    border-bottom: 1px solid var(--main-bdr-color);
  }
  & > tr:nth-child(even) {
    background-color: var(--alt2-bg-color);
  }
`;

const StyledTableFooter = styled.tfoot`
  background-color: var(--alt1-bg-color);
  border-top: 2px solid var(--main-bdr-color);
  font-weight: bold;
`;

const StyledTR = styled.tr`
  transition: background-color 0.2s ease;
  &:hover {
    background-color: var(--main-hover-color);
  }
`;

const StyledTH = styled.th`
  padding: 12px 16px;
  font-weight: 600;
  background-color: inherit;
`;

const StyledTD = styled.td`
  padding: 12px 16px;
`;

type BaseCell = {
  data: string | number;
  colspan?: number;
  rowspan?: number;
};

export type HeaderCell = BaseCell & {
  type: "header";
};

export type DataCell = BaseCell & {
  type: "header" | "data";
};

interface WrapperProps {
  cell: DataCell;
  scope?: "row" | "col";
}

export function CellWrapper({ cell, scope }: WrapperProps): JSX.Element {
  if (cell.type === "header") {
    return (
      <StyledTH colSpan={cell.colspan} rowSpan={cell.rowspan} scope={scope}>
        {cell.data}
      </StyledTH>
    );
  }

  return (
    <StyledTD colSpan={cell.colspan} rowSpan={cell.rowspan}>
      {cell.data}
    </StyledTD>
  );
}

interface Props {
  data: DataCell[][];
  thead?: HeaderCell[][];
  tfoot?: DataCell[][];
  id: string;
}

export default function Table({
  data,
  thead = [],
  tfoot = [],
  id,
}: Props): JSX.Element {
  const instructionId = `table-scroll-instruction-${id}`;

  return (
    <>
      <ScreenReaderNotice id={instructionId}>
        This table features horizontal overflow. Use the left and right arrow
        keys to scroll across additional data columns.
      </ScreenReaderNotice>

      <TableContainer
        tabIndex={0}
        role="region"
        aria-label="Data Table Scroll Container"
        aria-describedby={instructionId}
      >
        <StyledTable>
          {thead.length > 0 && (
            <StyledTableHead>
              {thead.map((row, rowIndex) => (
                <StyledTR key={`thead-${rowIndex}`}>
                  {row.map((cell, colIndex) => (
                    <StyledTH
                      key={`thead-${rowIndex}-${colIndex}`}
                      colSpan={cell.colspan}
                      rowSpan={cell.rowspan}
                      scope="col"
                    >
                      {cell.data}
                    </StyledTH>
                  ))}
                </StyledTR>
              ))}
            </StyledTableHead>
          )}

          <StyledTableBody>
            {data.map((row, rowIndex) => (
              <StyledTR key={`tbody-${rowIndex}`}>
                {row.map((cell, colIndex) => (
                  <CellWrapper
                    key={`tbody-${rowIndex}-${colIndex}`}
                    cell={cell}
                    scope={cell.type === "header" ? "row" : undefined}
                  />
                ))}
              </StyledTR>
            ))}
          </StyledTableBody>

          {tfoot.length > 0 && (
            <StyledTableFooter>
              {tfoot.map((row, rowIndex) => (
                <StyledTR key={`tfoot-${rowIndex}`}>
                  {row.map((cell, colIndex) => (
                    <CellWrapper
                      key={`tfoot-${rowIndex}-${colIndex}`}
                      cell={cell}
                      scope={cell.type === "header" ? "row" : undefined}
                    />
                  ))}
                </StyledTR>
              ))}
            </StyledTableFooter>
          )}
        </StyledTable>
      </TableContainer>
    </>
  );
}
