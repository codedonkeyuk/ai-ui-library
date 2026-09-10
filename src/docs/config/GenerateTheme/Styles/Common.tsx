import type { DetailedHTMLProps, HTMLAttributes, CSSProperties } from "react";
import styled from "styled-components";
import type {
  IStyledComponentBase,
  CSSPropertiesWithVars,
} from "styled-components/dist/types";

export const Rows: IStyledComponentBase<
  "web",
  Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "style"
  > & {
    style?: CSSProperties | CSSPropertiesWithVars | undefined;
  }
> &
  string = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
