import type { JSX } from "react/jsx-runtime";
import { SyntaxHighlighter } from "storybook/internal/components";
import styled from "styled-components";

const IgnoreMyStyles = styled.div`
  &,
  & *:not(button) {
    font-size: 13px !important;
    line-height: 1.5 !important;
    font-family:
      ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono",
      "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New",
      monospace !important;
  }
`;

interface Props {
  colorCss: string;
}
export default function RenderCode({ colorCss }: Props): JSX.Element {
  return (
    <IgnoreMyStyles>
      <SyntaxHighlighter language="css" bordered={true} copyable format={true}>
        {colorCss}
      </SyntaxHighlighter>
    </IgnoreMyStyles>
  );
}
