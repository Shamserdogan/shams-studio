import React, { ErrorInfo, ReactNode } from "react";
import ErrorPage from "../../../app/error";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught rendering exception:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = ""; // Clear hash to return to home state if crashed via testing
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorPage 
          error={this.state.error || new Error("An unexpected render crash occurred.")} 
          reset={this.handleReset} 
        />
      );
    }

    return this.props.children;
  }
}

