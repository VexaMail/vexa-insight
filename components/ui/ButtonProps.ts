import { type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { buttonVariants } from './buttonVariants'

export type ButtonProps = {
  asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>
