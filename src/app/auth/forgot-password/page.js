"use client";
import AuthLayout from "@/components/AuthLayout";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import "../auth.css";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
