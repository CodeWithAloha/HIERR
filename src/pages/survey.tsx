import dynamic from "next/dynamic";

const Survey = dynamic(
  () => import("../components/survey/demographicssurvey"),
  {
    ssr: false,
  }
);

export default function SurveyPage() {
  return <Survey />;
}
