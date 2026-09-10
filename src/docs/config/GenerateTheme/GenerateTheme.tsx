import type { JSX } from "react/jsx-runtime";
import { Form, SyntaxHighlighter } from "storybook/internal/components";
import { useEffect, useState, useMemo } from "react";
import React from "react";
import type { ColorConfigGroup, ThemeVariants } from "./Types";
import { DefaultStyles } from "./BasicPallete";
import { modernCss } from "./GenerateCss";
import { GlobalStyle, Pills } from "../../../lib";
import styled from "styled-components";
import type { Pill } from "../../../lib/components/Pills";

const PropertyStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const PageStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
  color-scheme: light !important;
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
      <PropertyStyle>
        <center>
          <h3>--{cssKey}</h3>
        </center>

        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ flex: 1 }}>
            <label
              htmlFor={`${cssKey}-light`}
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "var(--main-fg-color)",
              }}
            >
              Light
            </label>
            <Form.Input
              id={`${cssKey}-light`}
              type="text"
              value={variants.light}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(cssKey, "light", e.target.value)
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              htmlFor={`${cssKey}-dark`}
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "var(--main-fg-color)",
              }}
            >
              Light
            </label>
            <Form.Input
              id={`${cssKey}-dark`}
              type="text"
              value={variants.dark}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(cssKey, "dark", e.target.value)
              }
            />
          </div>
        </div>
      </PropertyStyle>
    );
  },
);

ConfigRow.displayName = "ConfigRow";

export default function GenerateTheme(): JSX.Element {
  const [stylesConfig, setStylesConfig] =
    useState<ColorConfigGroup>(DefaultStyles);

  // State tracking whether the user is viewing the "preview" or "code" section
  const [activeSection, setActiveSection] = useState<"preview" | "code">(
    "preview",
  );

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

  // Memoized pill configuration options for switching sections
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

  const handlePillChange = React.useCallback((id: string | number) => {
    setActiveGroup(String(id));
  }, []);

  // Callback to execute view section swapping updates
  const handleSectionChange = React.useCallback((id: string | number) => {
    setActiveSection(id as "preview" | "code");
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
          {/* Conditional rendering depending on your active selection pill */}
          {activeSection === "preview" && (
            <>
              {ActiveExample && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "12px",
                    border: "1px dashed #ccc",
                  }}
                >
                  <ActiveExample />
                </div>
              )}
            </>
          )}

          {activeSection === "code" && (
            <>
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
          )}
        </CardStyled>
      </PageStyled>
    </>
  );
}
