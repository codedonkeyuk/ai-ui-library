import type { DetailedHTMLProps, HTMLAttributes, CSSProperties } from "react";
import styled from "styled-components";
import type {
  IStyledComponentBase,
  CSSPropertiesWithVars,
} from "styled-components/dist/types";

export const ButtonBar: IStyledComponentBase<
  "web",
  Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "style"
  > & {
    style?: CSSProperties | CSSPropertiesWithVars | undefined;
  }
> &
  string = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
`;
