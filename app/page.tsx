import Link from "next/link"
import { HeroPreview } from "@/components/site/hero-preview"
import { MarketingSections, MarketingClose } from "@/components/site/marketing"
export default function Home() {
  return (
    <>
      <section className="wrap home-hero">
        <div>
          <p className="eyebrow">
            <span className="status-dot" />
            Copy-and-paste React components
          </p>
          <h1>
            Better React UI.
            <br />
            <em>Copy. Paste. Ship.</em>
          </h1>
          <p className="lead">
            Spotlights, animated borders, and backgrounds—ready to copy into
            your app. Pick an effect, take the React code, and make it yours.
          </p>
          <div className="hero-actions">
            <Link href="/components" className="button">
              Explore 9 components
            </Link>
            <Link href="/docs/quick-start" className="text-link">
              How to use them
            </Link>
          </div>
          <div className="hero-meta">
            <span>Editable source</span>
            <span>React + Tailwind CSS</span>
            <span>No UI package</span>
          </div>
        </div>
        <HeroPreview />
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
      <MarketingSections />
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
      <MarketingClose />
    </>
  )
}
