"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    if (!user && !redirected.current) {
      redirected.current = true;
      router.replace("/auth/login");
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}