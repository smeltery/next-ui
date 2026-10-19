import Link from "next/link"
import { ComponentCatalog } from "@/components/site/component-catalog"
import { Layers, MousePointer2, Code2 } from "lucide-react"
export default function Home() {
  return (
    <>
      <section className="wrap home-hero">
        <div>
          <p className="eyebrow">
            <span className="status-dot" />A small library for thoughtful
            builders
          </p>
          <h1>
            Small details.
            <br />
            <em>Better interfaces.</em>
          </h1>
          <p className="lead">
            A little motion. A softer glow. That just-right interaction.
            <br className="desktop-break" /> React components you can copy, make
            your own, and ship.
          </p>
          <div className="hero-actions">
            <Link href="#library" className="button">
              Explore the components
            </Link>
            <Link href="/docs/quick-start" className="text-link">
              Get started
            </Link>
          </div>
          <div className="hero-meta">
            <span>React + TypeScript</span>
            <span>Tailwind CSS</span>
            <span>Your code to customize</span>
          </div>
        </div>
        <div
          className="hero-preview"
          aria-label="A preview of the Next UI component collection"
        >
          <div className="preview-toolbar">
            <span>
              <i />
              <i />
              <i />
            </span>
            <span>the little things / next-ui</span>
            <Layers size={15} />
          </div>
          <div className="preview-grid">
            <div className="sample-spotlight">
              <span className="mini-label">01 / LIGHT</span>
              <div className="sample-orb" />
              <strong>Find your spotlight.</strong>
              <span>A subtle glow. A little focus.</span>
              <MousePointer2 className="sample-cursor" size={25} />
            </div>
            <div className="sample-border">
              <span className="mini-label">02 / DETAIL</span>
              <div className="border-sample">Made to stand out.</div>
            </div>
            <div className="sample-grid">
              <span className="mini-label">03 / MOTION</span>
              <div className="grid-sample">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="preview-bottom">
            <Code2 size={15} />
            <span>Good details. No black boxes.</span>
            <span className="preview-live">● Live in your code</span>
          </div>
        </div>
      </section>
      <div className="wrap value-strip">
        <span>Built with the tools you already use.</span>
        <div>
          <img src="/brand/react.svg" width="22" height="22" alt="" />
          React
        </div>
        <div>
          <img src="/brand/typescript.svg" width="20" height="20" alt="" />
          TypeScript
        </div>
        <div>
          <img src="/brand/tailwind.svg" width="25" height="20" alt="" />
          Tailwind CSS
        </div>
        <div>
          <img src="/brand/nextdotjs.svg" width="22" height="22" alt="" />
          Next.js
        </div>
      </div>
      <section className="wrap library-section" id="library">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The component collection</p>
            <h2>
              A small change.
              <br />
              <em>A different feeling.</em>
            </h2>
          </div>
          <p>
            Preview it. Copy the source. Make it yours.
            <br />
            No package to install. No design system to replace.
          </p>
        </div>
        <ComponentCatalog />
      </section>
      <section className="getting-started-band">
        <div className="wrap">
          <div>
            <p className="eyebrow">From inspiration to implementation</p>
            <h2>
              Your next detail
              <br />
              <em>is already here.</em>
            </h2>
            <Link className="button" href="/docs/quick-start">
              Build your first component
            </Link>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <h3>Find the right feeling.</h3>
                <p>
                  Explore the live previews. Hover, interact, and see what fits.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Take the source.</h3>
                <p>Copy the component and its example into your project.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Make it your own.</h3>
                <p>
                  Adjust the colors, timing, and behavior. Every detail is
                  yours.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </>
  )
}
