import { useRef, useEffect, type JSX } from "react";
import styled from "styled-components";

const DialogStyled = styled.dialog``;

interface DialogProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

/**
 * HTML Dialog Component
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Controls the visibility of the native dialog element.
 * @param {() => void} props.onClose - Required callback for the dialog close event (e.g., native Escape key or programmatic close).
 * @param {React.ReactNode} props.children - The content to be rendered inside the dialog, including any close buttons.
 * @returns {JSX.Element} A controlled native HTML dialog component.
 */
export default function Dialog({
  isOpen,
  children,
  onClose,
}: DialogProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <DialogStyled ref={dialogRef} onClose={onClose}>
      {children}
    </DialogStyled>
  );
}
