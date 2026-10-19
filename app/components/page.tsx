import { ComponentCatalog } from "@/components/site/component-catalog"
export const metadata = {
  title: "Components",
  description:
    "Explore nine React components. Preview effects, filter by category, and copy the source."
}
export default function ComponentsPage() {
  return (
    <section className="wrap library-section" id="library">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The component collection</p>
          <h1>
            Find your next
            <br />
            <em>finishing touch.</em>
          </h1>
        </div>
        <p>
          Nine small components. Endless ways to make them yours.
          <br />
          Preview it. Copy the source. Ship the detail.
        </p>
      </div>
      <ComponentCatalog />
    </section>
  )
}
