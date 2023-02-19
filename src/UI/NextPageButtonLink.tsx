import Link from "next/link"

interface NextPageButtonLinkProps{
  pageName: string;
  msg: string;
  disabled?: boolean;
}

export const NextPageButtonLink = ({pageName, msg, disabled}: NextPageButtonLinkProps) => {
  const href = `./${pageName}`;
  return (
  <div>
    <Link href={href}><button disabled={disabled} className="rounded-full text-blue-default bg-white/90 hover:bg-white hover:text-blue-darker px-10 py-3 no-underline transition">
            {msg}
    </button></Link>
  </div>
  )
}
