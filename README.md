# simple-component-library

I don't like large opinionated CSS libraries. I've deliberately designed this one to only give me the functional components that I need, and simple CSS for decorative components.

THis syntax makes me cringe!

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

Only component is a functional component, why wrap the rest, its cryptic if you are new. Why slow you project development down!

I prefer this

```JSX
<Toast></Toast>
<div className="container">
  <main className="page">
    <section className="card">
      <h1> Hello World</h1>
    </Card>
  </Page>
</div>
```

Then at the project level I can use linter, stylus, or html validator to block mistakes.

## Usage Instructions

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
    <style>
      :root {
        body-background-color: "#000000";
        card-background-color: "#ffffff";
        fnt-color: "#000000";
      }
    </style>
    <link rel="stylesheet" href="simple-component-library/loading.css" />
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
