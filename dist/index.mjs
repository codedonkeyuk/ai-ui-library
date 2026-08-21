import { jsx } from "react/jsx-runtime";
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
export { Loading };

//# sourceMappingURL=index.mjs.map
