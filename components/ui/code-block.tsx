import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/ui/cn"
import { typography } from "@/lib/ui/typography"

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  children: ReactNode
  dense?: boolean
}

export function CodeBlock(props: CodeBlockProps) {
  const { className, children, dense = false, ...rest } = props

  const padding = dense ? "px-3 py-2" : "px-4 py-3"

  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl bg-neutral-900 text-neutral-50",
        typography.code,
        padding,
        className,
      )}
      {...rest}
    >
      {children}
    </pre>
  )
}
