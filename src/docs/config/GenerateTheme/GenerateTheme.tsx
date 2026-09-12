import type { JSX } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import React from "react";
import type { ColorConfigGroup } from "./Types";
import styles from "./Styles/Styles";
import { modernCss, renderLegacyCss, renderStorybookCss } from "./GenerateCss";
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

  const [activeSection, setActiveSection] = useState<
    "preview" | "css" | "legacy-css" | "storybook-css"
  >("preview");

  const [demoTheme, setDemoTheme] = useState<"light" | "dark">("light");

  const groupKeys = useMemo(() => Object.keys(stylesConfig), [stylesConfig]);
  const [activeGroup, setActiveGroup] = useState<string>(groupKeys[0] || "");

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

  const activeProperties = stylesConfig[activeGroup]?.properties || {};
  const ActiveExample = stylesConfig[activeGroup]?.example;

  return (
    <PageStyled className="sb-unstyled">
      <CardStyled>
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
            variant={activeSection === "css" ? "solid" : "outline"}
            onClick={() => setActiveSection("css")}
            size="small"
          >
            CSS
          </Button>
          <Button
            variant={activeSection === "legacy-css" ? "solid" : "outline"}
            onClick={() => setActiveSection("legacy-css")}
            size="small"
          >
            Legacy CSS
          </Button>
          <Button
            variant={activeSection === "storybook-css" ? "solid" : "outline"}
            onClick={() => setActiveSection("storybook-css")}
            size="small"
          >
            Storybook Css
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

        {/* 
          FIX: Compute strings directly inside individual layout nodes on-the-fly.
          If the tab isn't open, the string generator function never executes.
        */}
        {activeSection === "preview" && ActiveExample && (
          <RenderDemo theme={demoTheme} generatedCss={modernCss(stylesConfig)}>
            <ActiveExample />
          </RenderDemo>
        )}

        {activeSection === "css" && (
          <>
            <p>
              You can use this code directly in a live project, or within this
              project by overwriting{" "}
              <strong>/src/lib/styles/loading.css</strong>. If you want to see
              these styles live in storybook you will also have to update
              storybook css. See 'Storybook CSS' button above.
            </p>
            <RenderCode colorCss={modernCss(stylesConfig)} />
          </>
        )}

        {activeSection === "legacy-css" && (
          <>
            <p>
              This is for older browsers that do not support light-dark css,
              released 2024.
            </p>
            <p>
              You can use this code directly in a live project, or within this
              project by overwriting{" "}
              <strong>/src/lib/styles/loading.css</strong>. If you want to see
              these styles live in storybook you will also have to update
              storybook css. See 'Storybook CSS' button above.
            </p>
            <RenderCode colorCss={renderLegacyCss(stylesConfig)} />
          </>
        )}

        {activeSection === "storybook-css" && (
          <>
            <p>
              If you want to update the storybook site styles to need to
              overwrite <strong>/src/lib/styles/storybook-loading.css</strong>.
            </p>
            <RenderCode colorCss={renderStorybookCss(stylesConfig)} />
          </>
        )}
      </CardStyled>
    </PageStyled>
  );
}
