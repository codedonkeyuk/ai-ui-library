import type { JSX } from "react/jsx-runtime";
import { useEffect, useState, useMemo } from "react";
import React from "react";
import type { ColorConfigGroup } from "./Types";
import styles from "./Styles/Styles";
import { modernCss } from "./GenerateCss";
import { Button, H2 } from "storybook/internal/components";
import styled from "styled-components";
import RenderDemo from "./RenderDemo";
import RenderCode from "./RenderCode";
import { ConfigRow } from "./ConfigRow";

const PageStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
`;

const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
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

// Clean, theme-aware layout bar for native buttons
const ButtonBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  width: 100%;
  margin-bottom: 4px;
`;

export default function GenerateTheme(): JSX.Element {
  const [stylesConfig, setStylesConfig] = useState<ColorConfigGroup>(styles);

  const [activeSection, setActiveSection] = useState<"preview" | "code">(
    "preview",
  );

  const [demoTheme, setDemoTheme] = useState<"light" | "dark">("light");

  const groupKeys = useMemo(() => Object.keys(stylesConfig), [stylesConfig]);
  const [activeGroup, setActiveGroup] = useState<string>(groupKeys[0] || "");

  const [colorCss, setColorCss] = useState<string>("");

  const handleInputChange = React.useCallback(
    (cssKey: string, mode: "light" | "dark", value: string) => {
      setStylesConfig((prevConfig) => {
        const currentGroup = prevConfig[activeGroup];
        if (!currentGroup) return prevConfig;

        return {
          ...prevConfig,
          [activeGroup]: {
            ...currentGroup,
            properties: {
              ...currentGroup.properties,
              [cssKey]: {
                ...currentGroup.properties[cssKey],
                [mode]: value,
              },
            },
          },
        };
      });
    },
    [activeGroup],
  );

  useEffect(() => {
    setColorCss(modernCss(stylesConfig));
  }, [stylesConfig]);

  const activeProperties = stylesConfig[activeGroup]?.properties || {};
  const ActiveExample = stylesConfig[activeGroup]?.example;

  return (
    <PageStyled className="sb-unstyled">
      <CardStyled>
        {/* Swapped raw h2 for Storybook's native theme-aware H2 */}
        <H2>Select Controls</H2>
        <ButtonBar>
          {groupKeys.map((key) => (
            <Button
              key={key}
              variant={activeGroup === key ? "solid" : "outline"}
              onClick={() => setActiveGroup(key)}
              size="small"
            >
              {key}
            </Button>
          ))}
        </ButtonBar>
      </CardStyled>

      <CardStyled>
        {/* Swapped raw h2 for Storybook's native theme-aware H2 */}
        <H2>Updated Related Properties</H2>
        <GridStyle>
          {Object.entries(activeProperties).map(([cssKey, variants]) => (
            <ConfigRow
              key={`${activeGroup}-${cssKey}`}
              cssKey={cssKey}
              variants={variants}
              onChange={handleInputChange}
            />
          ))}
        </GridStyle>
      </CardStyled>

      <CardStyled>
        {/* Swapped raw h2 for Storybook's native theme-aware H2 */}
        <H2>Preview</H2>
        <ButtonBar>
          <Button
            variant={activeSection === "preview" ? "solid" : "outline"}
            onClick={() => setActiveSection("preview")}
            size="small"
          >
            Preview
          </Button>
          <Button
            variant={activeSection === "code" ? "solid" : "outline"}
            onClick={() => setActiveSection("code")}
            size="small"
          >
            Code
          </Button>
        </ButtonBar>

        {activeSection === "preview" && (
          <ButtonBar>
            <Button
              variant={demoTheme === "light" ? "solid" : "outline"}
              onClick={() => setDemoTheme("light")}
              size="small"
            >
              Light Mode
            </Button>
            <Button
              variant={demoTheme === "dark" ? "solid" : "outline"}
              onClick={() => setDemoTheme("dark")}
              size="small"
            >
              Dark Mode
            </Button>
          </ButtonBar>
        )}

        {activeSection === "preview" && ActiveExample && (
          <RenderDemo theme={demoTheme} generatedCss={colorCss}>
            <ActiveExample />
          </RenderDemo>
        )}

        {activeSection === "code" && <RenderCode colorCss={colorCss} />}
      </CardStyled>
    </PageStyled>
  );
}
