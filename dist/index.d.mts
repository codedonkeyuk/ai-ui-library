import { JSX } from "react/jsx-runtime";
import { LinkProps } from "react-router";
import React, { CSSProperties, Component, ComponentPropsWithoutRef, ErrorInfo, ForwardRefExoticComponent, JSX as JSX$1, ReactNode, RefAttributes } from "react";
import { CSSPropertiesWithVars, IStyledComponentBase } from "styled-components/dist/types";
//#region src/components/Loading.d.ts
/** Renders a accessible loading div. Necessary for dynamic import react suspend logic*/
declare function Loading(): JSX.Element;
//#endregion
//#region src/components/LinkRouterButton.d.ts
declare const RouterLinkButton: IStyledComponentBase<"web", Omit<LinkProps & RefAttributes<HTMLAnchorElement>, "style"> & {
  style?: CSSProperties | CSSPropertiesWithVars | undefined;
}> & string & Omit<ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>, keyof Component<any, {}, any>>;
//#endregion
//#region src/components/Toast.d.ts
type ToastVariant = "success" | "warning" | "error" | "info";
interface ToastOptions {
  id?: string;
  variant?: ToastVariant;
  message: string;
  duration?: number;
}
interface ToastProps extends ToastOptions {
  /** Show the toast */
  isVisible: boolean;
  /** Do something on close. Its up to you to make isVisible false */
  onClose?: () => void;
}
/** Toast warning for all situations */
declare const Toast: ({ isVisible, message, variant, duration, onClose }: ToastProps) => JSX$1.Element | null;
//#endregion
//#region src/components/ToastProvider.d.ts
interface ToastContextType {
  show: (options: ToastOptions) => void;
}
/** Provider used to show and destroy toasts fired within the application. */
declare const ToastProvider: React.FC<{
  children: React.ReactNode;
}>;
declare const useToast: () => ToastContextType;
//#endregion
//#region src/components/ErrorBoundary.d.ts
interface Props$5 {
  /** The content to be rendered if error is not thrown. */
  children: ReactNode;
}
interface State {
  error: Error | null;
}
/**
 * ErrorBoundary to catch react errors in a clean way
 */
declare class ErrorBoundary extends Component<Props$5, State> {
  state: State;
  static getDerivedStateFromError(error: Error): State;
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
  render(): ReactNode;
}
//#endregion
//#region src/components/ErrorTemplates.d.ts
interface Props$4 {
  error: Error;
}
declare const ErrorPage: React.FC<Props$4>;
declare const handleJsError: (error: Error, target: HTMLElement) => void;
//#endregion
//#region src/components/Input.d.ts
interface Props$3 extends ComponentPropsWithoutRef<"input"> {
  /** The label text for the input field */
  label: string;
  /** The message that should be show if an error occurs */
  warningMessage?: string;
}
/**
 * Input component is a accessible input field that can show various states.
 * It should be be used for any singualar input item a textfield, datefield for example.
 * Multiple inputs like checkboxes or radio buttons should be use InputCheckboxGroup or InputRadioGroup respectivley.
 */
declare function Input({ id, label, name, type, warningMessage, ...inputProps }: Props$3): JSX.Element;
//#endregion
//#region src/components/InputCheckboxGroup.d.ts
type Checkbox = {
  id: string;
  label: string;
  selected: boolean;
};
interface Props$2 {
  /** The name of the group of fields. Legen belonging to the wrapping fieldset. */
  legend: string;
  /** The array of checkboxes from which the group is rendered */
  checkboxes: Checkbox[];
  /** When a checkbox is selected this function will retrun the id and new state. Its upto you to update the checkboxes array*/
  checkboxSelected: (id: string, selected: boolean) => void;
}
/** Renders a Fieldset containing multiple checkboxes */
declare function InputCheckboxGroup({ legend, checkboxes, checkboxSelected }: Props$2): JSX.Element;
//#endregion
//#region src/components/InputRadioGroup.d.ts
type Radio = {
  id: string;
  label: string;
  selected: boolean;
};
interface Props$1 {
  /** Name of the group of fildes, becomes the fieldsets legend */
  legend: string;
  /** The array of radios which are rendered, min which state is kept */
  radios: Radio[];
  /** Is triggered when a radio is selected, you must update the state using the recieved id */
  radioSelected: (id: string) => void;
}
/** Renders a Fieldset containing multiple radio buttons */
declare function InputRadioGroup({ legend, radios, radioSelected }: Props$1): JSX.Element;
//#endregion
//#region src/components/MainNavigation.d.ts
interface NavigationLink {
  to: string;
  name: string;
  sublinks?: NavigationLink[];
}
interface Props {
  /** Nesed array representing the links for the menu. Level one shows on tool bar. AQll other levels are grouped popovers */
  links: NavigationLink[];
}
/**
 * Main navigation for use on a website, which should be added ot a page header. Its been designed to be responsive and respect every platform. So it renders the menu options on a desktop and hamburger on a mobile device.
 */
declare function MainNavigation({ links }: Props): JSX.Element;
//#endregion
//#region src/styles/global/GlobalStyle.d.ts
declare const GlobalStyle: React.ComponentType;
//#endregion
export { ErrorBoundary, ErrorPage, GlobalStyle, Input, InputCheckboxGroup, InputRadioGroup, RouterLinkButton as LinkRouterButton, Loading, MainNavigation, Toast, ToastProvider, handleJsError, useToast };
//# sourceMappingURL=index.d.mts.map