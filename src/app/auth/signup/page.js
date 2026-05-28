"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import RegisterForm from "@/components/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import "../auth.css";

export default function Signup() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return null;
  }

  if (user) {
    return null;
  }

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
