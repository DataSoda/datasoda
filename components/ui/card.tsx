import type { HTMLAttributes } from "react"
import { cn } from "@/lib/ui/cn"

type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean
}

export function Card(props: CardProps) {
  const { className, interactive = false, ...rest } = props

  const base = "rounded-2xl border border-neutral-200 bg-white shadow-sm"
  const interactiveClasses = interactive
    ? "transition-colors hover:border-neutral-300 hover:bg-neutral-50"
    : ""

  return (
    <div
      className={cn(base, interactiveClasses, className)}
      {...rest}
    />
  )
}
