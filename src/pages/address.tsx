import dynamic from "next/dynamic";

const AddressSearch = dynamic(() => import("../components/AddressSearch"), {
  ssr: false,
});

export default function AddressSearchPage() {
  return <AddressSearch />;
}
