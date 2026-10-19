import Link from "next/link"
import { MarketingSections, MarketingClose } from "@/components/site/marketing"
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
            <Link href="/components" className="button">
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
          className="hero-specimen"
          aria-label="A dithered N monogram: light, motion, and detail"
        >
          <div className="specimen-top">
            <span>FIG. 001 — THE INTERFACE STUDY</span>
            <span>1 BIT / ∞ POSSIBILITIES</span>
          </div>
          <img
            className="dither-mark"
            src="/brand/dither.svg"
            width="600"
            height="540"
            alt=""
          />
          <span className="specimen-cross cross-top" aria-hidden="true">
            +
          </span>
          <span className="specimen-cross cross-bottom" aria-hidden="true">
            +
          </span>
          <div className="specimen-caption">
            <span>
              01 LIGHT
              <br />
              02 MOTION
              <br />
              03 DETAIL
            </span>
            <strong>
              Less noise.
              <br />
              <em>More feeling.</em>
            </strong>
          </div>
          <div className="specimen-bottom">
            <span>RAW MATERIAL FOR YOUR NEXT IDEA</span>
            <span>next-ui / 001</span>
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
