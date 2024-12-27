"use client";

import { useCallback, useEffect } from "react";
import { useAuth } from "@/app/providers";

export function useNotionAuth() {
  const { startAuth, completeAuth } = useAuth();

  const handleAuth = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_NOTION_CLIENT_ID;
    if (!clientId) {
      console.error("Missing NEXT_PUBLIC_NOTION_CLIENT_ID");
      return;
    }

    const redirectUri = `${window.location.origin}/api/auth/callback`;
    const authUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${clientId}&response_type=code&owner=user&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;

    startAuth();
    window.location.href = authUrl;
  }, [startAuth]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      completeAuth(token);
      window.history.replaceState({}, "", "/");
    }
  }, [completeAuth]);

  return { handleAuth };
}
