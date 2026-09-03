import { GlobalRegistrator } from "@happy-dom/global-registrator";
import module from "node:module";
import styledComponents from "styled-components";

GlobalRegistrator.register();

if (typeof (styledComponents as any).default === "function") {
  Object.assign(styledComponents, (styledComponents as any).default);
}

module.registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.includes(".css")) {
      return {
        shortCircuit: true,
        format: "module",
        url: "data:text/javascript,export default '';",
      };
    }
    return nextResolve(specifier, context);
  },
});
