import { Component, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
}

class RootErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Erro na interface BRASA BURGER:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-dvh flex-col items-center justify-center bg-[#0A0A0A] px-6 text-center text-white"
        >
          <h1 className="font-display text-4xl tracking-wider uppercase">
            Algo saiu do esperado
          </h1>
          <p className="mt-2 max-w-md text-sm text-[#B8B8B8]">
            Recarregue a página para voltar ao cardápio da BRASA BURGER.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#F47B20] px-6 font-display text-lg tracking-wider text-[#0A0A0A]"
          >
            Recarregar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);
