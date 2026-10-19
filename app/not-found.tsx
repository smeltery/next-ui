import Link from "next/link"
export default function NotFound() {
  return (
    <div className="wrap component-page">
      <p className="eyebrow">404 / A missing detail</p>
      <h1>This page isn’t here.</h1>
      <p className="lead">
        Find a component in the library, or start with the documentation.
      </p>
      <div className="hero-actions">
        <Link className="button" href="/">
          Explore components
        </Link>
        <Link className="text-link" href="/docs">
          Read the docs
        </Link>
      </div>
    </div>
  )
}
