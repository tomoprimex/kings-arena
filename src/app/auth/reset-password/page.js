"use client";
import AuthLayout from "@/components/AuthLayout";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import "../auth.css";

export default function ResetPassword() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
