import { useRef, useEffect, type JSX } from "react";
import styled from "styled-components";

const DialogStyled = styled.dialog``;

interface DialogProps {
  /** Determines if the dialog is open and visible */
  isOpen: boolean;
  /**  Callback function triggered when the dialog closes. */
  onClose: () => void;
  /**  The content to display inside the dialog. */
  children: React.ReactNode;
}

/**
 * HTML Dialog component.
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
