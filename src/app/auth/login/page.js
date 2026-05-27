"use client";
import AuthLayout from "@/components/AuthLayout";
import LoginForm from "@/components/LoginForm";
import "../auth.css";

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
