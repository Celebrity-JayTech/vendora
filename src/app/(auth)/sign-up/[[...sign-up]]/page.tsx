import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function SignUpPage() {
  return (
    <div className="h-auto w-full grid place-content-center p-5">
      <SignUp />
    </div>
  );
}
