# Accessibility

Treat visual effects as progressive enhancements. The copied examples are a starting point; accessibility depends on the complete interface you build around them.

## Motion preferences

Respect `prefers-reduced-motion`. Stop continuous animation and replace pointer-driven motion with a static treatment when the visitor requests less motion. The showcase disables CSS animation under reduced motion; copied components need an equivalent rule in your application.

## Keyboard and touch

Keep all meaningful actions in native buttons and links. Hover-only decoration must never be the only way to reveal instructions, prices, or actions. On touch devices, provide a sensible static appearance.

## Contrast and focus

Check normal, hover, and focus states against the actual background. A glowing border does not replace a visible focus outline. Decorative overlays should use `pointer-events: none` when they sit above interactive content.

## Before you ship

- Navigate the finished interface using Tab, Shift+Tab, Enter, and Escape.
- Check the system reduced-motion setting.
- Verify text at 200% zoom and a 320px viewport.
- Keep decorative SVGs hidden from assistive technology.
- Give meaningful images useful alternative text.
- Use an automated accessibility checker and manually review the experience.

No automated score alone proves accessibility. Test the interactions your visitors actually need.
