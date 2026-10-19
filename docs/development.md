# Local development

Flox supplies the shared toolchain. Bun installs dependencies and runs the project scripts. Node runs the Next.js server for framework compatibility.

## Start with Flox

Install [Flox](https://flox.dev/docs/install-flox/), then clone the repository:

```sh
git clone https://github.com/smeltery/next-ui.git
cd next-ui
flox activate
bun install --frozen-lockfile
bun run hooks:install
bun run dev
```

Open `http://localhost:3000`. The checked-in Flox manifest and lockfile define Bun, Node, Git, and pre-commit for macOS and Linux. Activation itself does not install application dependencies or change Git hooks.

## Managed preview service

```sh
flox services start preview
flox services status
flox services stop preview
```

The preview service runs the development server on port 3000. Run `bun install --frozen-lockfile` before starting it. Do not run a second server on the same port.

## Production preview

```sh
bun run build
bun run start
```

For production hosting, set `SITE_URL` to the site's actual HTTPS origin before building. It controls canonical URLs, sitemap entries, and indexing. Without it, the site advertises `noindex` for local and preview builds.

## Verification

```sh
bun run check
bun run build
bunx playwright install chromium
bun run test:e2e
```

The browser suite starts a production preview on port 3188. Use [contributing](contributing.md) for the full CI and hook contract.

## Without Flox

Use the Bun version in `packageManager` and Node 22. Flox remains the reference environment for CI and reproducing failures.
