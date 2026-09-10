import type { ColorConfigItem } from "../Types";

const basicStyles: ColorConfigItem = {
  properties: {
    "main-bg-color": {
      light: "#ffffff",
      dark: "#000000",
    },
    "main-fg-color": {
      light: "#000000",
      dark: "#ffffff",
    },
    "main-bdr-color": {
      light: "#2d2d2d",
      dark: "#ffffff",
    },
    "main-hover-color": {
      light: "#2a2a2a",
      dark: "#2a2a2a",
    },
    "card-bg-color": {
      light: "#ffffff",
      dark: "#000000",
    },
    "card-fg-color": {
      light: "#000000",
      dark: "#ffffff",
    },
    "alt1-bg-color": {
      light: "#1a1a1a",
      dark: "#1e1e1e",
    },
    "alt2-bg-color": {
      light: "#222222",
      dark: "#252525",
    },
  },
  example: () => (
    <div className="container">
      <div className="page">
        <h1>Im a Header One</h1>
        <h2>Im a Header Two</h2>
        <h3>Im a Header Three</h3>
        <p>
          <strong>Strong text</strong> indicates that the content is especially
          important.
        </p>

        <p>
          <em>Emphasized text</em> adds stress or emphasis to a word or phrase.
        </p>

        <p>
          <b>Bold text</b> draws attention visually without implying extra
          importance.
        </p>

        <p>
          <i>Italic text</i> can represent an alternative voice, mood, or
          technical term.
        </p>

        <p>
          <u>Underlined text</u> can indicate a special annotation or
          highlighted phrase.
        </p>

        <p>
          <mark>Marked text</mark> looks like it has been highlighted with a
          marker.
        </p>

        <p>
          <small>Small text</small> is often used for disclaimers, legal notes,
          or side comments.
        </p>

        <p>
          <s>Strikethrough text</s> shows information that is no longer accurate
          or relevant.
        </p>

        <p>
          The old price was <del>$49.99</del>, but the new price is
          <ins>$29.99</ins>.
        </p>

        <p>
          Water is written chemically as H<sub>2</sub>O, while a squared number
          uses superscript notation, such as 5<sup>2</sup>.
        </p>

        <p>
          Use the <code>console.log()</code> function to display a message in
          JavaScript.
        </p>

        <p>
          To save your document, press <kbd>Ctrl</kbd> + <kbd>S</kbd> on Windows
          or
          <kbd>Command</kbd> + <kbd>S</kbd> on macOS.
        </p>

        <p>
          The computer displayed the following output:
          <samp>Process completed successfully.</samp>
        </p>

        <p>
          In the equation <var>x</var> + 10 = 25, the variable
          <var>x</var> represents the number 15.
        </p>

        <p>
          The word <abbr title="HyperText Markup Language">HTML</abbr> describes
          the language used to structure web pages.
        </p>

        <p>
          The article <cite>The Future of the Web</cite> discusses how websites
          may evolve over time.
        </p>

        <p>
          The teacher said,{" "}
          <q>Semantic HTML makes websites easier to understand.</q>
        </p>

        <blockquote>
          The web is most powerful when it remains open, accessible, and
          understandable to everyone. Semantic HTML helps create that kind of
          web by giving meaning and structure to written content.
        </blockquote>

        <a href="#">I am a link</a>
      </div>
    </div>
  ),
};

export default basicStyles;
