"use client"

import { type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export type FormInputVariant = 'default' | 'underline' | 'ghost'

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: FormInputVariant
}

const variantClasses: Record<FormInputVariant, string> = {
  default: "border border-[var(--formella-border)] rounded-md bg-[var(--formella-input-bg)]",
  underline: "border-b-2 border-[var(--formella-border)] bg-transparent rounded-none",
  ghost: "border-none bg-transparent",
}

export function FormInput({ variant = 'default', className, ...props }: FormInputProps) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 text-sm outline-none placeholder:text-gray-400",
        "text-[var(--formella-text)]",
        "focus:ring-1 focus:ring-[var(--formella-border)]/40",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}
