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
      <p className="text-2xl font-bold text-yellowGreen">
        Logged in as: {email}
      </p>
    </>
  );
}
