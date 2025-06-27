//@ts-nocheck

import { useState } from "react";
import {
  Check,
  AlertCircle,
  ArrowUpRight,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";
import PurchaseModal from "@/components/purchaseModal";

interface Competitor {
  name: string;
  score: number;
  industry: string;
  rating: number;
  reviews: number;
  description: string;
  strengths: string[];
  avatar: string;
  verified: boolean;
}

// Define interfaces for benchmarks if not already defined globally or in BrandAnalysisForm
interface BenchmarkCategory {
  title: string;
  score: number;
  items: { text: string; present: boolean }[];
}

interface BrandRecommendationsProps {
  brandName: string;
  industry: string;
  score: number;
  onReset: () => void;
  competitors: Competitor[];
  // Add the benchmark arrays here
  authenticityBenchmarks: BenchmarkCategory[];
  techBenchmarks: BenchmarkCategory[];
}

const BrandRecommendations = ({
  brandName = "TechCorp",
  industry = "Technology",
  score = 78,
  onReset = () => {},
  competitors = [],
  authenticityBenchmarks = [],
  techBenchmarks = [],
}: BrandRecommendationsProps) => {
  const [currentRecommendation, setCurrentRecommendation] = useState(0);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // Define all possible service recommendations
  const allPossibleRecommendations = {
    starterKit: {
      title: "Starter Kit",
      description: "Build a solid foundation for your brand online.",
      service:
        "1-page website, WhatsApp business setup, social media audit, basic SEO setup",
      planName: "🔹 Starter Kit",
      price: "₦150,000 / $99",
      icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746565485/responsive-design_wobrfb.png",
      priority: 1, // Lower number means higher priority for weak scores
      relevantBenchmarks: ["Digital Presence", "Technical Maturity"],
    },
    techConsultation: {
      title: "Tech Consultation & Audit",
      description: "Get expert advice on how to improve your tech presence.",
      service:
        "1-hour tech strategy call, comprehensive website audit, security recommendations",
      planName: "⚡️ Tech Strategy Session",
      price: "₦200,000 / $129",
      icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746696017/consultant_bgaqe2.png",
      priority: 2,
      relevantBenchmarks: ["Technical Maturity", "Risk Assessment"],
    },
    digitalPresenceBoost: {
      title: "Digital Presence Boost",
      description: "Enhance your online visibility and reputation.",
      service:
        "Professional social media setup/optimization, content strategy workshop, online review management guide",
      planName: "📈 Digital Launchpad",
      price: "₦250,000 / $159",
      icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746566762/growth_ggcqxd.png", // Re-using an icon, consider unique ones
      priority: 3,
      relevantBenchmarks: ["Digital Presence", "Reputation Management"],
    },
    growthBundle: {
      title: "Growth Bundle",
      description:
        "Scale your business with our comprehensive growth services.",
      service:
        "5-page website or landing funnel, AI WhatsApp bot, social media management, basic digital ads setup",
      planName: "🔸 Growth Bundle",
      price: "₦450,000 / $299",
      icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746566344/ai_nuhrup.png",
      priority: 4,
      relevantBenchmarks: ["Brand Consistency", "Technical Maturity"],
    },
    digitalMarketingPackage: {
      title: "Digital Marketing Package",
      description: "Enhance your online presence and reach more customers.",
      service:
        "SEO optimization, content marketing plan, advanced social media strategy, email marketing setup",
      planName: "🎯 Marketing Accelerator",
      price: "₦600,000 / $399",
      icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746566762/growth_ggcqxd.png",
      priority: 5,
      relevantBenchmarks: ["Brand Consistency", "Digital Presence"],
    },
    brandMasterPlan: {
      title: "Brand Master Plan",
      description:
        "Take your already strong brand to the next level with our premium services.",
      service:
        "Full website or mobile app, AI & automation workflows, 3-month content & marketing plan, advanced analytics",
      planName: "🌟 Brand Master Plan",
      price: "₦950,000 / $599",
      icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746723859/analysis_nnspfu.png",
      priority: 6,
      relevantBenchmarks: [], // For strong brands, general growth
    },
    web3Integration: {
      title: "Web3 & Blockchain Integration",
      description:
        "Integrate cutting-edge blockchain solutions into your business.",
      service:
        "DApps, tokenomics, NFT campaigns, smart contract development, decentralized identity solutions",
      planName: "🛠️ Enterprise & Custom Build",
      price: "Custom Quote",
      icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746696632/blockchain-security_lhojoj.png",
      priority: 7,
      relevantBenchmarks: [], // Specific advanced service, not directly tied to core benchmarks
    },
  };

  // Helper to get all benchmarks combined
  const getAllBenchmarks = () => [...authenticityBenchmarks, ...techBenchmarks];

  const getDynamicRecommendations = () => {
    const allBenchmarks = getAllBenchmarks();
    const recommendedServices: (typeof allPossibleRecommendations)[keyof typeof allPossibleRecommendations][] =
      [];
    const addedServiceTitles = new Set<string>(); // To prevent duplicate service recommendations

    // 1. Prioritize services for the lowest-scoring individual benchmarks
    // Sort benchmarks by score in ascending order
    const sortedBenchmarks = [...allBenchmarks].sort(
      (a, b) => a.score - b.score
    );

    for (const benchmark of sortedBenchmarks) {
      if (benchmark.score < 60) {
        // If a benchmark is particularly weak
        for (const serviceKey in allPossibleRecommendations) {
          // Use type assertion here to tell TypeScript that serviceKey is indeed a key of allPossibleRecommendations
          const service =
            allPossibleRecommendations[
              serviceKey as keyof typeof allPossibleRecommendations
            ];
          if (
            service.relevantBenchmarks &&
            service.relevantBenchmarks.includes(benchmark.title) &&
            !addedServiceTitles.has(service.title)
          ) {
            recommendedServices.push(service);
            addedServiceTitles.add(service.title);
            // Limit to 2 targeted recommendations for weaknesses
            if (recommendedServices.length >= 2) break;
          }
        }
      }
      if (recommendedServices.length >= 2) break; // Stop if we have enough targeted recommendations
    }

    // 2. Add general recommendations based on overall score if not enough targeted ones
    if (recommendedServices.length < 2) {
      if (score >= 75) {
        // High score, suggest advanced/growth services
        if (
          !addedServiceTitles.has(
            allPossibleRecommendations.brandMasterPlan.title
          )
        ) {
          recommendedServices.push(allPossibleRecommendations.brandMasterPlan);
          addedServiceTitles.add(
            allPossibleRecommendations.brandMasterPlan.title
          );
        }
        if (
          recommendedServices.length < 2 &&
          !addedServiceTitles.has(
            allPossibleRecommendations.web3Integration.title
          )
        ) {
          recommendedServices.push(allPossibleRecommendations.web3Integration);
          addedServiceTitles.add(
            allPossibleRecommendations.web3Integration.title
          );
        }
      } else if (score >= 60) {
        // Medium score, suggest growth services
        if (
          !addedServiceTitles.has(allPossibleRecommendations.growthBundle.title)
        ) {
          recommendedServices.push(allPossibleRecommendations.growthBundle);
          addedServiceTitles.add(allPossibleRecommendations.growthBundle.title);
        }
        if (
          recommendedServices.length < 2 &&
          !addedServiceTitles.has(
            allPossibleRecommendations.digitalMarketingPackage.title
          )
        ) {
          recommendedServices.push(
            allPossibleRecommendations.digitalMarketingPackage
          );
          addedServiceTitles.add(
            allPossibleRecommendations.digitalMarketingPackage.title
          );
        }
      } else {
        // Lower score, suggest foundational services
        if (
          !addedServiceTitles.has(allPossibleRecommendations.starterKit.title)
        ) {
          recommendedServices.push(allPossibleRecommendations.starterKit);
          addedServiceTitles.add(allPossibleRecommendations.starterKit.title);
        }
        if (
          recommendedServices.length < 2 &&
          !addedServiceTitles.has(
            allPossibleRecommendations.techConsultation.title
          )
        ) {
          recommendedServices.push(allPossibleRecommendations.techConsultation);
          addedServiceTitles.add(
            allPossibleRecommendations.techConsultation.title
          );
        }
      }
    }

    // Ensure we always return at least one recommendation, even if logic fails to find specifics
    if (recommendedServices.length === 0) {
      if (score >= 75)
        return [
          allPossibleRecommendations.brandMasterPlan,
          allPossibleRecommendations.web3Integration,
        ];
      if (score >= 60)
        return [
          allPossibleRecommendations.growthBundle,
          allPossibleRecommendations.digitalMarketingPackage,
        ];
      return [
        allPossibleRecommendations.starterKit,
        allPossibleRecommendations.techConsultation,
      ];
    }

    // Sort the final recommendations by their defined priority
    return recommendedServices.sort((a, b) => a.priority - b.priority);
  };

  const recommendations = getDynamicRecommendations(); // Call once and store

  const nextRecommendation = () => {
    setCurrentRecommendation(
      (prev) => (prev + 1) % recommendations.length // Use the recommendations variable
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
              ? "text-yellow-400 fill-current opacity-50"
              : "text-gray-600"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8 p-6 bg-gray-950 min-h-screen">
      {/* Recommended Services */}
      <div className="max-w-5xl mx-auto ">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
          Recommended Services For {brandName}
        </h3>

        {recommendations.length > 0 ? (
          <div className="bg-gradient-to-br from-slate-900 to-gray-950 rounded-2xl border border-gray-700 p-6 md:p-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
              Best Match
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-4">
              <div className="md:w-1/3 flex justify-center">
                <img
                  src={recommendations[currentRecommendation].icon}
                  alt={recommendations[currentRecommendation].title}
                  className="h-48 w-48 object-cover rounded-lg"
                />
              </div>

              <div className="md:w-2/3">
                <h4 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  {recommendations[currentRecommendation].title}
                </h4>

                <p className="text-gray-300 mb-6 text-lg">
                  {recommendations[currentRecommendation].description}
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-3 text-gray-300">
                      {recommendations[currentRecommendation].service}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-3 text-gray-300">
                      Free technical consultation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-3 text-gray-300">
                      Ongoing support for 30 days
                    </span>
                  </li>
                </ul>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="sm:w-1/2">
                    <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1">
                        Service Package
                      </p>
                      <p className="text-lg font-bold text-white mb-1">
                        {recommendations[currentRecommendation].planName}
                      </p>
                      <p className="text-xl text-blue-400 font-bold">
                        {recommendations[currentRecommendation].price}
                      </p>
                    </div>
                  </div>

                  <div className="sm:w-1/2 w-full space-y-3">
                    <button
                      onClick={() => setIsPurchaseModalOpen(true)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                      Buy Plan
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </button>

                    <button
                      onClick={nextRecommendation}
                      className="w-full bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-200"
                    >
                      See Alternative
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">
            No specific service recommendations available at this time.
          </p>
        )}
      </div>
      {/* Competitors Ahead Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-amber-500" />
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Top Competitors in {industry}
            </h3>
          </div>
          <p className="text-gray-400 text-lg">
            See how leading brands in your industry are excelling
          </p>
        </div>

        {competitors.length > 0 ? (
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {competitors.map((competitor, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-900 to-gray-950 rounded-2xl border border-gray-700 p-6 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-lg">
                          {competitor.name}
                        </h4>
                        {competitor.verified && (
                          <Award className="h-5 w-5 text-blue-400" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">
                        {competitor.industry}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {competitor.score}%
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {renderStars(competitor.rating)}
                  </div>
                  <span className="text-white font-semibold">
                    {competitor.rating}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({competitor.reviews} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {competitor.description}
                </p>

                {/* Strengths */}
                <div className="space-y-2">
                  <h5 className="text-white font-semibold text-sm mb-3">
                    Key Strengths:
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {competitor.strengths.map((strength, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-300 text-xs">
                          {strength}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score difference */}
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      Score difference:
                    </span>
                    <span className="text-amber-400 font-semibold">
                      +{competitor.score - score} points ahead
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">
            Could not find prominent competitors for {industry} based on public
            web search.
          </p>
        )}
      </div>
      {/* Call to Action - Reduced top margin */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-900/50 p-8 text-center relative shadow-xl">
          <div className="absolute top-4 right-4">
            <AlertCircle className="h-6 w-6 text-blue-400" />
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Unlock {brandName}'s Full Potential
          </h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Get a complete brand overhaul with our expert team. We've analyzed
            over 500+ brands in the {industry} industry and know exactly what
            works.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Schedule Strategy Call
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </button>

            <button
              onClick={onReset}
              className="bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 font-medium py-3 px-8 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              Check Another Brand
            </button>
          </div>
        </div>
      </div>

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        planName={recommendations[currentRecommendation].planName}
        price={recommendations[currentRecommendation].price}
        planTitle={recommendations[currentRecommendation].title}
      />
    </div>
  );
};

export default BrandRecommendations;
