import ExperimentalResults from "@/components/ExperimentalResults/ExperimentalResults";
import HeroSection from "@/components/Hero section/HeroSection";
import PredictionResults from "@/components/PredictionResults/PredictionResults";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
export default function Home() {
  return (
    <>
      <ProtectedRoute>
        <HeroSection></HeroSection>
        <PredictionResults></PredictionResults>
        <ExperimentalResults></ExperimentalResults>
      </ProtectedRoute>
    </>
  );
}
