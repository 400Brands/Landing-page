
import { useState } from "react";
import DefaultMain from "@/layouts/defaultMain";
import BrandAnalysisForm from "./brandDoctor/brandForm";
import BrandResultsDisplay from "./brandDoctor/brandResult";
import BrandRecommendations from "./brandDoctor/brandRecommendation";


export default function BrandDoctorPage() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [medal, setMedal] = useState("");

   const handleAnalysis = (inputBrandName: string, inputIndustry: string) => {
    setBrandName(inputBrandName);
    setIndustry(inputIndustry);
    setIsAnalyzing(true);

    // Simulate analysis
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 50) + 30; // 30-80 for demo
      setScore(randomScore);

      if (randomScore >= 75) setMedal("Gold");
      else if (randomScore >= 60) setMedal("Silver");
      else if (randomScore >= 45) setMedal("Bronze");
      else setMedal("Starter");

      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setBrandName("");
    setIndustry("");
    setScore(0);
    setMedal("");
  };

  return (
    <DefaultMain>
      <section className=" bg-transparent">
        {!showResults ? (
          <BrandAnalysisForm
            onAnalysis={handleAnalysis}
            isAnalyzing={isAnalyzing}
          />
        ) : (
          <div className="container mx-auto px-4 space-y-2">
            <BrandResultsDisplay
              brandName={brandName}
              industry={industry}
              score={score}
              medal={medal}
            />
            <BrandRecommendations
              brandName={brandName}
              industry={industry}
              score={score}
              onReset={resetAnalysis}
            />
          </div>
        )}
      </section>
    </DefaultMain>
  );
}
