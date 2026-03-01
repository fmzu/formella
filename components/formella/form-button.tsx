"use client"

import { type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export type FormButtonVariant = 'default' | 'outline' | 'ghost'

export interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: FormButtonVariant
}

const variantClasses: Record<FormButtonVariant, string> = {
  default: "bg-[var(--formella-border)] text-white hover:opacity-90",
  outline: "border-2 border-[var(--formella-border)] text-[var(--formella-text)] bg-transparent hover:bg-[var(--formella-border)] hover:text-white",
  ghost: "text-[var(--formella-text)] bg-transparent hover:bg-black/5",
}

export function FormButton({ variant = 'default', className, ...props }: FormButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}
