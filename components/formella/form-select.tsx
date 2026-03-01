"use client"

import { type SelectHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'underline' | 'ghost'
}

const variantClasses = {
  default: "border border-[var(--formella-border)] rounded-md bg-[var(--formella-input-bg)]",
  underline: "border-b-2 border-[var(--formella-border)] bg-transparent rounded-none",
  ghost: "border-none bg-transparent",
}

export function FormSelect({ variant = 'default', className, ...props }: FormSelectProps) {
  return (
    <select
      className={cn(
        "w-full px-3 py-2 text-sm outline-none",
        "text-[var(--formella-text)]",
        "focus:ring-2 focus:ring-[var(--formella-border)] focus:ring-opacity-50",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}
