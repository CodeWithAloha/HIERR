import dynamic from "next/dynamic";

const CensusMap = dynamic(() => import('../components/censusmap'), {
  ssr: false
})

export default function CensusMapPage() {
  return (<CensusMap/>)
}

