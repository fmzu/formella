"use client"

import { type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { FormCard, type FormCardBaseProps } from "./form-card"

export interface HeartCardProps extends FormCardBaseProps {
  /** 傾き角度（-15 ~ 15度） */
  tilt?: number
}

export function HeartCard({ tilt = 0, className, ...props }: HeartCardProps) {
  const style: CSSProperties | undefined = tilt !== 0
    ? { transform: `rotate(${tilt}deg)` }
    : undefined

  return (
    <div style={style} className={cn("inline-block", className)}>
      <FormCard shape="heart" {...props} />
    </div>
  )
}
