# llm-templates

This library produces both a storybook component library and an Ollama LLM Model file which has the component library injected into it ( via In-Context-Learning).

This allows the model to give you examples that use your own component library. This is ideal if you want to build apps quickly using in house components that you have tired and tested internally.

Thinking this library is ideal for any dev team or digital agency that likes to build at a pace.

## Setup

You need to do the following:

- Put you component library in a shared repo for people to use
- Put your storybook site onto a web server to let developers use interactive examples.
- Make the model file available for your developers to install, or do that as part of an OS image.

I was originally going to make the model produce the web apps but this was really silly idea. Not only would it of ate a lot of context but you simply have to pull them from you internal repo. If you have app templates don't forget to add reference to this component library for people to use.

## commands

| Command           | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `npm run build`.  | Builds the storybook component library and the Ollama model file.                     |
| `npm run test`    | Tests the storybook component library and the Ollama model file generation logic.     |
| `validate`        | Runs pretties, tsc compiler and cspell to make sure the app is ready to be committed. |
| `buildStorybook`  | Builds the production version of the storybook site                                   |
| `serveStorybook`  | Serves the production site of storybook                                               |
| `storybook`       | Serves the dev site of storybook                                                      |
| `clean`           | Cleans the code using prettier                                                        |
| `model:generate`  | Generates the ollama model file                                                       |
| `model:register"` | Creates the ollama model in ollama, which you can then run                            |
