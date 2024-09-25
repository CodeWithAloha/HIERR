import React from "react";

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <h1 className="py-4 text-lg font-semibold text-white md:mt-4 md:text-3xl">
      {title}
    </h1>
  );
};

export default PageHeader;
