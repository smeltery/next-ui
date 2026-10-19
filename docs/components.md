# Component reference

Nine components, grouped by the detail they add. Every component page includes a live preview, implementation source, and usage example.

## Borders and light

| Component                             | Effect                                    | Good fit               |
| ------------------------------------- | ----------------------------------------- | ---------------------- |
| [Spotlight](/spotlight)               | A light follows the pointer               | Feature cards          |
| [Spotlight Border](/spotlight-border) | A localized glow follows the card edge    | Interactive panels     |
| [Shimmer](/shimmer)                   | Light moves around the perimeter on hover | Highlighted content    |
| [Animated Border](/animated-border)   | A continuously moving gradient edge       | A single featured card |
| [Horizon](/horizon)                   | A subtle light along the top border       | Quiet surface emphasis |

## Motion and depth

| Component                               | Effect                       | Integration note                                                 |
| --------------------------------------- | ---------------------------- | ---------------------------------------------------------------- |
| [Parallax](/parallax)                   | A pointer-driven 3D tilt     | Keep meaningful content accessible without hover                 |
| [Infinite Carousel](/infinite-carousel) | A continuously scrolling row | Includes scoped animation styles; provide a pause or static mode |

## Backgrounds

| Component                                     | Effect                          | Integration note                         |
| --------------------------------------------- | ------------------------------- | ---------------------------------------- |
| [Meteors](/meteors)                           | Repeated diagonal light trails  | Copy the supplied meteor keyframes       |
| [Dynamic Grid Pattern](/dynamic-grid-pattern) | Grid cells react to the pointer | Use behind content and preserve contrast |

## Props and dependencies

The copied TypeScript source is the authoritative prop reference. Read its exported interface and imports before integrating. Some effects accept children and class names; others render a decorative layer. The usage tab shows the expected composition for that component.

Keep effects decorative and test the finished interface with the [accessibility guide](accessibility.md).
