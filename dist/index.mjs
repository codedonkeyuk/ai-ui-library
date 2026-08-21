import { jsx } from "react/jsx-runtime";
import styled from "styled-components";
//#region src/components/Loading.tsx
function Loading() {
  return /* @__PURE__ */ jsx("div", {
    className: "spinner-container",
    children: /* @__PURE__ */ jsx("div", {
      className: "loading-spinner",
      role: "status",
      "aria-label": "Loading",
    }),
  });
}
//#endregion
//#region src/components/ButtonBar.tsx
const ButtonBarDiv = styled.div`
  display: flex;
  width: 100%;

  justify-content: ${(props) => {
    if (props.$position === "start") return "flex-start";
    if (props.$position === "end") return "flex-end";
    return props.$position;
  }};
`;
function ButtonBar({ children, position = "end" }) {
  return /* @__PURE__ */ jsx(ButtonBarDiv, {
    $position: position,
    children,
  });
}
//#endregion
export { ButtonBar, Loading };

//# sourceMappingURL=index.mjs.map
