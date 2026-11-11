import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(req) {
  const { login, password } = await req.json();

  const hash = process.env.ADMIN_PASSWORD_HASH_B64
    ? Buffer.from(process.env.ADMIN_PASSWORD_HASH_B64, "base64").toString(
        "utf-8",
      )
    : "";

  if (
    login !== process.env.ADMIN_LOGIN ||
    !hash ||
    !(await bcrypt.compare(password, hash))
  ) {
    return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ success: true });
}
