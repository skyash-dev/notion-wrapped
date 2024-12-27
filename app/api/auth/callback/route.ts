export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/notion";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      `${process.env.BASE_URL}/error?error=` + error
    );
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.BASE_URL}/error?error=no_code`);
  }

  try {
    const tokenData = await exchangeCodeForToken(code);

    return NextResponse.redirect(
      `${process.env.BASE_URL}/?token=` + tokenData.access_token
    );
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    return NextResponse.redirect(
      `${process.env.BASE_URL}/error?error=token_exchange_failed`
    );
  }
}
