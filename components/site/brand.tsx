import Link from "next/link"
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Next UI home">
      <img src="/brand/mark.svg" width="32" height="32" alt="" />
      <span>
        smeltery<span className="brand-sub"> / next-ui</span>
      </span>
    </Link>
  )
}
