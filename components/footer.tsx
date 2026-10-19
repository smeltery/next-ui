import Link from "next/link"
import { Github } from "lucide-react"
import { Brand } from "./site/brand"
const groups = [
  {
    title: "The library",
    links: [
      ["All components", "/#library"],
      ["Borders & light", "/#library"],
      ["Motion & backgrounds", "/#library"]
    ]
  },
  {
    title: "Resources",
    links: [
      ["Brand & assets", "/docs/brand"],
      ["Documentation", "/docs"],
      ["Getting started", "/docs/quick-start"],
      ["Our approach", "/docs/approach"],
      ["Contributing", "/docs/contributing"]
    ]
  },
  {
    title: "In the open",
    links: [
      ["About Smeltery", "https://github.com/smeltery"],
      ["Contact", "https://github.com/smeltery/next-ui/issues/new"],
      ["Privacy", "/docs/privacy"],
      ["GitHub repository", "https://github.com/smeltery/next-ui"],
      ["Feedback & issues", "https://github.com/smeltery/next-ui/issues"],
      ["Credits & acknowledgments", "/docs/credits"]
    ]
  }
]
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              A little interaction.
              <br />A lot more character.
            </p>
            <span>Thoughtful components for the interfaces you build.</span>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className={
                    label === "GitHub repository" ? "icon-link" : undefined
                  }
                >
                  {label === "GitHub repository" && <Github size={15} />}{" "}
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Smeltery Labs</span>
          <a href="https://github.com/smeltery/next-ui/blob/master/LICENSE">
            PolyForm Shield license
          </a>
          <span className="footer-note">Built for the way you work.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
