import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/*export async function POST(req: Request) {
  const formData = await req.formData();

  const { error } = await supabase.from("reservations").insert([
    {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      datetime: formData.get("datetime"),
      menu: formData.get("menu"),
      note: formData.get("note"),
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "予約完了" });
}
*/
export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const datetime = formData.get("datetime") as string;
  const menu = formData.get("menu") as string;
  const note = formData.get("note") as string;

  // ① Supabase保存
  const { error } = await supabase.from("reservations").insert([
    { name, email, phone, address, datetime, menu, note },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // ② お客様へメール送信
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "ご予約ありがとうございます",
    html: `
      <h2>${name}様</h2>
      <p>ご予約ありがとうございます。</p>
      <p><strong>日時:</strong> ${datetime}</p>
      <p><strong>メニュー:</strong> ${menu}</p>
      <p>当日お伺いします。</p>
    `,
  });


  await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "tengjingkoumei@gmail.com", // ←ここに自分のメール
  subject: "【新規予約】予約が入りました",
  html: `
    <h2>新しい予約が入りました</h2>
    <p><strong>名前:</strong> ${name}</p>
    <p><strong>メール:</strong> ${email}</p>
    <p><strong>電話:</strong> ${phone}</p>
    <p><strong>住所:</strong> ${address}</p>
    <p><strong>日時:</strong> ${datetime}</p>
    <p><strong>メニュー:</strong> ${menu}</p>
    <p><strong>備考:</strong> ${note}</p>
  `,
});


  return NextResponse.json({ message: "予約完了（メール送信済み）" });
}