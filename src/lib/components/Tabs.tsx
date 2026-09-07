import { type JSX, type ReactNode } from "react";
import styled from "styled-components";

type TabType = {
  id: string;
  label: string;
};

interface Props {
  tabs: TabType[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  children: ReactNode;
}

const TabBar = styled.div.attrs({ role: "tablist" })`
  display: inline-flex;
  gap: 4px;
  background-color: var(--card-bg-color);
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;

  border-bottom: 1px solid var(--main-bdr-color);

  margin-bottom: -1px;
`;

const Tab = styled.button<{ $isActive?: boolean }>`
  padding: 10px 20px;
  border: none;
  background: var(--sec-btn-bg-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px 6px 0 0;
  color: var(--sec-btn-fg-color);
  position: relative;
  background-color: ${(props) => (props.$isActive ? "var(--card-bg-color)" : "var(--sec-btn-bg-color)")};
  border-bottom: 1px solid var(--main-bdr-color);
  &::after {
    content: "";
    position: absolute;
    bottom: -1px; /* This covers the 1px border of the container */
    left: 0;
    right: 0;
    height: 1px;
    background-color: inherit; /* Matches the tab's background */
  }

  &:focus {
    outline: none;
  }

  &:hover {
    color: var(--prim-btn-fg-color);
    background-color: var(--prim-btn-hvr-color);
    border-bottom: 1px solid transparent;
  }

  ${(props) =>
    props.$isActive &&
    `
      color: var(--prim-btn-fg-color);
      background-color: var(--prim-btn-hvr-color);
      border-bottom: 1px solid transparent;
      /* If the active tab has a different color, 
         ensure the pseudo-element matches it */
      &::after {
        background-color: var(--prim-btn-hvr-color);
      }
    `}
`;

const TabContent = styled.div`
  padding: 40px 20px;
  animation: fadeIn 0.4s ease-out;
  border: 1px solid var(--main-bdr-color);
  border-top: none;
  background-color: var(--card-bg-color);
`;

const getSafeId = (route: string) => {
  const clean = route.replace(/^\/|\/$/g, "").replace(/\//g, "-");
  return clean || "home";
};

export default function Tabs({
  tabs,
  activeTabId,
  onTabChange,
  children,
}: Props): JSX.Element {
  const panelId = getSafeId(activeTabId);
  return (
    <div role="region" aria-label="Content Section">
      <TabBar>
        {tabs.map((tab) => {
          const safeId = getSafeId(tab.id);
          return (
            <Tab
              key={safeId}
              onClick={() => onTabChange(tab.id)}
              $isActive={tab.id === activeTabId}
              role="tab"
              aria-selected={tab.id === activeTabId}
              aria-controls={`panel-${panelId}`}
              id={`tab-${safeId}`}
              tabIndex={tab.id === activeTabId ? 0 : -1}
            >
              {tab.label}
            </Tab>
          );
        })}
      </TabBar>

      <TabContent
        id={`panel-${panelId}`}
        role="tabpanel"
        aria-labelledby={`tab-${panelId}`}
        aria-live="polite"
      >
        {children}
      </TabContent>
    </div>
  );
}
