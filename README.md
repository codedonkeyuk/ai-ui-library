# AI-UI-LIBRARY

This UI library contains a number of React elements for use on other projects, this also generates a LLM Model file that knows how to use the library.
Its does this through a process known as Context Injection were you stuff information directly into the LLM Model.

**WARNING** If you have multiple component libraries and don't have a ton of memory, I recommend using one component library per LLM. Then load the LLM you need per project. Its much simpler!

## Modelfile

[You can download that from here](./assets/Modelfile)

## Why is the library a mix of CSS and Components

This library has been designed to componentize the hard stuff (Forms, Toast, Error Handling, etc) but only share styles for the basic stuff (headers, body, typography).
Its for use on both single page websites, and multiple page web sites that use multiple React components.

Here is a typical example of most commercial component libraries. Steep learning curve, hard coded logic which is terrible for accessibility.

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

My library does it this way, much simpler, not as steep a learning curve, great for accessibility.

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

## Usage Instructions

### Installing the Project

I don't distribute code on NPM. To use this library locally you need to check it out locally and link it to your project.

Check out you code, open terminal, in root of simple-component-library

```bash
npm link
```

Within the root of your consuming project

```bash
npm link simple-component-library
```

### How do install in project

#### Adding loading div

Below is a basic example of an html page for a single page React app. React would typically hook onto id=root and replace the loading HTML content.

```html
<html>
  <head>
    ...
    <link rel="stylesheet" href="simple-component-library/loading.css" />
    ...
  </head>
  <body>
    <main id="root">
      <div class="message-container">
        <div class="loading-spinner" role="status" aria-label="Loading"></div>
      </div>
    </main>
  </body>
</html>
```

#### Import into a Single Page Application

If you are building a standalone single page site: Then within the root of your tsx project (Typically App.tsx or Index.tsx), add the `<GlobalStyle />` tag within your component.

```tsx
// src/App.tsx
import React from "react";
import GlobalStyle from "../src/styles/global/GlobalStyle";

export default function App(): React.JSX.Element {
  return (
    <>
      <GlobalStyle />
      <div>Hello World!</div>
    </>
  );
}
```

#### Hybrid App or Island Architecture (A static site with multiple react components)

Using a single global.css is more efficient than adding a tag to each of the projects, as that would increase the bundle size of each. You can take advantage of global scope too, but native css is still more efficient in the browser.

```html
<html>
  <head>
    ...
    <link rel="stylesheet" href="simple-component-library/global.css" />
    ...
  </head>
</html>
```

### Commands

| Command             | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| `npm run build`     | Build the app using tsdown                                                 |
| `npm run test`      | Runs native TS tests using happy-dom                                       |
| `npm run storybook` | runs storybook which shows the components                                  |
| `npm run clean`     | Cleans the code with prettier                                              |
| `npm run validate`  | Validates the project using typescript compiler, prettier and spellchecker |
| `buildStorybook`    | Build a storybook demo static site                                         |
| `serveStorybook`    | Serve the which has been built by `buildStorybook`                         |
