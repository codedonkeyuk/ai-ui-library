import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorPage } from "./ErrorTemplates";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * @class ErrorBoundary
 * @description A React component that catches and displays errors within its children.
 */
export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  /**
   * @static getDerivedStateFromError(error)
   * @param {Error} error - The error caught by the component.
   * @returns {State} The new state with the caught error.
   */
  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  /**
   * @public componentDidCatch(error, errorInfo)
   * @param {Error} error - The error caught by the component.
   * @param {ErrorInfo} errorInfo - Additional information about the error.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  /**
   * @public render()
   * @returns {ReactNode} The rendered component or an error page if an error is caught.
   */
  public render(): ReactNode {
    if (this.state.error) {
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}
