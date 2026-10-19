import { ArrowDown } from "lucide-react"
import { BrandPalette } from "@/components/site/brand-palette"
export const metadata = {
  title: "Brand & assets",
  description:
    "The Next UI identity: original logos, social preview, monochrome palette, typography, and downloadable assets."
}
const downloads = [
  ["Vector mark", "SVG · original colors · scalable", "/brand/mark.svg"],
  ["Social preview", "PNG · 1200 × 630", "/brand/og.png"],
  ["Browser icon", "PNG · 32 × 32", "/brand/icon.png"]
]
export default function BrandPage() {
  return (
    <div className="wrap brand-page">
      <div className="brand-intro">
        <p className="brand-kicker">Next UI / Brand & assets</p>
        <h1>
          Small details.
          <br />
          <em>A little character.</em>
        </h1>
        <p className="brand-lede">
          The pieces that make Next UI feel like itself. For your next README,
          project mention, or introduction to the library.
        </p>
        <a className="button" href="#downloads">
          Get the assets <ArrowDown size={17} />
        </a>
      </div>
      <section aria-labelledby="mark-title">
        <p className="brand-kicker">01 / The mark</p>
        <h2 id="mark-title">
          One letter. <em>Room for detail.</em>
        </h2>
        <p className="brand-lede">
          Our N monogram gives the library a clear signature. Keep its original
          colors and proportions, with plenty of space around it.
        </p>
        <div className="brand-marks">
          <figure className="brand-mark-preview">
            <img
              src="/brand/mark.svg"
              width="150"
              height="150"
              alt="Next UI N monogram"
            />
            <figcaption>Original mark</figcaption>
          </figure>
          <figure className="brand-signature-preview">
            <div className="brand-signature">
              <img src="/brand/mark.svg" width="56" height="56" alt="" />
              <span>
                smeltery <span className="brand-signature-sub">/ next-ui</span>
              </span>
            </div>
            <figcaption>The library signature</figcaption>
          </figure>
        </div>
      </section>
      <section aria-labelledby="social-title">
        <p className="brand-kicker">02 / The first impression</p>
        <h2 id="social-title">
          Small details. <em>Worth sharing.</em>
        </h2>
        <p className="brand-lede">
          Our social preview pairs the wordmark with a one-bit dithered N. Use
          the original PNG for link previews and project introductions.
        </p>
        <figure className="brand-social">
          <img
            src="/brand/og.png"
            width="1200"
            height="630"
            loading="lazy"
            alt="Next UI social preview: Small details. Better interfaces. Beside a dithered N monogram."
          />
        </figure>
      </section>
      <section aria-labelledby="colors-title">
        <p className="brand-kicker">03 / Color</p>
        <h2 id="colors-title">
          Quiet colors. <em>Clear intent.</em>
        </h2>
        <p className="brand-lede">
          Black, white, and shades in between. Use light text on dark surfaces
          and dark text on light buttons. Select a color to copy its hex value.
        </p>
        <BrandPalette />
      </section>
      <section aria-labelledby="type-title">
        <p className="brand-kicker">04 / Typography</p>
        <h2 id="type-title">
          A useful voice. <em>A human touch.</em>
        </h2>
        <div className="brand-type-list">
          <article>
            <p className="brand-kicker">DM Sans / Interface</p>
            <p className="brand-type-sample">
              Small details. Better interfaces.
            </p>
            <p>
              Our everyday voice for headings, navigation, and comfortable
              reading.
            </p>
          </article>
          <article>
            <p className="brand-kicker">Georgia / Emphasis</p>
            <p className="brand-type-sample brand-type-serif">
              With room to breathe.
            </p>
            <p>A softer accent for a few well-chosen words.</p>
          </article>
          <article>
            <p className="brand-kicker">System monospace / Code</p>
            <p className="brand-type-sample brand-type-mono">git clone</p>
            <p>
              Commands and technical details, using the monospace font on your
              device.
            </p>
          </article>
        </div>
      </section>
      <section id="downloads" aria-labelledby="downloads-title">
        <p className="brand-kicker">05 / The toolkit</p>
        <h2 id="downloads-title">
          Ready for your <em>next mention.</em>
        </h2>
        <p className="brand-lede">
          Download the original files, individually. Use them to identify Next
          UI and link back to the project.
        </p>
        <ul className="brand-downloads">
          {downloads.map(([title, description, href]) => (
            <li key={href}>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <a
                className="button secondary"
                href={href}
                download
                aria-label={`Download ${title.toLowerCase()}`}
              >
                Download <ArrowDown size={16} />
              </a>
            </li>
          ))}
        </ul>
        <div className="brand-guidance">
          <h3>A little care goes a long way.</h3>
          <p>
            Use “Next UI” in prose and keep the mark intact. Leave clear space
            around it, avoid stretching or recoloring, and choose a simple
            background. These assets identify the library; they don’t imply
            endorsement.
          </p>
        </div>
      </section>
    </div>
  )
}
