'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const classVariants = cva(
  'text-base text-muted-foreground sm:text-xl'
)

const Subtitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(classVariants(), className)} {...props}>
    {children}
  </div>
))

export { Subtitle }