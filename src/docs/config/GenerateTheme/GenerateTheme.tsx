import type { JSX } from "react/jsx-runtime";
import { useEffect, useState, useMemo } from "react";
import React from "react";
import type { ColorConfigGroup } from "./Types";
import styles from "./Styles/Styles";
import { modernCss } from "./GenerateCss";
import { GlobalStyle, Pills } from "../../../lib";
import styled from "styled-components";
import type { Pill } from "../../../lib/components/Pills";
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

export default function GenerateTheme(): JSX.Element {
  const [stylesConfig, setStylesConfig] = useState<ColorConfigGroup>(styles);

  const [activeSection, setActiveSection] = useState<"preview" | "code">(
    "preview",
  );

  const [demoTheme, setDemoTheme] = useState<"light" | "dark">("light");

  const groupKeys = useMemo(() => Object.keys(stylesConfig), [stylesConfig]);
  const [activeGroup, setActiveGroup] = useState<string>(groupKeys[0] || "");

  const [colorCss, setColorCss] = useState<string>("");

  const pillItems = useMemo(() => {
    return groupKeys.map((key) => ({
      id: key,
      label: key,
      selected: key === activeGroup,
    }));
  }, [groupKeys, activeGroup]);

  const sectionPillItems = useMemo<Pill[]>(
    () => [
      {
        id: "preview",
        label: "Preview",
        selected: activeSection === "preview",
      },
      { id: "code", label: "Code", selected: activeSection === "code" },
    ],
    [activeSection],
  );

  const themePillItems = useMemo<Pill[]>(
    () => [
      { id: "light", label: "Light Mode", selected: demoTheme === "light" },
      { id: "dark", label: "Dark Mode", selected: demoTheme === "dark" },
    ],
    [demoTheme],
  );

  const handlePillChange = React.useCallback((id: string | number) => {
    setActiveGroup(String(id));
  }, []);

  const handleSectionChange = React.useCallback((id: string | number) => {
    setActiveSection(id as "preview" | "code");
  }, []);

  const handleThemeChange = React.useCallback((id: string | number) => {
    setDemoTheme(id as "light" | "dark");
  }, []);

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
    <>
      <GlobalStyle />
      <PageStyled>
        <CardStyled>
          <h2>Select Controls</h2>
          <Pills
            items={pillItems}
            onChange={handlePillChange}
            position="center"
          />
        </CardStyled>
        <CardStyled>
          <h2>Updated Related Properties</h2>
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
          <h2>Preview</h2>
          <Pills
            items={sectionPillItems}
            onChange={handleSectionChange}
            position="center"
          />
          {activeSection === "preview" && (
            <Pills
              items={themePillItems}
              onChange={handleThemeChange}
              position="center"
            />
          )}
          {activeSection === "preview" && (
            <>
              {ActiveExample && (
                <RenderDemo theme={demoTheme} generatedCss={colorCss}>
                  <ActiveExample />
                </RenderDemo>
              )}
            </>
          )}

          {activeSection === "code" && <RenderCode colorCss={colorCss} />}
        </CardStyled>
      </PageStyled>
    </>
  );
}
