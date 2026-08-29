import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorPage } from "./ErrorTemplates";

interface Props {
  /** The content to be rendered if error is not thrown. */
  children: ReactNode;
}

interface State {
  error: Error | null;
}
/**
 * ErrorBoundary to catch react errors in a clean way
 */
export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.error) {
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}
