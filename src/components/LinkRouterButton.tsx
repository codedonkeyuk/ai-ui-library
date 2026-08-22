import type {
  RefAttributes,
  CSSProperties,
  ForwardRefExoticComponent,
  Component,
} from "react";
import { Link, type LinkProps } from "react-router";
import sc from "styled-components";
import type {
  IStyledComponentBase,
  CSSPropertiesWithVars,
} from "styled-components/dist/types";

const styled = (sc as any).default || sc;

const RouterLinkButton: IStyledComponentBase<
  "web",
  Omit<LinkProps & RefAttributes<HTMLAnchorElement>, "style"> & {
    style?: CSSProperties | CSSPropertiesWithVars | undefined;
  }
> &
  string &
  Omit<
    ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>,
    keyof Component<any, {}, any>
  > = styled(Link).attrs({
  className: "btn",
})``;

export default RouterLinkButton;
