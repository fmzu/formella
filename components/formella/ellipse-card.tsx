"use client"

import { FormCard, type FormCardBaseProps } from "./form-card"

export interface EllipseCardProps extends FormCardBaseProps {
  /** 縦横比（デフォルト: '4/3'） */
  aspectRatio?: string
}

export function EllipseCard({ aspectRatio, ...props }: EllipseCardProps) {
  return <FormCard shape="ellipse" {...props} />
}
