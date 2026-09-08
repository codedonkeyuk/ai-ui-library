import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-runtime";

export default function ThemeSwitcher(): JSX.Element {
  const [mainColor, setMainColor] = useState("");

  useEffect(() => {
    // Get the computed style of the body or a specific element
    const style = getComputedStyle(document.body);
    const color = style.getPropertyValue("--main-bg-color").trim();
    setMainColor(color);
  }, []);
  return <>Main COlor:{mainColor}</>;
}
