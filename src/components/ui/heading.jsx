'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const classVariants = cva(
  'flex flex-col max-w-[750px] gap-2 py-12'
)

const Heading = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(classVariants(), className)} {...props}>
    {children}
  </div>
))

export { Heading }