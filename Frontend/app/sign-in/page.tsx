import SignUp from "@/components/sign-up/SignUp";
import React from "react";
import { Toaster } from "sonner";

const page = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <Toaster richColors position="top-center" />
      {children}
      <SignUp />
    </div>
  );
};

export default page;
