# Vue - Coffee Shopping Cart

> vue + vuex

[![Vue](https://img.shields.io/badge/Vue-2.7-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)](https://v2.vuejs.org/)
[![Vuex](https://img.shields.io/badge/Vuex-3.6-34495E?style=flat-square&logo=vuedotjs&logoColor=4FC08D)](https://v3.vuex.vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Bulma](https://img.shields.io/badge/Bulma-1.0-00D1B2?style=flat-square&logo=bulma&logoColor=white)](https://bulma.io/)
[![License](https://img.shields.io/badge/license-ISC-blue?style=flat-square)](https://opensource.org/license/isc-license-txt)

A small coffee ordering app that shows how state works in Vue.

Pick a coffee, pick a size, add it to the cart. The panel on the left is a live
state inspector, so you can watch what happens as you click.

![Screenshot](docs/screenshot01.png)

## What it shows

The inspector separates state into four tiers:

1. **Component state** - `selectedMainOpt` and `selectedSubOpt`, which live in
   one component's `data()` and are private to it.
2. **Derived state** - the `selectedCoffee` computed, rebuilt from tier 1
   whenever it changes.
3. **Store state** - `$store.state`, shared by every component. The cart table
   reads the same object, so it repaints on its own.
4. **Mutations** - a log of each commit, captured with `store.subscribe()`.

The mutation log also names what each commit did. `addToCart` has two branches:
it either adds a new line to the cart or bumps the quantity on one already
there. Add the same coffee twice to see both.

## Getting started

```sh
npm install
npm run dev
```

Then open <http://localhost:8080>.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (`npm run serve` works too) |
| `npm run build` | Build for production into `dist/` |
| `npm run build:single` | Build the standalone `docs/index.html` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Check the code with ESLint |

The normal `dist/` build has to be served over HTTP - opening its `index.html`
from the file system shows a blank page, because browsers block ES modules
loaded over `file://`. Use `npm run preview` for that.

## Standalone file

[`docs/index.html`](docs/index.html) is checked in. It is the whole app - markup,
styles and script - inlined into one file. Download it and open it by
double-clicking: no server, no install, nothing else to copy alongside it.

It is generated, so re-run `npm run build:single` after changing anything under
`src/` or it will fall out of step with the source.
