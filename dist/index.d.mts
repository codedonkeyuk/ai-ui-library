import { JSX } from "react/jsx-runtime";
import React$1, { Component, ComponentPropsWithoutRef, ErrorInfo, JSX as JSX$1, ReactNode } from "react";
//#region src/lib/components/Loading.d.ts
/**
 * Accessible loading spinner for use when components are loading. Pulls css from Loading.css.
 *
 * Loading.css is a separate CSS file as it needed pfor when the app is loading.
 * */
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
declare const ToastProvider: React$1.FC<{
  children: React$1.ReactNode;
}>;
declare const useToast: () => ToastContextType;
//#endregion
//#region src/lib/components/ErrorBoundary.d.ts
interface Props$10 {
  children: ReactNode;
}
interface State {
  error: Error | null;
}
/**
 * @class ErrorBoundary
 * @description A React component that catches and displays errors within its children.
 */
declare class ErrorBoundary extends Component<Props$10, State> {
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
interface Props$9 {
  error: Error;
}
/**
 * @function ErrorPage
 * @description A React functional component that displays an error page with a message.
 * @param {Props} props - The properties of the component, including the error object.
 * @returns {React.FC<Props>} The rendered component.
 */
declare const ErrorPage: React$1.FC<Props$9>;
/**
 * @function handleJsError
 * @description Handles JavaScript errors by displaying an error page in the specified target element.
 * @param {Error} error - The error object containing the error message.
 * @param {HTMLElement} target - The HTML element where the error page should be displayed.
 */
declare const handleJsError: (error: Error, target: HTMLElement) => void;
//#endregion
//#region src/lib/components/Input.d.ts
interface Props$8 extends ComponentPropsWithoutRef<"input"> {
  label: string;
  description?: string;
  warningMessage?: string;
  /** If true, adds a * to the label and sets aria-required/required */
  required?: boolean;
}
declare function Input({ id, label, name, type, description, warningMessage, required, ...inputProps }: Props$8): JSX.Element;
//#endregion
//#region src/lib/components/InputCheckboxGroup.d.ts
type Checkbox = {
  id: string;
  label: string;
  selected: boolean;
};
interface Props$7 {
  /** Title of group of checkboxes*/
  legend: string;
  /** checkbox data including slected state*/
  checkboxes: Checkbox[];
  /** when you select a checkbox this fundtion is fired */
  checkboxSelected: (id: string, selected: boolean) => void;
}
/** Renders a groupd of checkboxes */
declare function InputCheckboxGroup({ legend, checkboxes, checkboxSelected }: Props$7): JSX.Element;
//#endregion
//#region src/lib/components/InputRadioGroup.d.ts
type Radio = {
  id: string;
  label: string;
  selected: boolean;
};
interface Props$6 {
  /** Name of the group of fields, becomes the fieldsets legend */
  legend: string;
  /** The array of radios which are rendered, from which state is kept */
  radios: Radio[];
  /** Is triggered when a radio is selected, you must update the state using the received id */
  radioSelected: (id: string) => void;
}
/** Renders a Fieldset containing multiple radio buttons */
declare function InputRadioGroup({ legend, radios, radioSelected }: Props$6): JSX.Element;
//#endregion
//#region src/lib/components/MainNavigation.d.ts
interface NavigationLink {
  to: string;
  name: string;
  sublinks?: NavigationLink[];
}
interface Props$5 {
  /** Nesed array representing the links for the menu. Level one shows on tool bar. AQll other levels are grouped popovers */
  links: NavigationLink[];
}
/**
 * Main navigation for use on a website, which should be added ot a page header. Its been designed to be responsive and respect every platform. So it renders the menu options on a desktop and hamburger on a mobile device.
 */
declare function MainNavigation({ links }: Props$5): JSX.Element;
//#endregion
//#region src/lib/components/Table.d.ts
type BaseCell = {
  data: string | number;
  colspan?: number;
  rowspan?: number;
};
type HeaderCell = BaseCell & {
  type: "header";
};
type DataCell = BaseCell & {
  type: "header" | "data";
};
interface Props$4 {
  data: DataCell[][];
  thead?: HeaderCell[][];
  tfoot?: DataCell[][];
  id: string;
}
declare function Table({ data, thead, tfoot, id }: Props$4): JSX.Element;
//#endregion
//#region src/lib/components/Pills.d.ts
type Pill = {
  id: string | number;
  label: string;
  selected?: boolean;
};
interface Props$3 {
  items: Pill[];
  onChange: (id: string | number) => void;
  position?: "start" | "center" | "end";
}
declare function Pills({ items, onChange, position }: Props$3): React$1.JSX.Element;
//#endregion
//#region src/lib/components/SelectList.d.ts
interface Props$2 extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  children: ReactNode;
  required?: boolean;
  description?: string;
  warningMessage?: string;
}
declare function SelectList({ id, name, label, onChange, value, children, required, description, warningMessage, ...rest }: Props$2): JSX$1.Element;
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
  children: React$1.ReactNode;
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
declare const GlobalStyle: React$1.ComponentType;
//#endregion
export { Button, ButtonLink, ButtonRouterLink, ErrorBoundary, ErrorPage, GlobalStyle, Input, InputCheckboxGroup, InputRadioGroup, Loading, MainNavigation, Pills, SelectList, Table, Tabs, Toast, ToastProvider, handleJsError, useToast };
//# sourceMappingURL=index.d.mts.map