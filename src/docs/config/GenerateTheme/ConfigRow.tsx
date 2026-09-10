import type { JSX } from "react/jsx-runtime";
import { Form } from "storybook/internal/components";
import type { ThemeVariants } from "./Types";
import styled from "styled-components";
import React from "react";

const PropertyStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

interface Props {
  cssKey: string;
  variants: ThemeVariants;
  onChange: (cssKey: string, mode: "light" | "dark", value: string) => void;
}

export const ConfigRow: React.MemoExoticComponent<
  ({ cssKey, variants, onChange }: Props) => JSX.Element
> = React.memo(({ cssKey, variants, onChange }: Props) => {
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
            Dark
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
});
