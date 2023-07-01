import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";
import { BiCommentError } from "react-icons/bi";
import { signIn, useSession } from "next-auth/react";
import { NextPageButtonLink } from "../../UI/NextPageButtonLink";
import WhyCreateAccount from "../../components/WhyCreateAccount";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email) {
      setMessage(` All set! Please check your inbox.
         We have sent an email at ${email} with the link required for the survey. `);
      await signIn("email", { redirect: false, email: email });
      setEmail(" ");
      setSuccess(true);
      setErr(false);
    } else {
      setMessage("Please enter your email to access the survey.");
      setSuccess(false);
      setErr(true);
    }
  };
  return (
    <>
      {!success ? (
        <>
          <h1 className="mb-12 text-2xl font-semibold text-white md:mt-6 md:text-3xl">
            Sign in with your email
          </h1>
          <form
            onSubmit={(e) => void handleSubmit(e)}
            className="flex flex-col items-center justify-center focus:bg-white"
          >
            <input
              className="min-w-[400px] rounded border-2 text-lg font-semibold focus:border-green"
              type="email"
              placeholder="Type your email..."
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="submit"
              className=" border-lightGreen bg-yellowGreen hover:bg-lightGreen mt-12 mb-8 flex min-w-[200px] flex-row items-center justify-center rounded-full
             border-2 border-dashed px-6 py-1 text-lg font-semibold text-blue-darker no-underline 
              shadow-xl  transition ease-in-out hover:translate-y-1"
            >
              Sign In <AiOutlineMail className="ml-2 text-2xl" />
            </button>
          </form>
          <WhyCreateAccount />
        </>
      ) : (
        <div className="flex max-w-[400px] flex-row items-center justify-start gap-1 pt-4">
          {success && <MdDownloadDone className="mr-2 text-3xl text-green" />}
          {err && <BiCommentError className="text-red  mr-1 text-3xl" />}
          <p className="mt-1 w-full  text-sm text-white  2xl:text-lg">
            {" "}
            {message}
          </p>
        </div>
      )}
    </>
  );
};

const SigninPage = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="bg-spectrum2 flex h-screen w-full flex-col items-center justify-center">
      {sessionData ? (
        <NextPageButtonLink
          pageName="censusmap"
          msg="Click here to begin."
          path=".."
        />
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default SigninPage;
