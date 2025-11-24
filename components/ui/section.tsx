import type { ReactNode, HTMLAttributes } from "react"
import { cn } from "@/lib/ui/cn"
import { typography } from "@/lib/ui/typography"

type SectionProps = HTMLAttributes<HTMLElement> & {
  title: string
  description?: string
  children?: ReactNode
}

export function Section(props: SectionProps) {
  const { title, description, children, className, ...rest } = props

  return (
    <section
      className={cn("mt-10", className)}
      {...rest}
    >
      <header className="mb-4">
        <h2 className={typography.sectionTitle}>{title}</h2>
        {description ? (
          <p className={typography.sectionDescription}>{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  )
}
