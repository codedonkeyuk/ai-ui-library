import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tabs from "./Tabs.tsx";
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const defaultTabs = [
  { id: "home", label: "Home" },
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
  { id: "notifications", label: "Notifications" },
];

const HomeContent = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to the home dashboard.</p>
  </div>
);

const ProfileContent = () => (
  <div>
    <h2>Profile</h2>
    <p>Manage your personal information.</p>
  </div>
);

const SettingsContent = () => (
  <div>
    <h2>Settings</h2>
    <p>Adjust your account preferences.</p>
  </div>
);

const NotificationsContent = () => (
  <div>
    <h2>Notifications</h2>
    <p>View your recent alerts.</p>
  </div>
);

const RoutedTabsWrapper = ({ args }: { args: any }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTabId = location.pathname.substring(1) || "home";

  return (
    <div>
      <Tabs
        {...args}
        activeTabId={currentTabId}
        onTabChange={(id) => navigate(`/${id}`)}
      >
        <Routes>
          <Route path="home" element={<HomeContent />} />
          <Route path="profile" element={<ProfileContent />} />
          <Route path="settings" element={<SettingsContent />} />
          <Route path="notifications" element={<NotificationsContent />} />
        </Routes>
      </Tabs>
    </div>
  );
};

export const Default: Story = {
  render: (args) => {
    const [activeId, setActiveId] = React.useState(args.activeTabId);

    return (
      <Tabs
        {...args}
        activeTabId={activeId}
        onTabChange={(id) => setActiveId(id)}
      >
        {activeId === "home" && (
          <div>
            <h2>Home</h2>
            <p>Welcome to the home dashboard.</p>
          </div>
        )}
        {activeId === "profile" && (
          <div>
            <h2>Profile</h2>
            <p>Manage your personal information.</p>
          </div>
        )}
        {activeId === "settings" && (
          <div>
            <h2>Settings</h2>
            <p>Adjust your account preferences.</p>
          </div>
        )}
        {activeId === "notifications" && (
          <div>
            <h2>Notifications</h2>
            <p>View your recent alerts.</p>
          </div>
        )}
      </Tabs>
    );
  },
  args: {
    tabs: defaultTabs,
    activeTabId: "home",
  },
  parameters: {
    docs: {
      source: {
        language: "tsx",
        code: `
import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Tabs from "./Tabs";

const TABS_CONFIG = [
  { id: "home", label: "Home" },
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the tab ID from the path (e.g., "/home" -> "home")
  const currentTabId = location.pathname.split("/").pop() || "home";

  return (
    <BrowserRouter>
      <Tabs
        tabs={TABS_CONFIG}
        activeTabId={currentTabId}
        onTabChange={(id) => navigate(\`/\${id}\`)}
      >
        <Routes>
          <Route path="home" element={<div>Home Content</div>} />
          <Route path="profile" element={<div>Profile Content</div>} />
          <Route path="settings" element={<div>Settings Content</div>} />
        </Routes>
      </tabs>
    </BrowserRouter>
  );
}

export default App;
        `.trim(),
      },
    },
  },
};

export const Navigation: Story = {
  render: (args) => (
    <MemoryRouter initialEntries={["/home"]}>
      <RoutedTabsWrapper args={args} />
    </MemoryRouter>
  ),
  args: {
    tabs: defaultTabs,
  },
  parameters: {
    docs: {
      source: {
        language: "tsx",
        code: `
import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Tabs from "./Tabs";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },
    { id: "settings", label: "Settings" },
  ];

  const currentTab = location.pathname.substring(1) || "home";

  return (
    <BrowserRouter>
      <Tabs 
        tabs={tabs} 
        activeTabId={currentTab} 
        onTabChange={(id) => navigate(\`/\${id}\`)} 
      />
      <Routes>
        <Route path="home" element={<div>Home Content</div>} />
        <Route path="profile" element={<div>Profile Content</div>} />
        <Route path="settings" element={<div>Settings Content</div>} />
      </Routes>
    </BrowserRouter>
  );
}
        `.trim(),
      },
    },
  },
};
