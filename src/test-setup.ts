import { GlobalRegistrator } from "@happy-dom/global-registrator";
import module from "node:module";
import styledComponents from "styled-components";

GlobalRegistrator.register();

if (typeof (styledComponents as any).default === "function") {
  Object.assign(styledComponents, (styledComponents as any).default);
}

const cssStub = "data:text/javascript,export default {};";

module.registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.endsWith(".css")) {
      return {
        shortCircuit: true,
        url: cssStub,
      };
    }
    return nextResolve(specifier, context);
  },
});
