import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Tabs from "./Tabs";
import { MemoryRouter } from "react-router";

describe("Tabs Component", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic String Switching (No Router)", () => {
    const mockStringTabs = [
      { id: "home", label: "Home View" },
      { id: "profile", label: "Profile Settings" },
    ];

    it("should render clean, unique HTML IDs using the raw strings", () => {
      render(
        <Tabs tabs={mockStringTabs} activeTabId="home" onTabChange={() => {}}>
          <div>Home Content</div>
        </Tabs>,
      );

      const homeTab = screen.getByRole("tab", { name: "Home View" });
      const profileTab = screen.getByRole("tab", { name: "Profile Settings" });

      assert.strictEqual(homeTab.id, "tab-home");
      assert.strictEqual(profileTab.id, "tab-profile");
    });

    it("should link all tab controls to the single active string-based panel ID", () => {
      render(
        <Tabs tabs={mockStringTabs} activeTabId="home" onTabChange={() => {}}>
          <div>Home Content</div>
        </Tabs>,
      );

      const homeTab = screen.getByRole("tab", { name: "Home View" });
      const profileTab = screen.getByRole("tab", { name: "Profile Settings" });
      const panel = screen.getByRole("tabpanel");

      assert.strictEqual(panel.id, "panel-home");
      assert.strictEqual(homeTab.getAttribute("aria-controls"), "panel-home");
      assert.strictEqual(
        profileTab.getAttribute("aria-controls"),
        "panel-home",
      );
    });

    it("should return the exact string ID to the callback listener on click", () => {
      let capturedId = "";
      render(
        <Tabs
          tabs={mockStringTabs}
          activeTabId="home"
          onTabChange={(id) => {
            capturedId = id;
          }}
        >
          <div>Home Content</div>
        </Tabs>,
      );

      const profileTab = screen.getByRole("tab", { name: "Profile Settings" });
      fireEvent.click(profileTab);

      assert.strictEqual(capturedId, "profile");
    });

    it("should apply correct tabIndex behavior for string states", () => {
      render(
        <Tabs tabs={mockStringTabs} activeTabId="home" onTabChange={() => {}}>
          <div>Home Content</div>
        </Tabs>,
      );

      const homeTab = screen.getByRole("tab", { name: "Home View" });
      const profileTab = screen.getByRole("tab", { name: "Profile Settings" });

      assert.strictEqual(homeTab.getAttribute("tabindex"), "0");
      assert.strictEqual(profileTab.getAttribute("tabindex"), "-1");
    });
  });

  describe("Router Integration (URL Path IDs)", () => {
    const mockRouterTabs = [
      { id: "/dashboard", label: "Dashboard" },
      { id: "/user/settings", label: "Settings" },
    ];

    it("should strip URL slashes out of the HTML elements to keep IDs valid", () => {
      render(
        <MemoryRouter>
          <Tabs
            tabs={mockRouterTabs}
            activeTabId="/dashboard"
            onTabChange={() => {}}
          >
            <div>Dashboard Content</div>
          </Tabs>
        </MemoryRouter>,
      );

      const dashboardTab = screen.getByRole("tab", { name: "Dashboard" });
      const settingsTab = screen.getByRole("tab", { name: "Settings" });

      assert.strictEqual(dashboardTab.id, "tab-dashboard");
      assert.strictEqual(settingsTab.id, "tab-user-settings");
    });

    it("should safely evaluate route structures down to the active panel route ID", () => {
      render(
        <MemoryRouter>
          <Tabs
            tabs={mockRouterTabs}
            activeTabId="/dashboard"
            onTabChange={() => {}}
          >
            <div>Dashboard Content</div>
          </Tabs>
        </MemoryRouter>,
      );

      const dashboardTab = screen.getByRole("tab", { name: "Dashboard" });
      const settingsTab = screen.getByRole("tab", { name: "Settings" });
      const panel = screen.getByRole("tabpanel");

      assert.strictEqual(panel.id, "panel-dashboard");
      assert.strictEqual(
        dashboardTab.getAttribute("aria-controls"),
        "panel-dashboard",
      );
      assert.strictEqual(
        settingsTab.getAttribute("aria-controls"),
        "panel-dashboard",
      );
    });

    it("should still output the unmodified raw router path string to onTabChange", () => {
      let capturedRoute = "";
      render(
        <MemoryRouter>
          <Tabs
            tabs={mockRouterTabs}
            activeTabId="/dashboard"
            onTabChange={(id) => {
              capturedRoute = id;
            }}
          >
            <div>Dashboard Content</div>
          </Tabs>
        </MemoryRouter>,
      );

      const settingsTab = screen.getByRole("tab", { name: "Settings" });
      fireEvent.click(settingsTab);

      assert.strictEqual(capturedRoute, "/user/settings");
    });
  });
});
