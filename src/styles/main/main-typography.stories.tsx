import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./main.css";

const meta: Meta = {
  title: "Styles/Main.css/Typography",
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj = {
  render: (): React.JSX.Element => (
    <main>
      <h1>Heading Level one</h1>
      <p>
        This is a standard paragraph element. It demonstrates the default body
        copy layout, font size, and line height. You can test your alignment,
        line tracking, and readability here. <strong>This text is bold</strong>,
        and <em>this text is italicised</em> to show local font variants.
      </p>

      <section>
        <h2>Heading Level Two (Section Title)</h2>
        <p>
          The line height of headings should be tighter than the body text. On
          large desktop monitors, this text container caps at a maximum width to
          protect comfortable reading mechanics. On smaller phone viewports, the
          fluid scales will naturally shrink down.
        </p>

        <blockquote>
          "This is a blockquote element used for callouts, testimonials, or
          pulled quotes. It breaks up the monotony of long text components."
        </blockquote>
      </section>
      <section>
        <h3>Heading Level Three (Sub-section)</h3>
        <p>
          Here is an example of an un-ordered list to test vertical spacing,
          line gaps, and bullet alignment:
        </p>

        <ul>
          <li>First point of an unstructured layout list</li>
          <li>
            Second item containing inline <code>code snippets</code> for
            verification
          </li>
          <li>Final list component to check bottom margins</li>
        </ul>

        <p>
          Here is an example of an ordered list to test vertical spacing, line
          gaps, and bullet alignment:
        </p>

        <ol>
          <li>First point of an unstructured layout list</li>
          <li>
            Second item containing inline <code>code snippets</code> for
            verification
          </li>
          <li>Final list component to check bottom margins</li>
        </ol>
      </section>
      <section>
        <h3>Code Block Presentation</h3>
        <p>
          Monospace fallback stacks are used here to handle structural data
          layouts without layout shifts:
        </p>

        <code>{`
          html { background: red; }
          body { color: blue; }
        `}</code>
      </section>
    </main>
  ),
};
