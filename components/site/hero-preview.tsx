import Link from "next/link"
import { Spotlight } from "@/components/examples/spotlight"
export function HeroPreview() {
  return (
    <div className="hero-product">
      <div className="hero-product-label">
        <span>FROM THE COLLECTION</span>
        <span>01 / SPOTLIGHT</span>
      </div>
      <Link
        href="/spotlight"
        className="hero-live-card"
        aria-label="Preview Spotlight and copy its source"
      >
        <Spotlight
          className="hero-spotlight"
          spotlightColor="rgba(255,255,255,0.22)"
        >
          <span className="hero-demo-tag">React component · live preview</span>
          <strong>
            A simple card.
            <br />
            <em>A little more presence.</em>
          </strong>
          <span className="hero-demo-caption">
            Move your pointer. See the glow.
          </span>
          <span className="hero-demo-link">Preview & copy Spotlight</span>
        </Spotlight>
      </Link>
      <div className="hero-more-effects">
        <Link href="/animated-border">
          <div className="hero-border-art" aria-hidden="true">
            <span>Make it stand out.</span>
          </div>
          <span>Animated Border</span>
          <small>Frame your next idea.</small>
        </Link>
        <Link href="/dynamic-grid-pattern">
          <div className="hero-grid-art" aria-hidden="true">
            <span>Give it depth.</span>
          </div>
          <span>Dynamic Grid</span>
          <small>Set the scene.</small>
        </Link>
      </div>
      <p className="hero-product-note">
        These effects are components. The source is yours to edit.
      </p>
    </div>
  )
}
