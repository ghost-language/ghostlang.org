'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const classVariants = cva(
  'mx-auto mt-6 mb-24 lg:mx-0 lg:max-w-none'
)

const Container = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(classVariants(), className)} {...props}>
    {children}
  </div>
))

export { Container }