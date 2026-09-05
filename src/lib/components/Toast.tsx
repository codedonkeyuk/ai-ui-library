import { useEffect, type JSX } from "react";
import styled from "styled-components";

export type ToastVariant = "success" | "warning" | "error" | "info";

export interface ToastOptions {
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

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: inherit;
  }
`;

const StyledToast = styled.div<{ variant: ToastVariant }>`
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;

  background-color: ${(props) => {
    switch (props.variant) {
      case "success":
        return "#28a745";
      case "warning":
        return "#ffc107";
      case "error":
        return "#dc3545";
      default:
        return "#007bff";
    }
  }};

  color: ${(props) => (props.variant === "warning" ? "#000" : "#fff")};

  transition: all 0.3s ease-in-out;
  animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

/** Toast warning for all situations */
const Toast = ({
  isVisible,
  message,
  variant = "info",
  duration = 3000,
  onClose,
}: ToastProps): JSX.Element | null => {
  useEffect(() => {
    if (isVisible && duration !== undefined) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <StyledToast variant={variant} role="alert" aria-live="assertive">
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>{message}</span>
      </div>
      <CloseButton
        onClick={() => onClose?.()}
        aria-label={`Close ${variant} notification`}
      >
        &times;
      </CloseButton>
    </StyledToast>
  );
};

export default Toast;
