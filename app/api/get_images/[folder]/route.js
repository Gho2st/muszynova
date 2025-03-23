import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { folder } = params; // Pobranie nazwy folderu z URL
  const imagesDir = path.join(process.cwd(), "public/galeria", folder);

  try {
    // Sprawdzenie, czy folder istnieje
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json(
        { error: "Folder nie istnieje" },
        { status: 404 }
      );
    }

    // Pobranie listy plików
    const files = fs.readdirSync(imagesDir);

    // Filtrowanie tylko plików graficznych (opcjonalne)
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const images = files
      .filter((file) =>
        validExtensions.includes(path.extname(file).toLowerCase())
      )
      .map((file) => `/galeria/${folder}/${file}`); // Tworzenie URL-i

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Wystąpił błąd serwera", details: error.message },
      { status: 500 }
    );
  }
}
