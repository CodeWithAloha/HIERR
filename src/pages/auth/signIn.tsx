import React from "react";
import { useSession } from "next-auth/react";
import { NextPageButtonLink } from "../../UI/NextPageButtonLink";
import LoginForm from "./loginform";

const SigninPage = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        {sessionData ? (
          <NextPageButtonLink
            pageName="censusmap"
            msg="Start the survey"
            text="You are currently logged in. 
          You can begin the survey now, and rest assured that all responses will remain 
          anonymous. Please note that we do not store any email credentials. 
          If you need to take a break, simply sign out, and your progress will be saved. 
          When you return, remember to sign in using the same email address."
            successMessage={true}
            whiteDesignButton={false}
            path=".."
          />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default SigninPage;
