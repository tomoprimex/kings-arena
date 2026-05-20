import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.json({ user: null });
  }

  // Fake user (replace later with DB)
  return NextResponse.json({
    user: {
      name: "Player1",
      id: 1
    }
  });
}