import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            家事代行予約サイトへようこそ
          </h1>

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            予約はこちらのリンクから簡単に行えます。
          </p>

          {/* 予約フォームボタン */}
          <Link href="/reserve">
            <button className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition">
              予約フォームへ
            </button>
          </Link>

          {/* ★ 追加：予約完了ページ確認用 */}
          <Link href="/thanks">
            <button className="rounded-full bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition">
              予約完了ページを見る
            </button>
          </Link>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
        </div>
      </main>
    </div>
  );
}
