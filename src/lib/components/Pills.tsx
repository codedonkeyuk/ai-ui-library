import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ $isSelected?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.$isSelected ? "blue" : "gray")};
  background-color: ${(props) => (props.$isSelected ? "blue" : "white")};
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const Container = styled.div<{
  $position: "flex-start" | "center" | "flex-end";
}>`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: ${(props) => props.$position};
`;

const pillPositionMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
} as const;

type Pill = {
  id: string | number;
  label: string;
  selected?: boolean;
};

interface Props {
  items: Pill[];
  onChange: (id: string | number) => void;
  position?: "start" | "center" | "end";
}

export default function Pills({
  items,
  onChange,
  position = "start",
}: Props): React.JSX.Element {
  return (
    <Container $position={pillPositionMap[position]}>
      {items.map((item) => (
        <StyledButton
          key={item.id}
          type="button"
          $isSelected={item.selected}
          aria-pressed={item.selected}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </StyledButton>
      ))}
    </Container>
  );
}
