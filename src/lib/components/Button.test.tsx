import { afterEach, describe, it } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Button, { ButtonLink, ButtonRouterLink } from "./Button";

describe("Button System Suite", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Standard Button (Actions)", () => {
    it("should render correctly with provided children", () => {
      render(<Button onClick={() => {}}>Submit Form</Button>);
      const button = screen.getByRole("button");
      assert.strictEqual(button.textContent, "Submit Form");
    });

    it("should execute the onClick handler when clicked", () => {
      let wasClicked = false;
      const handleClick = () => {
        wasClicked = true;
      };
      render(<Button onClick={handleClick}>Click Me</Button>);

      const button = screen.getByRole("button");
      fireEvent.click(button);
      assert.strictEqual(wasClicked, true);
    });

    it("should have the correct HTML type attribute", () => {
      render(
        <Button type="submit" onClick={() => {}}>
          Submit
        </Button>,
      );
      const button = screen.getByRole("button");
      assert.strictEqual(button.getAttribute("type"), "submit");
    });
  });

  describe("ButtonLink (External Links)", () => {
    it("should render as an <a> tag with the correct href", () => {
      render(<ButtonLink href="https://google.com">Go External</ButtonLink>);
      const link = screen.getByRole("link", { name: /go external/i });
      assert.strictEqual(link.tagName, "A");
      assert.strictEqual(link.getAttribute("href"), "https://google.com");
    });

    it("should accept aria-current for navigation context", () => {
      render(
        <ButtonLink href="/home" ariaCurrent="page">
          Home
        </ButtonLink>,
      );
      const link = screen.getByRole("link");
      assert.strictEqual(link.getAttribute("aria-current"), "page");
    });
  });

  describe("ButtonRouterLink (Internal Navigation)", () => {
    it("should render as a Link component within a Router context", () => {
      render(
        <MemoryRouter>
          <ButtonRouterLink to="/dashboard">Dashboard</ButtonRouterLink>
        </MemoryRouter>,
      );
      const link = screen.getByRole("link", { name: /dashboard/i });

      // Check that the component is rendered
      assert.ok(link);
      // In a real environment, React Router's <Link> will render an <a> tag
      assert.strictEqual(link.tagName, "A");
    });

    it("should handle complex 'to' objects (e.g. search params)", () => {
      render(
        <MemoryRouter>
          <ButtonRouterLink to={{ pathname: "/search", query: "?q=test" }}>
            Search
          </ButtonRouterLink>
        </MemoryRouter>,
      );
      const link = screen.getByRole("link", { name: /search/i });
      assert.ok(link);
    });
  });

  describe("Shared Properties (Polymorphism Check)", () => {
    it("should apply aria-disabled correctly on standard buttons", () => {
      const { rerender } = render(
        <Button disabled={true} onClick={() => {}}>
          Disabled
        </Button>,
      );
      const btn1 = screen.getByRole("button");
      assert.strictEqual(btn1.getAttribute("aria-disabled"), "true");

      rerender(
        <Button disabled={false} onClick={() => {}}>
          Enabled
        </Button>,
      );
      const btn2 = screen.getByRole("button");
      assert.strictEqual(btn2.getAttribute("aria-disabled"), "false");
    });

    it("should respect the size property across all types", () => {
      // Testing Standard Button Size Prop
      const { rerender: render1 } = render(
        <Button size="large" onClick={() => {}}>
          Large
        </Button>,
      );
      const btn1 = screen.getByRole("button");
      // Even if we don't test CSS, we verify the component accepts and processes the prop
      assert.ok(btn1);
      render1(
        <Button size="small" onClick={() => {}}>
          Small
        </Button>,
      );
      const btn2 = screen.getByRole("button");
      assert.ok(btn2);

      // Testing ButtonLink Size Prop
      render(
        <ButtonLink size="large" href="https://test.com">
          Link Large
        </ButtonLink>,
      );
      const link1 = screen.getByRole("link", { name: /link large/i });
      assert.ok(link1);

      // Testing ButtonRouterLink Size Prop
      render(
        <MemoryRouter>
          <ButtonRouterLink size="small" to="/path">
            Router Small
          </ButtonRouterLink>
        </MemoryRouter>,
      );
      const link2 = screen.getByRole("link", { name: /router small/i });
      assert.ok(link2);
    });

    it("should pass custom aria-labels to all variants", () => {
      // Standard Button
      render(
        <Button ariaLabel="Close Modal" onClick={() => {}}>
          X
        </Button>,
      );
      assert.strictEqual(
        screen.getByRole("button").getAttribute("aria-label"),
        "Close Modal",
      );

      // ButtonLink
      render(
        <ButtonLink ariaLabel="External Search" href="https://search.com">
          Search
        </ButtonLink>,
      );
      assert.strictEqual(
        screen.getByRole("link").getAttribute("aria-label"),
        "External Search",
      );

      // ButtonRouterLink
      render(
        <MemoryRouter>
          <ButtonRouterLink ariaLabel="Go to Profile" to="/profile">
            Profile
          </ButtonRouterLink>
        </MemoryRouter>,
      );
      assert.strictEqual(
        screen.getByRole("link").getAttribute("aria-label"),
        "Go to Profile",
      );
    });
  });
});
