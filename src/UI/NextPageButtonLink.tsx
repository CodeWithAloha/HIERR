import Link from "next/link"

interface NextPageButtonLinkProps{
  pageName: string;
  msg: string;
}

export const NextPageButtonLink = ({pageName, msg}: NextPageButtonLinkProps) => {
  const href = `./${pageName}`;
  return (
  <div>
    <Link href={href}><button className="rounded-full bg-white/10 px-10 py-3 hover:bg-white/20 my-10">
            {msg}
    </button></Link>
  </div>
  )
}
