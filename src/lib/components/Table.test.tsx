import test, { afterEach, describe } from "node:test";
import assert from "node:assert";
import { cleanup, render, screen } from "@testing-library/react";
import Table, { type HeaderCell, type DataCell } from "./Table";

describe("Table Component - Native Node Tests", () => {
  afterEach(() => {
    cleanup();
  });
  const mockThead: HeaderCell[][] = [
    [
      { data: "Product", type: "header" },
      { data: "Price", type: "header" },
    ],
  ];

  const mockData: DataCell[][] = [
    [
      { data: "Widget A", type: "header" },
      { data: "$10.00", type: "data" },
    ],
    [
      { data: "Widget B", type: "data" },
      { data: "$20.00", type: "data" },
    ],
  ];

  const mockTfoot: DataCell[][] = [
    [
      { data: "Total", type: "header" },
      { data: "$30.00", type: "data" },
    ],
  ];

  test("renders all main table structural sections cleanly", () => {
    render(
      <Table thead={mockThead} data={mockData} tfoot={mockTfoot} id="1" />,
    );

    const table = screen.getByRole("table");
    assert.ok(table, "Table element should exist in the DOM");
  });

  test("correctly applies scope properties to explicit headers", () => {
    render(
      <Table thead={mockThead} data={mockData} tfoot={mockTfoot} id="2" />,
    );

    // 1. Column headers in thead
    const colHeader = screen.getByRole("columnheader", { name: "Product" });
    assert.ok(colHeader);
    assert.strictEqual(colHeader.getAttribute("scope"), "col");

    // 2. Dynamic row headers inside tbody
    const rowHeaderBody = screen.getByRole("rowheader", { name: "Widget A" });
    assert.ok(rowHeaderBody);
    assert.strictEqual(rowHeaderBody.getAttribute("scope"), "row");

    // 3. Dynamic row headers inside tfoot
    const rowHeaderFoot = screen.getByRole("rowheader", { name: "Total" });
    assert.ok(rowHeaderFoot);
    assert.strictEqual(rowHeaderFoot.getAttribute("scope"), "row");
  });

  test("renders normal data cells as simple grid cells", () => {
    render(<Table data={mockData} id="3" />);

    const dataCell = screen.getByRole("cell", { name: "Widget B" });
    assert.ok(dataCell);
    assert.strictEqual(dataCell.tagName.toLowerCase(), "td");
  });

  test("respects colspan and rowspan layout dimensions natively", () => {
    const spanningData: DataCell[][] = [
      [{ data: "Merged Space", type: "data", colspan: 2, rowspan: 3 }],
    ];

    render(<Table data={spanningData} id="4" />);

    const spanningCell = screen.getByRole("cell", { name: "Merged Space" });
    assert.ok(spanningCell);
    assert.strictEqual(spanningCell.getAttribute("colspan"), "2");
    assert.strictEqual(spanningCell.getAttribute("rowspan"), "3");
  });

  test("provides keyboard focus accessibility properties on the outer container wrapper", () => {
    render(<Table data={mockData} id="5" />);

    const scrollContainer = screen.getByRole("region", {
      name: "Data Table Scroll Container",
    });
    assert.ok(scrollContainer);
    assert.strictEqual(scrollContainer.getAttribute("tabindex"), "0");
  });
});
