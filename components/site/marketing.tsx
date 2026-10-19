import Link from "next/link"
import { Code2, SlidersHorizontal, Layers } from "lucide-react"
const benefits = [
  [
    Code2,
    "The source is the product.",
    "Copy the component into your project. Read every line, change what you need, and keep control of the implementation."
  ],
  [
    Layers,
    "A detail, not a redesign.",
    "Add a glow to a card, depth to an interaction, or texture to a section. Start with one small improvement."
  ],
  [
    SlidersHorizontal,
    "Your visual language.",
    "Shape the colors, spacing, and motion with TypeScript props and Tailwind classes. Make it feel like your product."
  ]
] as const
export function MarketingSections() {
  return (
    <>
      <section
        className="wrap marketing-section"
        aria-labelledby="benefits-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Built for the finishing touches</p>
            <h2 id="benefits-title">
              Keep your stack.
              <br />
              <em>Add some character.</em>
            </h2>
          </div>
          <p>
            You have the structure. Give it a little soul.
            <br />
            Small, editable details for the interface you already have.
          </p>
        </div>
        <div className="benefit-grid">
          {benefits.map(([Icon, title, description]) => (
            <article key={title}>
              <Icon size={23} strokeWidth={1.4} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        className="wrap marketing-section"
        aria-labelledby="showcase-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">A few possibilities</p>
            <h2 id="showcase-title">
              Make the ordinary
              <br />
              <em>feel considered.</em>
            </h2>
          </div>
          <Link className="text-link" href="/components">
            Explore all nine components
          </Link>
        </div>
        <div className="feature-stories">
          <Link href="/spotlight" className="feature-story">
            <div className="story-art story-light" aria-hidden="true">
              <span>Find your focus.</span>
            </div>
            <div>
              <span className="eyebrow">01 / Light</span>
              <h3>Draw attention gently.</h3>
              <p>
                A soft spotlight gives a simple card a little more presence.
              </p>
              <span className="text-link">Discover Spotlight</span>
            </div>
          </Link>
          <Link href="/animated-border" className="feature-story">
            <div className="story-art story-border" aria-hidden="true">
              <span>Worth a closer look.</span>
            </div>
            <div>
              <span className="eyebrow">02 / Detail</span>
              <h3>Frame what matters.</h3>
              <p>A moving edge adds emphasis without changing your layout.</p>
              <span className="text-link">Discover Animated Border</span>
            </div>
          </Link>
          <Link href="/dynamic-grid-pattern" className="feature-story">
            <div className="story-art story-pattern" aria-hidden="true">
              <span>A different dimension.</span>
            </div>
            <div>
              <span className="eyebrow">03 / Atmosphere</span>
              <h3>Give empty space purpose.</h3>
              <p>
                A geometric backdrop brings depth to a hero or a quiet section.
              </p>
              <span className="text-link">Discover Dynamic Grid</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
const questions = [
  [
    "Do I need to install a component package?",
    "No. Copy the source and usage example into your project. Install only the dependencies used by that component; the quick start walks you through them."
  ],
  [
    "Is this only for Next.js?",
    "The showcase uses Next.js, but the components are React and TypeScript with Tailwind CSS 3. Components that use browser interactions need to run on the client."
  ],
  [
    "Can I change the design?",
    "Yes. Colors, sizing, and timing live in the code you copy. Read the customization guide for the relevant props and Tailwind configuration."
  ],
  [
    "What about accessibility and motion?",
    "These are decorative effects. Keep your semantic controls, visible focus states, and readable contrast, and provide reduced-motion alternatives. The accessibility guide explains what to check."
  ]
]
export function MarketingClose() {
  return (
    <>
      <section
        className="wrap marketing-section marketing-faq"
        aria-labelledby="questions-title"
      >
        <div>
          <p className="eyebrow">Before you begin</p>
          <h2 id="questions-title">
            A few things
            <br />
            <em>worth knowing.</em>
          </h2>
          <Link className="text-link" href="/docs">
            Read the documentation
          </Link>
        </div>
        <div>
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
          <p className="license-note">
            Source is available under the{" "}
            <Link href="/docs/credits">PolyForm Shield license</Link>. Review
            its terms for your use.
          </p>
        </div>
      </section>
      <section className="marketing-final">
        <div className="wrap">
          <p className="eyebrow">Make something that feels like you</p>
          <h2>
            Your next interface.
            <br />
            <em>One detail better.</em>
          </h2>
          <p>Start small. Find an effect you love. Make it your own.</p>
          <div className="hero-actions">
            <Link className="button" href="/components">
              Find your first component
            </Link>
            <Link className="text-link" href="/docs/quick-start">
              Read the quick start
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
