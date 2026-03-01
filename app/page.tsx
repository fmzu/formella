import {
  HeartCard,
  CircleCard,
  EllipseCard,
  FormInput,
  FormLabel,
  FormTextarea,
  FormButton,
} from "@/components/formella"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">サイズ比較テスト</h1>

        {/* HeartCard xs/sm/md/lg */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">HeartCard（xs / sm / md / lg）</h2>
          <div className="flex flex-wrap gap-8 justify-center items-end">
            <div className="text-center">
              <HeartCard size="xs" theme="valentine">
                <FormInput placeholder="入力" />
              </HeartCard>
              <p className="mt-4 text-sm text-gray-500">xs</p>
            </div>
            <div className="text-center">
              <HeartCard size="sm" theme="valentine">
                <FormLabel>名前</FormLabel>
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </HeartCard>
              <p className="mt-4 text-sm text-gray-500">sm</p>
            </div>
            <div className="text-center">
              <HeartCard size="md" theme="valentine">
                <FormLabel>名前</FormLabel>
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </HeartCard>
              <p className="mt-4 text-sm text-gray-500">md</p>
            </div>
            <div className="text-center">
              <HeartCard size="lg" theme="valentine">
                <FormLabel>名前</FormLabel>
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </HeartCard>
              <p className="mt-4 text-sm text-gray-500">lg</p>
            </div>
          </div>
        </section>

        {/* CircleCard xs/sm/md/lg */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">CircleCard（xs / sm / md / lg）</h2>
          <div className="flex flex-wrap gap-8 justify-center items-end">
            <div className="text-center">
              <CircleCard size="xs" theme="ocean">
                <FormInput placeholder="入力" />
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">xs</p>
            </div>
            <div className="text-center">
              <CircleCard size="sm" theme="ocean">
                <FormLabel>名前</FormLabel>
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">sm</p>
            </div>
            <div className="text-center">
              <CircleCard size="md" theme="ocean">
                <FormLabel>名前</FormLabel>
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">md</p>
            </div>
            <div className="text-center">
              <CircleCard size="lg" theme="ocean">
                <FormLabel>名前</FormLabel>
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </CircleCard>
              <p className="mt-4 text-sm text-gray-500">lg</p>
            </div>
          </div>
        </section>

        {/* EllipseCard xs/sm/md/lg */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">EllipseCard（xs / sm / md / lg）</h2>
          <div className="flex flex-wrap gap-8 justify-center items-end">
            <div className="text-center">
              <EllipseCard size="xs" theme="nature">
                <FormInput placeholder="入力" />
              </EllipseCard>
              <p className="mt-4 text-sm text-gray-500">xs</p>
            </div>
            <div className="text-center">
              <EllipseCard size="sm" theme="nature">
                <FormLabel>名前</FormLabel>
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </EllipseCard>
              <p className="mt-4 text-sm text-gray-500">sm</p>
            </div>
            <div className="text-center">
              <EllipseCard size="md" theme="nature">
                <FormLabel>名前</FormLabel>
                <FormTextarea placeholder="メッセージを入力" />
                <FormButton>保存</FormButton>
              </EllipseCard>
              <p className="mt-4 text-sm text-gray-500">md</p>
            </div>
            <div className="text-center">
              <EllipseCard size="lg" theme="nature">
                <FormLabel>名前</FormLabel>
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
