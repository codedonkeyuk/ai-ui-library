import type { Meta, StoryObj } from "@storybook/react";
import Table, { type HeaderCell, type DataCell } from "./Table.tsx";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

const standardThead: HeaderCell[][] = [
  [
    { data: "Product", type: "header" },
    { data: "Category", type: "header" },
    { data: "Q1 Sales", type: "header" },
    { data: "Q2 Sales", type: "header" },
  ],
];

const standardData: DataCell[][] = [
  [
    { data: "Laptop Pro", type: "data" },
    { data: "Electronics", type: "data" },
    { data: "$1,200", type: "data" },
    { data: "$1,400", type: "data" },
  ],
  [
    { data: "Desk Chair", type: "data" },
    { data: "Furniture", type: "data" },
    { data: "$250", type: "data" },
    { data: "$300", type: "data" },
  ],
];

const standardTfoot: DataCell[][] = [
  [
    { data: "Total Revenue", type: "header" },
    { data: "-", type: "data" },
    { data: "$1,450", type: "data" },
    { data: "$1,700", type: "data" },
  ],
];

const hierarchicalData: DataCell[][] = [
  [
    { data: "Engineering", type: "header" },
    { data: "DevOps", type: "header" },
    { data: "Alex Smith", type: "data" },
    { data: "$95,000", type: "data" },
  ],
  [
    { data: "Engineering", type: "header" },
    { data: "Frontend", type: "header" },
    { data: "Jane Doe", type: "data" },
    { data: "$90,000", type: "data" },
  ],
  [
    { data: "Sales", type: "header" },
    { data: "Inbound", type: "header" },
    { data: "John Doe", type: "data" },
    { data: "$75,000", type: "data" },
  ],
];

const spanningData: DataCell[][] = [
  [
    { data: "North Region", type: "header", rowspan: 2 },
    { data: "Store Alpha", type: "data" },
    { data: "$50,000", type: "data", colspan: 2 },
  ],
  [
    { data: "Store Beta", type: "data" },
    { data: "$20,000", type: "data" },
    { data: "$30,000", type: "data" },
  ],
];

export const Default: Story = {
  args: {
    thead: standardThead,
    data: standardData,
  },
};

export const StandardGrid: Story = {
  args: {
    thead: standardThead,
    data: standardData,
    tfoot: standardTfoot,
  },
};

export const HierarchicalHeaders: Story = {
  name: "Multi-Header Rows (Multiple th side-by-side)",
  args: {
    thead: [
      [
        { data: "Department", type: "header" },
        { data: "Team / Role", type: "header" },
        { data: "Employee", type: "header" },
        { data: "Salary", type: "header" },
      ],
    ],
    data: hierarchicalData,
    tfoot: [
      [
        { data: "Company Summary", type: "header" },
        { data: "All Teams", type: "header" },
        { data: "3 Active Contracts", type: "data" },
        { data: "$260,000", type: "data" },
      ],
    ],
  },
};

export const SpanningLayout: Story = {
  name: "Rowspan & Colspan Grid",
  args: {
    thead: [
      [
        { data: "Region", type: "header" },
        { data: "Branch", type: "header" },
        { data: "Q1 Performance Split", type: "header", colspan: 2 },
      ],
    ],
    data: spanningData,
  },
};
