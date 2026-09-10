import { Input } from "../../../../lib";
import type { ColorConfigItem } from "../Types";
import { Rows } from "./Common";

const textfieldStyles: ColorConfigItem = {
  properties: {
    "field-bg-color": {
      light: "#fff",
      dark: "#1a1a1a",
    },
    "field-fg-color": {
      light: "#000000",
      dark: "#ffffff",
    },
    "field-warning-color": {
      light: "#a33a3a",
      dark: "#ef4444",
    },
    "field-desc-color": {
      light: "#666",
      dark: "#a1a1aa",
    },
    "field-placeholder-color": {
      light: "#8996a3",
      dark: "#71717a",
    },
    "field-dis-bg-color": {
      light: "#f2f4f5",
      dark: "#121212",
    },
    "field-dis-fg-color": {
      light: "#7b8790",
      dark: "#52525b",
    },
  },
  example: () => (
    <div className="container">
      <Rows className="container">
        <Input type="text" required label="Im a required field" />
        <Input
          type="text"
          description="I am a description"
          label="Im a field with a description"
        />
        <Input
          type="text"
          warningMessage="I am a warning"
          label="Im a field with a warning"
        />
        <Input type="text" label="Im a text type input field" />
        <Input type="password" label="Im a password type input field" />
        <Input type="email" label="Im an email type input field" />
        <Input type="url" label="Im a URL type input field" />
        <Input type="search" label="Im a search type input field" />
        <Input type="tel" label="Im a telephone type input field" />
        <Input type="number" label="Im a number type input field" />
        <Input type="range" label="Im a range slider type input field" />
        <Input type="date" label="Im a date type input field" />
        <Input type="time" label="Im a time type input field" />
        <Input
          type="datetime-local"
          label="Im a date and time type input field"
        />
        <Input type="month" label="Im a month type input field" />
        <Input type="week" label="Im a week type input field" />
        <Input type="checkbox" label="Im a checkbox type input field" />
        <Input type="radio" label="Im a radio button type input field" />
        <Input type="color" label="Im a color picker type input field" />
        <Input type="file" label="Im a file upload type input field" />
      </Rows>
    </div>
  ),
};

export default textfieldStyles;
