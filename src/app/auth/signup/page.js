"use client";
import AuthLayout from "@/components/AuthLayout";
import RegisterForm from "@/components/RegisterForm";
import "../auth.css";

export default function Signup() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
