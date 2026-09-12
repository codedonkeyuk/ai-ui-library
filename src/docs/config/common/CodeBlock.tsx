import type { JSX } from "react/jsx-runtime";
import { useState } from "react";
import styled from "styled-components";

const CodeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const UnstyledCodeBox = styled.pre`
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 6px !important;
  padding: 16px !important;
  margin: 0 !important;
  overflow-x: auto !important;
  white-space: pre !important;

  &,
  & * {
    font-family:
      ui-monospace, Menlo, Monaco, "Roboto Mono", monospace !important;
    font-size: 13px !important;
    line-height: 1.6 !important;
    color: #0f172a !important;
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const CopyButton = styled.button`
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 4px !important;
  padding: 6px 12px !important;
  font-size: 12px !important;
  font-family: sans-serif !important;
  font-weight: 500 !important;
  color: #334155 !important;
  cursor: pointer !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.15s ease !important;

  &:hover {
    background: #f8fafc !important;
    border-color: #94a3b8 !important;
    color: #0f172a !important;
  }

  &:active {
    background: #f1f5f9 !important;
  }
`;

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps): JSX.Element {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <CodeGroup>
      <UnstyledCodeBox>
        <code>{code}</code>
      </UnstyledCodeBox>
      <ActionRow>
        <CopyButton onClick={handleCopy}>
          {copied ? "Copied!" : "Copy code"}
        </CopyButton>
      </ActionRow>
    </CodeGroup>
  );
}
