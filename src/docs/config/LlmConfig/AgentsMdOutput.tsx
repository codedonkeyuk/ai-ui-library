import type { JSX } from "react/jsx-runtime";
import { useState } from "react";
import styled from "styled-components";
import PackageJson from "../../../../package.json";
import type { OutputProps } from "./Types";
import CodeBlock from "../common/CodeBlock";

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: sans-serif;
`;

const FormCard = styled.div`
  padding: 16px;
  border: 1px solid #e2e8f0;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 14px;
  color: #334155;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  font-family: monospace;
  font-size: 13px;
  resize: vertical;
  box-sizing: border-box;
`;

export default function AgentsMdOutput({
  configData,
}: OutputProps): JSX.Element {
  const [customCommands, setCustomCommands] = useState<string>(
    "npm run dev          — Start the local development server\n" +
      "npm run build        — Build the project for production\n" +
      "npm run lint         — Run code style and lint checks",
  );

  const markdown = `# AGENTS.md

## Project Overview

This is a TypeScript React library.

### Runtime dependencies

- \`react ${PackageJson.peerDependencies.react}\` — component rendering, hooks, and context
- \`react-dom ${PackageJson.peerDependencies["react-dom"]}\` — rendering React components to the DOM
- \`react-router ${PackageJson.peerDependencies["react-router"]}\` — routing and navigation behavior
- \`styled-components ${PackageJson.peerDependencies["styled-components"]}\` — component-scoped styling and theming

## UI Library Definitions
Use the following types and library imports when building React components for this project:
\`\`\`typescript
${configData.componentInventory.replace(/\$/g, "\\$")}
\`\`\`

## Development

${customCommands ? customCommands : "... add your own project commands"}

## Code Conventions

- Always use single-line NAMED imports from the root package "ai-ui-library".
- NEVER use default imports or split deep path imports (e.g. do NOT do: \`import Dialog from 'ai-ui-library/Dialog'\`).
- Example of the ONLY acceptable import format: \`import { Dialog, Input, InputCheckboxGroup } from "ai-ui-library";\`
- Use TypeScript for all source files.
- Use functional React components.
- Follow the existing component and folder structure.

## Testing

- Add or update tests when changing component behavior.
- Run the relevant tests after making changes.
- Include accessibility behavior in component tests where applicable.

## Before Finishing

Run the appropriate formatting, linting, type-checking, test, and build commands for the files changed.
`;

  return (
    <Container>
      <FormCard>
        <FormLabel htmlFor="custom-commands">
          Customize Project Commands:
        </FormLabel>
        <FormTextArea
          id="custom-commands"
          value={customCommands}
          onChange={(e) => setCustomCommands(e.target.value)}
          placeholder="e.g., npm run build — builds the project"
          rows={5}
        />
      </FormCard>

      <CodeBlock code={markdown} />
    </Container>
  );
}
