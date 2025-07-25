import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("session-token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    // Decode simple session token
    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString());

      // Check if token is expired (7 days)
      if (Date.now() - decoded.timestamp > 7 * 24 * 60 * 60 * 1000) {
        return NextResponse.json({ message: "Token expired" }, { status: 401 });
      }

      // Mock user data (in production, fetch from database)
      const user = {
        id: decoded.userId,
        email: decoded.email,
        firstName: "Admin",
        lastName: "User",
        company: "Livato",
      };

      return NextResponse.json({ user }, { status: 200 });
    } catch (decodeError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    console.error("Auth verification error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
