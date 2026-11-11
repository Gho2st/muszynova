import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const PAGE_ID = "117921491399877";
  const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

  const url = `https://graph.facebook.com/v22.0/${PAGE_ID}/feed?limit=3&fields=message,created_time,attachments{media}&access_token=${ACCESS_TOKEN}`;

  try {
    // Cache na 10 minut, żeby nie odpytywać FB przy każdym wejściu na stronę
    const response = await fetch(url, {
      next: { revalidate: 600 },
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
