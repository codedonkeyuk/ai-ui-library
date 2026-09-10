import Dialog from "../../../../lib/components/Dialog";
import type { ColorConfigItem } from "../Types";

const dialogStyles: ColorConfigItem = {
  properties: {
    "dialog-bg-color": {
      light: "#ffffff",
      dark: "#000000",
    },
    "dialog-fg-color": {
      light: "#000000",
      dark: "#ffffff",
    },
  },
  example: () => (
    <div className="container">
      <Dialog isOpen={true} onClose={() => {}}>
        <h2>Im a dialog</h2>
        <p>If you see me I am working</p>
      </Dialog>
    </div>
  ),
};

export default dialogStyles;
