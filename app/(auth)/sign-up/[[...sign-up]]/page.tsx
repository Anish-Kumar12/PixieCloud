import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Join Us!</h1>
        <SignUp
          appearance={{
            elements: {
              rootBox: "flex flex-col gap-4",
              socialButtons: "w-full",
              formButtonPrimary: "btn btn-primary w-full",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
