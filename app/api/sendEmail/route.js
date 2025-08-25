import { sendEmail } from "@/helper/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { to, subject, text } = await req.json();
  await sendEmail({ to, subject, text });

  return NextResponse.json({ message: "Email sent successfully!" });
}
