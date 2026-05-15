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

  console.log("Login OK:", login === process.env.ADMIN_LOGIN);
  console.log("Hash len:", hash.length);
  console.log("Match:", hash ? await bcrypt.compare(password, hash) : false);

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
