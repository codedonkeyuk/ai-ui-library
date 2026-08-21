import { JSX } from "react/jsx-runtime";
import { JSX as JSX$1, ReactNode } from "react";
//#region src/components/Loading.d.ts
declare function Loading(): JSX.Element;
//#endregion
//#region src/components/ButtonBar.d.ts
type ButtonBarPosition = "start" | "center" | "end";
interface Props {
  children: ReactNode;
  position?: ButtonBarPosition;
}
declare function ButtonBar({ children, position }: Props): JSX$1.Element;
//#endregion
export { ButtonBar, Loading };
//# sourceMappingURL=index.d.mts.map
