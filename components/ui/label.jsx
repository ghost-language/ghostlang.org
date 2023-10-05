'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const classVariants = cva(
  'inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium space-x-2'
)

const Label = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(classVariants(), className)} {...props}>
    {children}
  </div>
))

export { Label }