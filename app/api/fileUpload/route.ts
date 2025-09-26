import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import sanitizeSVG from "@mattkrick/sanitize-svg";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const slug = formData.get("slug") as string;
    const type = formData.get("type") as "icon" | "image";


    if (!file || !slug || !type) {
      return NextResponse.json(
        { error: "Файл, символьный код или тип не переданы" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Файл слишком большой (максимум 5мБ)" },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name).toLowerCase();

    if (type === "icon") {
      const allowedExt = [".png", ".svg"];
      const allowedMime = ["image/png", "image/svg+xml"];
      if (!allowedExt.includes(ext) || !allowedMime.includes(file.type)) {
        return NextResponse.json(
          { error: "Недопустимый формат иконки" },
          { status: 400 }
        );
      }
    }

    if (type === "image") {
      const allowedExt = [".jpg", ".jpeg", ".webp"];
      const allowedMime = ["image/jpeg", "image/webp"];
      if (!allowedExt.includes(ext) || !allowedMime.includes(file.type)) {
        return NextResponse.json(
          { error: "Недопустимый формат изображения" },
          { status: 400 }
        );
      }
    }

    const subFolder = type === "icon" ? "icon" : "";
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "upload",
      "rooms",
      slug,
      subFolder
    );

    await fs.mkdir(uploadDir, { recursive: true });

    const safeFileName = `${uuidv4()}${ext}`;
    const filePath = path.join(uploadDir, safeFileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (ext === ".svg") {
      const clean = await sanitizeSVG(buffer);

      if (!clean) {
        return NextResponse.json(
          { error: "SVG файл не безопасен или содержит запрещенный контент" },
          { status: 400 }
        );
      }

      if (typeof clean === "string") {
        await fs.writeFile(filePath, clean, "utf-8");
      }
    } else {
      try {
        await sharp(buffer).metadata();
      } catch (err) {
        return NextResponse.json(
          { error: "Файл поврежден или не является изображением" },
          { status: 400 }
        );
      }

      await fs.writeFile(filePath, buffer);
    }

    const url = `/upload/rooms/${slug}/${subFolder ? subFolder + "/" : ""}${safeFileName}`;



    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка при загрузке файла" },
      { status: 500 }
    );
  }
}
