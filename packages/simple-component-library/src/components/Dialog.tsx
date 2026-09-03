import { useRef, useEffect, type JSX } from "react";
import styled from "styled-components";

const DialogStyled = styled.dialog``;

interface DialogProps {
  /** Controls the visibility of the native dialog element. */
  isOpen: boolean;
  /** Required callback for the dialog close event. */
  onClose: () => void;
  /** The content to be rendered inside the dialog. */
  children: React.ReactNode;
}

/**
 * HTML Dialog Component
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
