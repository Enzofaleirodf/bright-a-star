import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log for debugging
    console.error("App ErrorBoundary caught: ", error, info);
  }

  handleReload = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <article className="max-w-md text-center space-y-4">
            <h1 className="text-xl font-semibold">Ocorreu um erro ao carregar o app</h1>
            <p className="text-muted-foreground text-sm">
              Tente recarregar a página. Se o problema persistir, entre em contato com o suporte.
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Recarregar
            </button>
            {import.meta.env?.DEV && this.state.error && (
              <pre className="text-left whitespace-pre-wrap text-xs opacity-70 overflow-auto max-h-64">
                {String(this.state.error?.message || this.state.error)}
              </pre>
            )}
          </article>
        </main>
      );
    }
    return this.props.children;
  }
}
