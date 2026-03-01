"use client"

import { type TextareaHTMLAttributes, useState } from "react"
import { cn } from "@/lib/utils"
import { useCardSize } from "./form-card"

export type FormTextareaVariant = 'default' | 'underline' | 'ghost'

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: FormTextareaVariant
  /** 文字数カウント表示 */
  showCount?: boolean
}

const variantClasses: Record<FormTextareaVariant, string> = {
  default: "border border-[var(--formella-border)] rounded-md bg-[var(--formella-input-bg)]",
  underline: "border-b-2 border-[var(--formella-border)] bg-transparent rounded-none",
  ghost: "border-none bg-transparent",
}

export function FormTextarea({
  variant = 'default',
  showCount = false,
  maxLength,
  rows,
  className,
  onChange,
  ...props
}: FormTextareaProps) {
  const [count, setCount] = useState(0)
  const cardSize = useCardSize()
  const defaultRows = cardSize === 'sm' ? 2 : 3

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.target.value.length)
    onChange?.(e)
  }

  return (
    <div className="w-full relative">
      <textarea
        className={cn(
          "w-full px-3 py-2 text-sm outline-none resize-none placeholder:text-gray-400",
          "text-[var(--formella-text)]",
          "focus:ring-2 focus:ring-[var(--formella-border)] focus:ring-opacity-50",
          variantClasses[variant],
          className,
        )}
        maxLength={maxLength}
        onChange={handleChange}
        rows={rows ?? defaultRows}
        {...props}
      />
      {showCount && (
        <span className="absolute bottom-2 right-3 text-xs text-gray-400">
          {count}{maxLength ? `/${maxLength}` : ''}
        </span>
      )}
    </div>
  )
}
