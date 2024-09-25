import React from "react";

interface LoggedInAsProps {
  email: string | null | undefined;
}

export default function LoggedInAs({ email }: LoggedInAsProps) {
  if (!email) {
    return null;
  }

  return (
    <>
      <p className="font-bold md:text-xl lg:text-2xl">Logged in as: {email}</p>
    </>
  );
}
