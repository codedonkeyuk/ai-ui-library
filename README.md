# simple-component-library

I am not a fan of over engineered ui libraries. I appreciate that bundling CSS in components is seen as efficient and stops style bleed. Speaking as someone who knows both HTML and CSS, I find they slow me down. They get in the way when you are trying to make a page accessible.

This library has been designed to componentize the hard stuff (Forms, Toast, Error Handling, etc) but only share styles for the basic stuff (headers, body, typography). So really a Highbred between old school css and more modern components.

This syntax makes me sad!

```JSX
<Toast></Toast>
<Container>
  <Page>
    <Card>
      <HeadingOne> Hello World</HeadingOne>
    </Card>
  </Page>
</Container>
```

Only component is a functional component, why wrap the rest, its cryptic.

I prefer this

```JSX
<Toast></Toast>
<div className="container">
  <main className="page">
    <section className="card">
      <h1> Hello World</h1>
    </section>
  </main>
</div>
```

Then at the project level I can use linter, stylus, or html validator to police the mistakes.

## Usage Instructions

### WARNING

I don't distribute code on NPM. To use this library locally you need to check it out locally and link it to your project.

Check out you code, open terminal, in root of simple-component-library

```bash
npm link
```

Within the root of your consuming project

```bash
npm link simple-component-library
```

use it within your project

```ts
import { MyComponent } from "simple-component-library";
import "simple-component-library/main.css";
```

### Commands

| Command             | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| `npm run build`     | Build the app using tsdown                                                 |
| `npm run test`      | Runs native TS tests using happy-dom                                       |
| `npm run storybook` | runs storybook which shows the components                                  |
| `npm run clean`     | Cleans the code with prettier                                              |
| `npm run validate`  | Validates the project using typescript compiler, prettier and spellchecker |

### Project Structure

### Commands

| Command         | Description                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `/src/main.css` | Contains global variable declarations that can be over written, and loading style                                                     |
| `/src/index.ts` | Main export point. If you create a component you must reference it here. You also need to import css files if you wish to export them |

### General Usage

To add library to html

```html
<head>
  ...
  <link rel="stylesheet" href="simple-component-library/loading.css" />
  ...
</head>
```

in TS

```typescript
import { Button } from "simple-component-library"; // A styled component
import "simple-component-library/theme.css"; // raw css
import "simple-component-library/button.css"; // raw css
```

### Setup loading div in index.html

To avoid website blinking, you need a loading div before JS app fully loads. Importing this stylesheet and and applying the HTMl will do that for you.

- So `<main id=root>` is where you react app hooks. The html get replaces when the app fully loads.

```html
<html>
  <head>
    ...
    <link rel="stylesheet" href="simple-component-library/main.css" />
    ...
  </head>
  <body>
    <main id="root">
      <div class="spinner-container">
        <div class="loading-spinner" role="status" aria-label="Loading"></div>
      </div>
    </main>
  </body>
</html>
```
