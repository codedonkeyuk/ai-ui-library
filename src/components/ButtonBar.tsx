import type { ReactNode, JSX } from "react";
import styled from "styled-components";

type ButtonBarPosition = "start" | "center" | "end";

const ButtonBarDiv = styled.div<{ $position: ButtonBarPosition }>`
  display: flex;
  width: 100%;

  justify-content: ${(props) => {
    if (props.$position === "start") return "flex-start";
    if (props.$position === "end") return "flex-end";
    return props.$position;
  }};
`;

interface Props {
  children: ReactNode;
  position?: ButtonBarPosition;
}

export default function ButtonBar({
  children,
  position = "end",
}: Props): JSX.Element {
  return <ButtonBarDiv $position={position}>{children}</ButtonBarDiv>;
}
