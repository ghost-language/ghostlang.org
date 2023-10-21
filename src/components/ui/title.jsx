'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const classVariants = cva(
  'text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]'
)

const Title = React.forwardRef(({ className, children, ...props }, ref) => (
  <h1 ref={ref} className={cn(classVariants(), className)} {...props}>
    {children}
  </h1>
))

export { Title }