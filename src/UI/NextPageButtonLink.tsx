import Link from "next/link";

interface NextPageButtonLinkProps {
  pageName: string;
  msg: string;
  disabled?: boolean;
  query?: { [key: string]: string };
  path?: string;
}

export const NextPageButtonLink = ({
  pageName,
  msg,
  disabled,
  query,
  path,
}: NextPageButtonLinkProps) => {
  const pathValue = path ? `${path}/${pageName}` : `./${pageName}`;
  const href = { pathname: pathValue, query: query };
  return (
    <div>
      <Link href={href}>
        <button
          disabled={disabled}
          className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
        >
          {msg}
        </button>
      </Link>
    </div>
  );
};
