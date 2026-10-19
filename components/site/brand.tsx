import Link from "next/link"
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Next UI home">
      <img src="/brand/mark.svg" width="32" height="32" alt="" />
      <span>
        <span className="brand-org">smeltery</span>
        <span className="brand-sub">
          <span className="brand-divider"> / </span>next-ui
        </span>
      </span>
    </Link>
  )
}
