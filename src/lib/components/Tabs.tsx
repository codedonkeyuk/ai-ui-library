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
  display: flex;
  gap: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  justify-content: center;
`;

const Tab = styled.button<{ $isActive?: boolean }>`
  padding: 8px 16px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 8px;
  color: #6c757d;

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  &:hover {
    background-color: #e9ecef;
    color: #000;
  }

  ${(props) =>
    props.$isActive &&
    `
    color: #007bff;
    background-color: #e7f1ff;
    border: 1px solid #007bff;
  `}
`;

const TabContent = styled.div`
  padding: 20px;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
