import type {
  RefAttributes,
  CSSProperties,
  ForwardRefExoticComponent,
  Component,
} from "react";
import { Link, type LinkProps } from "react-router";
import styled from "styled-components";
import type {
  IStyledComponentBase,
  CSSPropertiesWithVars,
} from "styled-components/dist/types";

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
