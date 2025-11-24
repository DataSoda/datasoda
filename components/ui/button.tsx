import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react"
import { cloneElement, isValidElement } from "react"
import { cn } from "@/lib/ui/cn"

type ButtonSize = "sm" | "md"
type ButtonVariant = "primary" | "secondary" | "ghost"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize
  variant?: ButtonVariant
  asChild?: boolean
  children?: ReactNode
}

export function Button(props: ButtonProps) {
  const { size = "md", variant = "primary", asChild = false, className, children, ...rest } = props

  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50"
  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
  }
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-pink-600 text-white hover:bg-pink-700",
    secondary: "border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400",
    ghost: "text-neutral-700 hover:bg-neutral-100",
  }

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement
    return cloneElement(child, {
      className: cn(base, sizes[size], variants[variant], (child.props as any).className, className),
      ...rest,
    })
  }

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  )
}
