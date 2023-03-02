import dynamic from "next/dynamic";

const ZipCode = dynamic(() => import("../components/zipcode"), {
  ssr: false,
});

export default function ZipCodePage() {
  return <ZipCode />;
}
