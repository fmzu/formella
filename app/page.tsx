import {
  HeartCard,
  CircleCard,
  EllipseCard,
  FormTextarea,
  FormButton,
} from "@/components/formella"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">サイズ比較テスト</h1>

        {/* HeartCard sm/md/lg */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">HeartCard（sm / md / lg）</h2>
          <div className="flex flex-wrap gap-8 justify-center items-end">
            <div className="text-center">
              <HeartCard size="sm" theme="valentine" label="名前">
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </HeartCard>
              <p className="mt-4 text-sm text-gray-500">sm</p>
            </div>
            <div className="text-center">
              <HeartCard size="md" theme="valentine" label="名前">
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </HeartCard>
              <p className="mt-4 text-sm text-gray-500">md</p>
            </div>
            <div className="text-center">
              <HeartCard size="lg" theme="valentine" label="名前">
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </HeartCard>
              <p className="mt-4 text-sm text-gray-500">lg</p>
            </div>
          </div>
        </section>

        {/* CircleCard sm/md/lg */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">CircleCard（sm / md / lg）</h2>
          <div className="flex flex-wrap gap-8 justify-center items-end">
            <div className="text-center">
              <CircleCard size="sm" theme="ocean" label="名前">
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">sm</p>
            </div>
            <div className="text-center">
              <CircleCard size="md" theme="ocean" label="名前">
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">md</p>
            </div>
            <div className="text-center">
              <CircleCard size="lg" theme="ocean" label="名前">
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">lg</p>
            </div>
          </div>
        </section>

        {/* EllipseCard sm/md/lg */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">EllipseCard（sm / md / lg）</h2>
          <div className="flex flex-wrap gap-8 justify-center items-end">
            <div className="text-center">
              <EllipseCard size="sm" theme="nature" label="名前">
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </EllipseCard>
              <p className="mt-4 text-sm text-gray-500">sm</p>
            </div>
            <div className="text-center">
              <EllipseCard size="md" theme="nature" label="名前">
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </EllipseCard>
              <p className="mt-4 text-sm text-gray-500">md</p>
            </div>
            <div className="text-center">
              <EllipseCard size="lg" theme="nature" label="名前">
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </EllipseCard>
              <p className="mt-4 text-sm text-gray-500">lg</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
