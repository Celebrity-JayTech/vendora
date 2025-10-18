"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";
import "./page.css";

export default function SignInPage() {
  return (
    <div className="sign-up grid h-screen w-full place-content-center">
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
