import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY" },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const formData = await req.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const datetime = formData.get("datetime") as string;
  const menu = formData.get("menu") as string;
  const note = formData.get("note") as string;

  // Supabase保存
  const { error } = await supabase.from("reservations").insert([
    { name, email, phone, address, datetime, menu, note },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // お客様メール
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "ご予約ありがとうございます",
    html: `
      <h2>${name}様</h2>
      <p>ご予約ありがとうございます。</p>
      <p><strong>日時:</strong> ${datetime}</p>
      <p><strong>メニュー:</strong> ${menu}</p>
    `,
  });

  // 管理者メール
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "tengjingkoumei@gmail.com",
    subject: "【新規予約】予約が入りました",
    html: `
      <h2>新しい予約</h2>
      <p>名前: ${name}</p>
      <p>メール: ${email}</p>
      <p>電話: ${phone}</p>
      <p>住所: ${address}</p>
      <p>日時: ${datetime}</p>
      <p>メニュー: ${menu}</p>
      <p>備考: ${note}</p>
    `,
  });

  return NextResponse.json({ message: "予約完了（メール送信済み）" });
}
