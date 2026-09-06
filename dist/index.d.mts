import { JSX } from "react/jsx-runtime";
import React, { Component, ComponentPropsWithoutRef, ErrorInfo, JSX as JSX$1, ReactNode } from "react";
//#region src/lib/components/Loading.d.ts
/** Renders a accessible loading div. Necessary for dynamic import react suspend logic*/
declare function Loading(): JSX.Element;
//#endregion
//#region src/lib/components/Toast.d.ts
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
//#region src/lib/components/ToastProvider.d.ts
interface ToastContextType {
  show: (options: ToastOptions) => void;
}
/** Provider used to show and destroy toasts fired within the application. */
declare const ToastProvider: React.FC<{
  children: React.ReactNode;
}>;
declare const useToast: () => ToastContextType;
//#endregion
//#region src/lib/components/ErrorBoundary.d.ts
interface Props$7 {
  children: ReactNode;
}
interface State {
  error: Error | null;
}
/**
 * @class ErrorBoundary
 * @description A React component that catches and displays errors within its children.
 */
declare class ErrorBoundary extends Component<Props$7, State> {
  state: State;
  /**
   * @static getDerivedStateFromError(error)
   * @param {Error} error - The error caught by the component.
   * @returns {State} The new state with the caught error.
   */
  static getDerivedStateFromError(error: Error): State;
  /**
   * @public componentDidCatch(error, errorInfo)
   * @param {Error} error - The error caught by the component.
   * @param {ErrorInfo} errorInfo - Additional information about the error.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
  /**
   * @public render()
   * @returns {ReactNode} The rendered component or an error page if an error is caught.
   */
  render(): ReactNode;
}
//#endregion
//#region src/lib/components/ErrorTemplates.d.ts
/**
 * @interface Props
 * @description Properties for the ErrorPage component.
 */
interface Props$6 {
  error: Error;
}
/**
 * @function ErrorPage
 * @description A React functional component that displays an error page with a message.
 * @param {Props} props - The properties of the component, including the error object.
 * @returns {React.FC<Props>} The rendered component.
 */
declare const ErrorPage: React.FC<Props$6>;
/**
 * @function handleJsError
 * @description Handles JavaScript errors by displaying an error page in the specified target element.
 * @param {Error} error - The error object containing the error message.
 * @param {HTMLElement} target - The HTML element where the error page should be displayed.
 */
declare const handleJsError: (error: Error, target: HTMLElement) => void;
//#endregion
//#region src/lib/components/Input.d.ts
interface Props$5 extends ComponentPropsWithoutRef<"input"> {
  label: string;
  description?: string;
  warningMessage?: string;
  /** If true, adds a * to the label and sets aria-required/required */
  required?: boolean;
}
declare function Input({ id, label, name, type, description, warningMessage, required, ...inputProps }: Props$5): JSX.Element;
//#endregion
//#region src/lib/components/InputCheckboxGroup.d.ts
type Checkbox = {
  id: string;
  label: string;
  selected: boolean;
};
interface Props$4 {
  /** The name of the group of fields. Legen belonging to the wrapping fieldset. */
  legend: string;
  /** The array of checkboxes from which the group is rendered */
  checkboxes: Checkbox[];
  /** When a checkbox is selected this function will retrun the id and new state. Its upto you to update the checkboxes array*/
  checkboxSelected: (id: string, selected: boolean) => void;
}
/** Renders a Fieldset containing multiple checkboxes */
declare function InputCheckboxGroup({ legend, checkboxes, checkboxSelected }: Props$4): JSX.Element;
//#endregion
//#region src/lib/components/InputRadioGroup.d.ts
type Radio = {
  id: string;
  label: string;
  selected: boolean;
};
interface Props$3 {
  /** Name of the group of fildes, becomes the fieldsets legend */
  legend: string;
  /** The array of radios which are rendered, min which state is kept */
  radios: Radio[];
  /** Is triggered when a radio is selected, you must update the state using the recieved id */
  radioSelected: (id: string) => void;
}
/** Renders a Fieldset containing multiple radio buttons */
declare function InputRadioGroup({ legend, radios, radioSelected }: Props$3): JSX.Element;
//#endregion
//#region src/lib/components/MainNavigation.d.ts
interface NavigationLink {
  to: string;
  name: string;
  sublinks?: NavigationLink[];
}
interface Props$2 {
  /** Nesed array representing the links for the menu. Level one shows on tool bar. AQll other levels are grouped popovers */
  links: NavigationLink[];
}
/**
 * Main navigation for use on a website, which should be added ot a page header. Its been designed to be responsive and respect every platform. So it renders the menu options on a desktop and hamburger on a mobile device.
 */
declare function MainNavigation({ links }: Props$2): JSX.Element;
//#endregion
//#region src/lib/components/Button.d.ts
type AriaCurrentTypes = "page" | "location" | "date";
interface Props$1 {
  primary?: boolean;
  size?: "small" | "medium" | "large";
  ariaLabel?: string;
}
interface ButtonProps extends Props$1, ComponentPropsWithoutRef<"button"> {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
declare function Button({ children, primary, disabled, size, type, ariaLabel, ...props }: ButtonProps): JSX$1.Element;
interface LinkProps extends Props$1, ComponentPropsWithoutRef<"a"> {
  href: string;
  ariaCurrent?: AriaCurrentTypes;
}
declare function ButtonLink({ href, children, primary, size, ariaLabel, ariaCurrent, ...props }: LinkProps): JSX$1.Element;
interface RouterLinkProps extends Props$1 {
  to: string | object;
  ariaCurrent?: AriaCurrentTypes;
  children: React.ReactNode;
}
declare function ButtonRouterLink({ to, children, primary, size, ariaLabel, ariaCurrent, ...props }: RouterLinkProps): JSX$1.Element;
//#endregion
//#region src/lib/components/Tabs.d.ts
type TabType = {
  id: string;
  label: string;
};
interface Props {
  tabs: TabType[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  children: ReactNode;
}
declare function Tabs({ tabs, activeTabId, onTabChange, children }: Props): JSX$1.Element;
//#endregion
//#region src/lib/styles/global/GlobalStyle.d.ts
declare const GlobalStyle: React.ComponentType;
//#endregion
export { Button, ButtonLink, ButtonRouterLink, ErrorBoundary, ErrorPage, GlobalStyle, Input, InputCheckboxGroup, InputRadioGroup, Loading, MainNavigation, Tabs, Toast, ToastProvider, handleJsError, useToast };
//# sourceMappingURL=index.d.mts.map