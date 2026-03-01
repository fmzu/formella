"use client"

import { FormCard, type FormCardBaseProps } from "./form-card"

export interface EllipseCardProps extends FormCardBaseProps {
  /** 高さ/幅の比率（デフォルト: 0.75） */
  aspectRatio?: number
}

export function EllipseCard({ aspectRatio, ...props }: EllipseCardProps) {
  return <FormCard shape="ellipse" aspectRatio={aspectRatio} {...props} />
}
