import ExperimentalResults from "@/components/ExperimentalResults/ExperimentalResults";
import HeroSection from "@/components/Hero section/HeroSection";
import PredictionResults from "@/components/PredictionResults/PredictionResults";

export default function Home() {
  return (
    <>
      <HeroSection></HeroSection>
      <PredictionResults></PredictionResults>
      <ExperimentalResults></ExperimentalResults>
    </>
  );
}
