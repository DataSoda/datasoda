import type { HTMLAttributes } from "react"
import { cn } from "@/lib/ui/cn"

type BadgeVariant = "neutral" | "outline" | "strong"
type BadgeSize = "xs" | "sm"

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  size?: BadgeSize
}

export function Badge(props: BadgeProps) {
  const { className, variant = "neutral", size = "xs", ...rest } = props

  const sizes: Record<BadgeSize, string> = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-1 text-[11px]",
  }

  const variants: Record<BadgeVariant, string> = {
    neutral: "rounded-full bg-neutral-100 text-neutral-700",
    outline: "rounded-full border border-neutral-300 bg-white text-neutral-700",
    strong: "rounded-full bg-neutral-900 text-neutral-50",
  }

  return (
    <span
      className={cn("inline-flex items-center font-medium", sizes[size], variants[variant], className)}
      {...rest}
    />
  )
}
