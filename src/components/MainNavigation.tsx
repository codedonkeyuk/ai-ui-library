import { useState } from "react";
import { NavLink } from "react-router";
import type { JSX } from "react/jsx-runtime";
import { styled } from "styled-components";

const BREAKPOINT = "768px";

const MainNavStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #ffffff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

const UlStyled = styled.ul<{ $main?: boolean; $isOpen?: boolean }>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 769px) {
    ${(props) =>
      props.$main &&
      `
      flex-direction: row;
      gap: 2rem;
    `}
  }

  ${(props) =>
    !props.$main &&
    `
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    min-width: 150px;
    border-radius: 4px;
    display: none;
    z-index: 10;
  `}

  @media (max-width: ${BREAKPOINT}) {
    ${(props) =>
      props.$main &&
      `
      display: ${props.$isOpen ? "flex" : "none"};
      flex-direction: column;
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ffffff;
      padding: 2rem;
      z-index: 99;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      gap: 0.5rem;
    `}
  }
`;

const LiStyled = styled.li`
  position: relative;
  margin: 0;

  @media (min-width: 769px) {
    &:hover > ${UlStyled}, &:focus-within > ${UlStyled} {
      display: flex;
    }
  }

  @media (max-width: ${BREAKPOINT}) {
    width: 100%;

    > ${UlStyled} {
      position: static;
      display: flex;
      box-shadow: none;
      padding: 0.5rem 0 0 1rem;
      border-left: 2px solid #eeeeee;
    }
  }
`;

const LinkStyled = styled(NavLink)`
  text-decoration: none;
  color: #333333;
  font-weight: 500;
  font-size: 1rem;
  display: inline-block;
  position: relative;
  transition: color 0.2s ease-in-out;
  border-radius: 4px;
  padding: 0.25rem 0;

  &:hover {
    color: #0066cc;
  }

  &:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 4px;
  }

  &.active {
    color: #0066cc;
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #0066cc;
      border-radius: 2px;
    }
  }

  @media (max-width: ${BREAKPOINT}) {
    font-size: 1.2rem;
    width: 100%;

    &.active::after {
      bottom: 0;
      left: -1rem;
      width: 3px;
      height: 100%;
    }
  }
`;

const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 100;
  border-radius: 4px;

  &:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 4px;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: #333333;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${(props) => (props.$isOpen ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      opacity: ${(props) => (props.$isOpen ? "0" : "1")};
      transform: ${(props) => (props.$isOpen ? "translateX(20px)" : "translateX(0)")};
    }

    &:nth-child(3) {
      transform: ${(props) => (props.$isOpen ? "rotate(-45deg)" : "rotate(0)")};
    }
  }

  @media (max-width: ${BREAKPOINT}) {
    display: flex;
  }
`;

export interface NavigationLink {
  to: string;
  name: string;
  sublinks?: NavigationLink[];
}

interface RenderLinksProps {
  links: NavigationLink[];
  main?: boolean;
  isOpen?: boolean;
  onLinkClick?: () => void;
}

const RenderLinks = ({
  links,
  main = false,
  isOpen = false,
  onLinkClick,
}: RenderLinksProps): JSX.Element => (
  <UlStyled
    $main={main}
    $isOpen={isOpen}
    id={main ? "main-nav-list" : undefined}
  >
    {links.map(({ to, name, sublinks }, index) => (
      <LiStyled key={`${to}-${index}`}>
        <LinkStyled to={to} end={to === "/"} onClick={onLinkClick}>
          {name}
        </LinkStyled>
        {sublinks != null && (
          <RenderLinks links={sublinks} onLinkClick={onLinkClick} />
        )}
      </LiStyled>
    ))}
  </UlStyled>
);

interface Props {
  links: NavigationLink[];
}

export default function MainNavigation({ links }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <MainNavStyled aria-label="Main Navigation">
      <HamburgerButton
        $isOpen={isOpen}
        onClick={toggleMenu}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={isOpen}
        aria-controls="main-nav-list"
      >
        <div />
        <div />
        <div />
      </HamburgerButton>

      <RenderLinks
        links={links}
        main={true}
        isOpen={isOpen}
        onLinkClick={closeMenu}
      />
    </MainNavStyled>
  );
}
