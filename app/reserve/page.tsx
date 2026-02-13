export default function ReservePage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">家事代行 予約フォーム</h1>

        <form method="POST" action="/api/reserve" className="flex flex-col gap-4">

        <input name="name" placeholder="お名前" required className="border p-2" />

        <input name="email" type="email" placeholder="メールアドレス" required className="border p-2" />

        <input name="phone" placeholder="電話番号" required className="border p-2" />

        <input name="address" placeholder="住所" required className="border p-2" />

        <input name="datetime" type="datetime-local" required className="border p-2" />

        <select name="menu" required className="border p-2">
          <option value="">メニューを選択</option>
          <option value="2時間コース">2時間コース</option>
          <option value="3時間コース">3時間コース</option>
        </select>

        <textarea name="note" placeholder="備考欄" className="border p-2" />

        <button type="submit" className="bg-blue-500 text-white p-2">
          予約する
        </button>

      </form>
    </div>
  );
}