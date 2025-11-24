import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/ui/cn"
import { typography, layout } from "@/lib/ui/typography"

type SectionProps = HTMLAttributes<HTMLElement> & {
  title: string
  description?: string
  tight?: boolean
  children?: ReactNode
}

export function Section(props: SectionProps) {
  const { title, description, tight = false, children, className, ...rest } = props

  return (
    <section
      className={cn(tight ? layout.sectionTight : layout.section, className)}
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
