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
    <Link href={href}><button disabled={disabled} className="rounded-full bg-white/10 px-10 py-3 hover:bg-white/20 my-10 text-white">
            {msg}
    </button></Link>
  </div>
  )
}
