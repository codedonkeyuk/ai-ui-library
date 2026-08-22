import React, { createContext, useContext, useState, useCallback } from "react";
import Toast, { type ToastOptions } from "./Toast.tsx";
import styled from "styled-components";

const ToastFlex = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 5px;
  top: 20px;
  right: 20px;
`;

interface ToastContextType {
  show: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<{ id: string; options: ToastOptions }[]>(
    [],
  );

  const show = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 15);
    setToasts((prev) => [...prev, { id, options }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, options.duration || 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toasts?.length > 0 && (
        <ToastFlex>
          {toasts.map(({ id, options }) => (
            <Toast
              key={id}
              isVisible={true}
              message={options.message}
              variant={options.variant}
              duration={options.duration}
              onClose={() => removeToast(id)}
            />
          ))}
        </ToastFlex>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
