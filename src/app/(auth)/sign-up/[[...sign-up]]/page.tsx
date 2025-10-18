import { SignUp } from "@clerk/nextjs";
import React from "react";
import { dark } from "@clerk/themes";
import "./page.css";
export default function SignUpPage() {
  return (
    <div className="sign-up grid h-auto w-full place-content-center p-5">
      <div className="auth-scope">
        <SignUp
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
