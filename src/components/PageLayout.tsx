import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="container mx-auto flex h-screen justify-center">
      <div className="flex flex-col items-center sm:w-3/4 md:w-2/3 lg:w-1/2">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
