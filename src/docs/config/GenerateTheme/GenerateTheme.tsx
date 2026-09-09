import type { JSX } from "react/jsx-runtime";
import { SyntaxHighlighter } from "storybook/internal/components";
import { useEffect, useState } from "react";
import React from "react";
import type { ColorConfig, ThemeVariants } from "./Types";
import BasicPallete from "./BasicPallete";
import { modernCss } from "./GenerateCss";
import { GlobalStyle, Input } from "../../../lib";
import styled from "styled-components";

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #000000;
`;

const GridStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

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

const ConfigRow = React.memo(
  ({
    cssKey,
    variants,
    onChange,
  }: {
    cssKey: string;
    variants: ThemeVariants;
    onChange: (cssKey: string, mode: "light" | "dark", value: string) => void;
  }) => {
    return (
      <CardStyle>
        <center>
          <h3>--{cssKey}</h3>
        </center>

        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ flex: 1 }}>
            <Input
              label="Light"
              type="text"
              value={variants.light}
              onChange={(e) => onChange(cssKey, "light", e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input
              label="Dark"
              type="text"
              value={variants.dark}
              onChange={(e) => onChange(cssKey, "dark", e.target.value)}
            />
          </div>
        </div>
      </CardStyle>
    );
  },
);

ConfigRow.displayName = "ConfigRow";

export default function GenerateTheme(): JSX.Element {
  const [colorConfig, setColorConfig] = useState<ColorConfig>(BasicPallete);
  const [colorCss, setColorCss] = useState<string>("");

  const handleInputChange = React.useCallback(
    (cssKey: string, mode: "light" | "dark", value: string) => {
      setColorConfig((prevConfig) => ({
        ...prevConfig,
        [cssKey]: {
          ...prevConfig[cssKey],
          [mode]: value,
        },
      }));
    },
    [],
  );

  useEffect(() => {
    setColorCss(modernCss(colorConfig));
  }, [colorConfig]);

  return (
    <>
      <GlobalStyle />
      <div style={{ colorScheme: "light" }}>
        <GridStyle>
          {Object.entries(colorConfig).map(([cssKey, variants]) => (
            <ConfigRow
              key={cssKey}
              cssKey={cssKey}
              variants={variants}
              onChange={handleInputChange}
            />
          ))}
        </GridStyle>
      </div>
      <IgnoreMyStyles>
        <SyntaxHighlighter
          language="css"
          bordered={true}
          copyable
          format={true}
        >
          {colorCss}
        </SyntaxHighlighter>
      </IgnoreMyStyles>
    </>
  );
}
