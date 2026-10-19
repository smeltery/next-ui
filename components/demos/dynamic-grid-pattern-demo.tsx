import { DynamicGridPattern } from "@/examples/dynamic-grid-pattern"

export const DynamicGridPatternDemo = () => {
  return (
    <div className="flex size-full items-center justify-center min-h-56">
      <div className="bg-background pointer-events-none absolute inset-0 z-20 size-full [mask-image:radial-gradient(transparent,white)]" />
      <DynamicGridPattern numOfCols={16} numOfRows={16} />
      <div className="relative z-20 flex flex-col items-center justify-center">
        <h3 className="text-card-foreground text-xl shadow-sm">
          Dynamic Grid Pattern
        </h3>
        <p className="text-muted-foreground text-sm">Hover me</p>
      </div>
    </div>
  )
}
