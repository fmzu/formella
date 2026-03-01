import {
  HeartCard,
  CircleCard,
  EllipseCard,
  FormInput,
  FormTextarea,
  FormButton,
  FormLabel,
  FormSelect,
} from "@/components/formella"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Formella</h1>
        <p className="text-center text-gray-500 mb-12">
          メッセージカード風フォームUIライブラリ
        </p>

        {/* ハートカード */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">HeartCard</h2>
          <div className="flex flex-wrap gap-8 justify-center items-start">
            <div className="text-center">
              <HeartCard size="lg" theme="valentine">
                <FormLabel>メッセージ</FormLabel>
                <FormTextarea
                  placeholder="お誕生日おめでとう！"
                  variant="ghost"
                  maxLength={100}
                  showCount
                />
                <FormButton>送る</FormButton>
              </HeartCard>
              <p className="mt-4 text-sm text-gray-500">valentine / lg</p>
            </div>

            <div className="text-center">
              <HeartCard size="md" theme="pastel" tilt={5}>
                <FormLabel>ひとこと</FormLabel>
                <FormInput placeholder="ありがとう！" variant="underline" />
                <FormButton variant="outline">送信</FormButton>
              </HeartCard>
              <p className="mt-4 text-sm text-gray-500">pastel / md / tilt=5</p>
            </div>
          </div>
        </section>

        {/* 丸カード */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">CircleCard</h2>
          <div className="flex flex-wrap gap-8 justify-center items-start">
            <div className="text-center">
              <CircleCard size="lg" theme="ocean">
                <FormLabel>お名前</FormLabel>
                <FormInput placeholder="名前を入力" />
                <FormButton>OK</FormButton>
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">ocean / lg</p>
            </div>

            <div className="text-center">
              <CircleCard size="md" theme="nature">
                <FormLabel>評価</FormLabel>
                <FormSelect>
                  <option value="">選択してください</option>
                  <option value="good">良い</option>
                  <option value="normal">普通</option>
                  <option value="bad">悪い</option>
                </FormSelect>
                <FormButton variant="ghost">送る</FormButton>
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">nature / md</p>
            </div>
          </div>
        </section>

        {/* 楕円カード */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">EllipseCard</h2>
          <div className="flex flex-wrap gap-8 justify-center items-start">
            <div className="text-center">
              <EllipseCard size="lg">
                <FormLabel>コメント</FormLabel>
                <FormInput placeholder="コメントを入力" />
                <FormButton>投稿</FormButton>
              </EllipseCard>
              <p className="mt-4 text-sm text-gray-500">default / lg</p>
            </div>

            <div className="text-center">
              <EllipseCard size="md" color="#FFF3E0" borderColor="#FFB74D">
                <FormLabel>メモ</FormLabel>
                <FormInput placeholder="メモを入力" variant="underline" />
                <FormButton variant="outline">保存</FormButton>
              </EllipseCard>
              <p className="mt-4 text-sm text-gray-500">custom color / md</p>
            </div>
          </div>
        </section>

        {/* overflow デモ */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Overflow制御</h2>
          <div className="flex flex-wrap gap-8 justify-center items-start">
            <div className="text-center">
              <CircleCard size="md" theme="valentine" overflow="scroll">
                <FormLabel>スクロールモード</FormLabel>
                <FormInput placeholder="名前" />
                <FormInput placeholder="メール" />
                <FormTextarea placeholder="メッセージ" />
                <FormButton>送信</FormButton>
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">overflow=&quot;scroll&quot;</p>
            </div>

            <div className="text-center">
              <CircleCard size="md" theme="ocean" overflow="hidden">
                <FormLabel>非表示モード</FormLabel>
                <FormInput placeholder="名前" />
                <FormInput placeholder="メール" />
                <FormTextarea placeholder="メッセージ" />
                <FormButton>送信</FormButton>
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">overflow=&quot;hidden&quot;</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
