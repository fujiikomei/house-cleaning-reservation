import Link from "next/link";

export default function ThanksPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          ご予約ありがとうございます！
        </h1>

        <p className="text-gray-600 mb-6">
          予約を受け付けました。
        </p>

        <Link
          href="/"
          className="inline-block rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
        >
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
}
