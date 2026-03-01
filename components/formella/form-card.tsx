"use client"

import { type CSSProperties, type ReactNode, createContext, useContext } from "react"
import { cn } from "@/lib/utils"
import { themes, defaultTheme, type ThemeName } from "./themes"

// カードサイズをchildrenに伝えるコンテキスト
const CardSizeContext = createContext<CardSize | null>(null)
export function useCardSize() { return useContext(CardSizeContext) }

// カード全体のサイズ（px）
const CARD_SIZE = {
  xs: { width: 160, height: 160 },
  sm: { width: 240, height: 240 },
  md: { width: 360, height: 360 },
  lg: { width: 480, height: 480 },
} as const

// 安全エリアのパディング（形状・サイズごと）
const SAFE_AREA_PADDING: Record<CardShape, Record<CardSize, { top: string; left: string; right: string; bottom: string }>> = {
  heart: {
    xs: { top: '18%', left: '26%', right: '26%', bottom: '34%' },
    sm: { top: '22%', left: '22%', right: '22%', bottom: '26%' },
    md: { top: '20%', left: '22%', right: '22%', bottom: '28%' },
    lg: { top: '20%', left: '22%', right: '22%', bottom: '28%' },
  },
  circle: {
    xs: { top: '12%', left: '12%', right: '12%', bottom: '12%' },
    sm: { top: '15%', left: '15%', right: '15%', bottom: '15%' },
    md: { top: '15%', left: '15%', right: '15%', bottom: '15%' },
    lg: { top: '15%', left: '15%', right: '15%', bottom: '15%' },
  },
  ellipse: {
    xs: { top: '12%', left: '8%', right: '8%', bottom: '10%' },
    sm: { top: '16%', left: '14%', right: '14%', bottom: '14%' },
    md: { top: '16%', left: '12%', right: '12%', bottom: '14%' },
    lg: { top: '16%', left: '12%', right: '12%', bottom: '14%' },
  },
}

// ハート型SVGクリップパスのID
const HEART_CLIP_ID = "formella-heart-clip"

export type CardShape = 'heart' | 'circle' | 'ellipse'
export type CardSize = 'xs' | 'sm' | 'md' | 'lg'
export type CardOverflow = 'hidden' | 'scroll' | 'visible'

export interface FormCardBaseProps {
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
  const padding = SAFE_AREA_PADDING[shape][size]
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
      {/* 外側ラッパー */}
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
              size === 'xs' && "gap-0.5 text-[10px]",
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
            <CardSizeContext value={size}>
              {children}
            </CardSizeContext>
          </div>
        </div>
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
