"use client"

import { FormCard, type FormCardBaseProps } from "./form-card"

export type CircleCardProps = FormCardBaseProps

export function CircleCard(props: CircleCardProps) {
  return <FormCard shape="circle" {...props} />
}
