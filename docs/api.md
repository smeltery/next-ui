# Component API

## Your first component

Copy `components/examples/spotlight.tsx`, its shared types, and the `cn` utility from the [Spotlight source](/spotlight). Install `clsx` and `tailwind-merge` if your project does not already include them. Then render it inside a client component:

```tsx
"use client"

import { Spotlight } from "@/components/examples/spotlight"

export function FeatureCard() {
  return (
    <Spotlight
      className="min-h-64 rounded-xl bg-neutral-950 p-8 text-white"
      spotlightColor="rgba(255, 255, 255, 0.18)"
    >
      <h2>A little more focus.</h2>
      <p>Keep the content. Add a finishing touch.</p>
    </Spotlight>
  )
}
```

Read the [quick start](quick-start.md) for dependencies, aliases, and Tailwind setup before copying additional components.

## Shared props

Most wrapper components accept the following props. Check the individual source for component-specific requirements.

| Prop        | Type              | Purpose                                     |
| ----------- | ----------------- | ------------------------------------------- |
| `children`  | `React.ReactNode` | Content rendered inside the effect.         |
| `className` | `string`          | Tailwind classes for layout and appearance. |

## Spotlight

`Spotlight` follows pointer movement with a radial gradient. Supply a CSS color through `spotlightColor`; the source does not provide a default color.

| Prop             | Type     | Purpose                     |
| ---------------- | -------- | --------------------------- |
| `spotlightColor` | `string` | CSS color used by the glow. |

[Preview Spotlight and copy its source](/spotlight).

## Animated Border

`AnimatedBorder` draws a rotating conic gradient around its content. Supply all three color stops and an opaque inner surface so the border stays at the edge.

| Prop   | Type     | Purpose                  |
| ------ | -------- | ------------------------ |
| `from` | `string` | Color at the first stop. |
| `to`   | `string` | Color at the midpoint.   |
| `stop` | `string` | Color at the final stop. |

[Preview Animated Border and its usage example](/animated-border). Add a reduced-motion alternative when adapting the animation.

## Explore the collection

Browse the [component library](/components) for all nine effects. Each detail page includes the implementation, a usage example, and any required Tailwind extensions.

For production, review [customization](customization.md) and [accessibility](accessibility.md). Keep interactive controls semantic and decorative layers out of the focus order.
