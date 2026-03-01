export interface FormellaTheme {
  primary: string   // カード背景色
  border: string    // 枠線色
  text: string      // テキスト色
  inputBg: string   // フォーム入力欄の背景色
}

export const themes: Record<string, FormellaTheme> = {
  valentine: {
    primary: '#FCE4EC',
    border: '#F48FB1',
    text: '#880E4F',
    inputBg: '#FFFFFF',
  },
  pastel: {
    primary: '#F3E5F5',
    border: '#CE93D8',
    text: '#4A148C',
    inputBg: '#FFFFFF',
  },
  nature: {
    primary: '#E8F5E9',
    border: '#81C784',
    text: '#1B5E20',
    inputBg: '#FFFFFF',
  },
  ocean: {
    primary: '#E3F2FD',
    border: '#64B5F6',
    text: '#0D47A1',
    inputBg: '#FFFFFF',
  },
}

export const defaultTheme: FormellaTheme = {
  primary: '#F5F5F5',
  border: '#E0E0E0',
  text: '#424242',
  inputBg: '#FFFFFF',
}

export type ThemeName = keyof typeof themes
