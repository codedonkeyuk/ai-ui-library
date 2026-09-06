import React, { type ComponentPropsWithoutRef, type JSX } from "react";
import { Link } from "react-router";
import styled from "styled-components";

type AriaCurrentTypes = "page" | "location" | "date";

interface StyledButtonProps {
  $primary?: boolean;
  $disabled?: boolean;
  $size?: "small" | "medium" | "large";
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => (props.$primary ? "#007bff" : "#ccc")};
  color: ${(props) => (props.$primary ? "white" : "black")};
  border: none;
  padding: ${(props) => {
    switch (props.$size) {
      case "small":
        return "5px 10px";
      case "large":
        return "15px 30px";
      default:
        return "10px 20px";
    }
  }};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${(props) => {
    switch (props.$size) {
      case "small":
        return "14px";
      case "large":
        return "18px";
      default:
        return "16px";
    }
  }};
  margin: 4px 2px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  border-radius: 5px;
  opacity: ${(props) => (props.$disabled ? "0.6" : "1")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$primary ? "#0056b3" : "#999")};
  }
`;

interface Props {
  primary?: boolean;
  size?: "small" | "medium" | "large";
  ariaLabel?: string;
}

interface ButtonProps extends Props, ComponentPropsWithoutRef<"button"> {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  primary = false,
  disabled = false,
  size = "medium",
  type = "button",
  ariaLabel,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <StyledButton
      type={type}
      $primary={primary} // Pass as transient prop
      $disabled={disabled} // Pass as transient prop
      $size={size} // Pass as transient prop
      disabled={disabled} // Standard HTML prop (keep this)
      aria-label={ariaLabel}
      aria-disabled={disabled ? "true" : "false"}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

interface LinkProps extends Props, ComponentPropsWithoutRef<"a"> {
  href: string;
  ariaCurrent?: AriaCurrentTypes;
}

export function ButtonLink({
  href,
  children,
  primary = false,
  size = "medium",
  ariaLabel,
  ariaCurrent,
  ...props
}: LinkProps): JSX.Element {
  return (
    <StyledButton
      as="a"
      href={href}
      $primary={primary}
      $size={size}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

interface RouterLinkProps extends Props {
  to: string | object;
  ariaCurrent?: AriaCurrentTypes;
  children: React.ReactNode;
}

export function ButtonRouterLink({
  to,
  children,
  primary = false,
  size = "medium",
  ariaLabel,
  ariaCurrent,
  ...props
}: RouterLinkProps): JSX.Element {
  return (
    <StyledButton
      as={Link}
      to={to}
      $primary={primary}
      $size={size}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
