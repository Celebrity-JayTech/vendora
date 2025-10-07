"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";
import "./page.css";

export default function SignInPage() {
  return (
    <div className="h-screen w-full grid place-content-center sign-up">
      <div className="auth-scope">
        <SignIn
          appearance={{
            layout: {
              logoImageUrl: "/favicon.svg", // your logo from /public
              logoPlacement: "inside", // or "outside"
            },
          }}
        />
      </div>
    </div>
  );
}
