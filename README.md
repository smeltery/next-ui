# Next UI

<p align="center"><img src="public/brand/mark.svg" width="64" alt="Next UI logo"></p>

Small details. Better interfaces. Nine copy-paste React components with live previews, TypeScript source, and examples you can make your own.

[![CI](https://github.com/smeltery/next-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/next-ui/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/smeltery/next-ui)](https://github.com/smeltery/next-ui/releases)
![React](https://img.shields.io/badge/React-18-292b25?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-14-292b25?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-292b25?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-292b25?logo=tailwindcss)
![Bun](https://img.shields.io/badge/Bun-1.3.11-222222?logo=bun)
[![Flox](https://img.shields.io/badge/dev_environment-Flox-222222)](.flox/env/manifest.toml)
[![License](https://img.shields.io/badge/license-PolyForm_Shield-222222)](LICENSE)

![Next UI — Small details. Better interfaces.](public/brand/og.png)

Explore light, borders, motion, and backgrounds. Copy only what you need; the source stays in your application. The showcase includes searchable documentation, live demos, and component and usage tabs.

## Run locally

```sh
flox activate
bun install --frozen-lockfile
bun run hooks:install
bun run dev
```

Open `http://localhost:3000`. Run `bun run check` for shared validation and `bun run verify` for a production build plus browser tests. Install Chromium once with `bunx playwright install chromium`.

[Explore the components](https://next-ui-orcin-chi.vercel.app/components) · [Component API](docs/api.md)

## Documentation

Start in [docs/](docs/index.md): [quick start](docs/quick-start.md), [components](docs/components.md), [customization](docs/customization.md), and [accessibility](docs/accessibility.md).

For the project itself: [development](docs/development.md), [architecture](docs/architecture.md), [contributing and CI](docs/contributing.md), and [releases](docs/releases.md).

Licensed under [PolyForm Shield 1.0.0](LICENSE).
