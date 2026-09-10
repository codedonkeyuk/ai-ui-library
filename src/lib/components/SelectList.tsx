import { useId, type JSX, type ReactNode } from "react";
import {
  FormDescription,
  FormDiv,
  FormLabel,
  FormSelect,
  FormWarning,
} from "./InputCommon";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  children: ReactNode;
  required?: boolean;
  description?: string;
  warningMessage?: string;
}

export default function SelectList({
  id,
  name,
  label,
  onChange,
  value,
  children,
  required = false,
  description,
  warningMessage,
  ...rest
}: Props): JSX.Element {
  const defaultId = useId();
  const selectId = id || defaultId;

  const descriptionId = `${selectId}-description`;
  const warningId = `${selectId}-error`;

  const describedBy = [
    description ? descriptionId : null,
    warningMessage ? warningId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FormDiv>
      <FormLabel htmlFor={selectId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </FormLabel>
      <FormSelect
        {...rest}
        name={name}
        value={value}
        onChange={onChange}
        id={selectId}
        required={required}
        aria-required={required}
        aria-describedby={describedBy || undefined}
        aria-invalid={!!warningMessage}
      >
        {children}
      </FormSelect>

      {description && (
        <FormDescription id={descriptionId}>{description}</FormDescription>
      )}

      {warningMessage && (
        <FormWarning id={warningId} role="alert">
          {warningMessage}
        </FormWarning>
      )}
    </FormDiv>
  );
}
