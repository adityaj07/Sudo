import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const filename = request.headers.get("x-vercel-filename") || "default.png";

  if (request.body === null) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const body = request.body as ReadableStream<Uint8Array>;

  try {
    const blob = await put(filename, body, {
      access: "public",
    });
    console.log(blob);
    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
