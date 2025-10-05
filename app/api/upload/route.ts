// app/api/admin/upload/route.ts
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // files[] या file — दोनों सपोर्ट
    const files = (formData.getAll("files").length
      ? formData.getAll("files")
      : [formData.get("file")]
    ).filter(Boolean) as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files received" }, { status: 400 });
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const dataUri = `data:${file.type};base64,${base64}`;

        // Cloudinary upload
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "uploads",
          resource_type: "auto"
        });

        return result;
      })
    );

    return NextResponse.json({ uploads });
  } catch (error) {
    console.error("Error uploading image(s):", error);
    return NextResponse.json(
      { error: "Failed to upload image(s)" },
      { status: 500 }
    );
  }
}
