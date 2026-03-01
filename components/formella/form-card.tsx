"use client"

import { type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { themes, defaultTheme, type ThemeName } from "./themes"

// カード全体のサイズ（px）
const CARD_SIZE = {
  sm: { width: 240, height: 240 },
  md: { width: 360, height: 360 },
  lg: { width: 480, height: 480 },
} as const

// 安全エリアのパディング率（形状ごと）
const SAFE_AREA_PADDING = {
  heart: { top: '22%', left: '18%', right: '18%', bottom: '28%' },
  circle: { top: '15%', left: '15%', right: '15%', bottom: '15%' },
  ellipse: { top: '20%', left: '12%', right: '12%', bottom: '20%' },
} as const

// ハート型SVGクリップパスのID
const HEART_CLIP_ID = "formella-heart-clip"

// ラベルバッジのサイズ別スタイル
const LABEL_BADGE_SIZE = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-0.5 text-xs",
  lg: "px-4 py-1 text-sm",
} as const

export type CardShape = 'heart' | 'circle' | 'ellipse'
export type CardSize = 'sm' | 'md' | 'lg'
export type CardOverflow = 'hidden' | 'scroll' | 'visible'

export interface FormCardBaseProps {
  /** カード上端に表示するラベル */
  label?: ReactNode
  size?: CardSize
  theme?: ThemeName
  color?: string
  borderColor?: string
  shadow?: boolean
  overflow?: CardOverflow
  className?: string
  children: ReactNode
}

export interface FormCardProps extends FormCardBaseProps {
  shape: CardShape
  aspectRatio?: number
}

export function FormCard({
  shape,
  label,
  size = 'md',
  theme,
  color,
  borderColor,
  shadow = true,
  overflow = 'hidden',
  aspectRatio,
  className,
  children,
}: FormCardProps) {
  const resolved = theme ? (themes[theme] ?? defaultTheme) : defaultTheme
  const padding = SAFE_AREA_PADDING[shape]
  const cardSize = CARD_SIZE[size]

  // テーマカラーをCSS変数として注入（個別指定があれば上書き）
  const style = {
    '--formella-primary': color ?? resolved.primary,
    '--formella-border': borderColor ?? resolved.border,
    '--formella-text': resolved.text,
    '--formella-input-bg': resolved.inputBg,
    width: cardSize.width,
    height: shape === 'ellipse' ? cardSize.width * (aspectRatio ?? 0.75) : cardSize.height,
  } as CSSProperties

  // 形状ごとのクラスとスタイル
  const shapeStyles = getShapeStyles(shape)

  return (
    <>
      {/* ハート型のSVGクリップパス定義（相対座標で全サイズ対応） */}
      {shape === 'heart' && (
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id={HEART_CLIP_ID} clipPathUnits="objectBoundingBox">
              <path d="M0.5,0.875 C0.109,0.531 0,0.281 0.25,0.156 C0.375,0.094 0.5,0.219 0.5,0.219 S0.625,0.094 0.75,0.156 C1,0.281 0.891,0.531 0.5,0.875 Z" />
            </clipPath>
          </defs>
        </svg>
      )}
      {/* 外側ラッパー: ラベルバッジはこの中でclip-pathの外に配置 */}
      <div className="relative inline-block" style={style}>
        <div
          className={cn(
            "relative w-full h-full inline-flex items-center justify-center",
            shadow && "drop-shadow-lg",
            className,
          )}
          style={shapeStyles}
        >
          {/* 安全エリア: ここにフォーム要素が入る */}
          <div
            className={cn(
              "absolute flex flex-col items-center justify-center",
              size === 'sm' && "gap-1 text-xs",
              size === 'md' && "gap-2 text-sm",
              size === 'lg' && "gap-3 text-base",
            )}
            style={{
              top: padding.top,
              left: padding.left,
              right: padding.right,
              bottom: padding.bottom,
              overflow: overflow,
              color: 'var(--formella-text)',
            }}
          >
            {children}
          </div>
        </div>
        {/* ラベルバッジ: clip-pathの外、カード上端に重なる */}
        {label && (
          <div
            className={cn(
              "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10",
              "rounded-full font-semibold whitespace-nowrap",
              "shadow-sm border",
              LABEL_BADGE_SIZE[size],
            )}
            style={{
              backgroundColor: 'var(--formella-primary)',
              borderColor: 'var(--formella-border)',
              color: 'var(--formella-text)',
            }}
          >
            {label}
          </div>
        )}
      </div>
    </>
  )
}

function getShapeStyles(shape: CardShape): CSSProperties {
  switch (shape) {
    case 'heart':
      return {
        clipPath: `url(#${HEART_CLIP_ID})`,
        backgroundColor: 'var(--formella-primary)',
      }
    case 'circle':
      return {
        borderRadius: '50%',
        aspectRatio: '1',
        backgroundColor: 'var(--formella-primary)',
      }
    case 'ellipse':
      return {
        borderRadius: '50%',
        backgroundColor: 'var(--formella-primary)',
      }
  }
}
