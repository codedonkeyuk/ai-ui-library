import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import MainNavigation from "./MainNavigation";

afterEach(() => {
  cleanup();
});

const links = [
  {
    to: "/",
    name: "Home",
  },
  {
    to: "/about",
    name: "About",
  },
  {
    to: "/products",
    name: "Products",
    sublinks: [
      {
        to: "/products/widgets",
        name: "Widgets",
      },
      {
        to: "/products/gadgets",
        name: "Gadgets",
      },
    ],
  },
];

function renderNavigation(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <MainNavigation links={links} />
    </MemoryRouter>,
  );
}

test("renders the navigation and links", () => {
  renderNavigation();

  assert.ok(
    screen.getByRole("navigation", {
      name: "Main Navigation",
    }),
  );

  assert.ok(screen.getByRole("link", { name: "Home" }));
  assert.ok(screen.getByRole("link", { name: "About" }));
  assert.ok(screen.getByRole("link", { name: "Products" }));
  assert.ok(screen.getByRole("link", { name: "Widgets" }));
  assert.ok(screen.getByRole("link", { name: "Gadgets" }));
});

test("renders links with the correct href values", () => {
  renderNavigation();

  assert.equal(
    screen.getByRole("link", { name: "Home" }).getAttribute("href"),
    "/",
  );

  assert.equal(
    screen.getByRole("link", { name: "About" }).getAttribute("href"),
    "/about",
  );

  assert.equal(
    screen.getByRole("link", { name: "Widgets" }).getAttribute("href"),
    "/products/widgets",
  );
});

test("menu is closed initially", () => {
  renderNavigation();

  const button = screen.getByRole("button", {
    name: "Open Menu",
  });

  assert.equal(button.getAttribute("aria-expanded"), "false");
  assert.equal(button.getAttribute("aria-controls"), "main-nav-list");
});

test("opens the menu when clicked", () => {
  renderNavigation();

  const button = screen.getByRole("button", {
    name: "Open Menu",
  });

  fireEvent.click(button);

  const openedButton = screen.getByRole("button", {
    name: "Close Menu",
  });

  assert.equal(openedButton.getAttribute("aria-expanded"), "true");
});

test("closes the menu when clicked again", () => {
  renderNavigation();

  fireEvent.click(
    screen.getByRole("button", {
      name: "Open Menu",
    }),
  );

  fireEvent.click(
    screen.getByRole("button", {
      name: "Close Menu",
    }),
  );

  assert.ok(
    screen.getByRole("button", {
      name: "Open Menu",
    }),
  );

  assert.equal(
    screen
      .getByRole("button", {
        name: "Open Menu",
      })
      .getAttribute("aria-expanded"),
    "false",
  );
});

test("closes the menu when a link is clicked", () => {
  renderNavigation();

  fireEvent.click(
    screen.getByRole("button", {
      name: "Open Menu",
    }),
  );

  fireEvent.click(screen.getByRole("link", { name: "About" }));

  assert.ok(
    screen.getByRole("button", {
      name: "Open Menu",
    }),
  );
});

test("marks the current route as active", () => {
  renderNavigation(["/about"]);

  const aboutLink = screen.getByRole("link", {
    name: "About",
  });

  assert.match(aboutLink.className, /\bactive\b/);

  const homeLink = screen.getByRole("link", {
    name: "Home",
  });

  assert.doesNotMatch(homeLink.className, /\bactive\b/);
});

test("uses exact matching for the home route", () => {
  renderNavigation(["/about"]);

  const homeLink = screen.getByRole("link", {
    name: "Home",
  });

  assert.doesNotMatch(homeLink.className, /\bactive\b/);
});

test("renders nested navigation links", () => {
  renderNavigation();

  assert.ok(screen.getByRole("link", { name: "Widgets" }));
  assert.ok(screen.getByRole("link", { name: "Gadgets" }));
});
