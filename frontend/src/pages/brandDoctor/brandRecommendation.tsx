// @ts-nocheck

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

interface ServiceRecommendation {
  title: string;
  description: string;
  service: string;
  planName: string;
  price: string;
  icon: string;
  priority: number;
  relevantBenchmarks: string[];
}

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
  recommendations: ServiceRecommendation[]; // Now comes from AI
  authenticityBenchmarks: BenchmarkCategory[];
  techBenchmarks: BenchmarkCategory[];
}

const BrandRecommendations = ({
  brandName = "TechCorp",
  industry = "Technology",
  score = 78,
  onReset = () => {},
  competitors = [],
  recommendations = [], // AI-generated recommendations
  authenticityBenchmarks = [],
  techBenchmarks = [],
}: BrandRecommendationsProps) => {
  const [currentRecommendation, setCurrentRecommendation] = useState(0);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // Pricing benchmarks for approximation
  const pricingBenchmarks = {
    starter: {  usd: 99 },
    consultation: {  usd: 129 },
    digital: {  usd: 159 },
    growth: { usd: 299 },
    marketing: {  usd: 399 },
    premium: {  usd: 599 },
    enterprise: {  usd: 999 },
  };

  // Icon mapping for different service types
  const iconMapping = {
    website:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746565485/responsive-design_wobrfb.png",
    consultation:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746696017/consultant_bgaqe2.png",
    growth:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746566762/growth_ggcqxd.png",
    ai: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746566344/ai_nuhrup.png",
    analysis:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746723859/analysis_nnspfu.png",
    blockchain:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746696632/blockchain-security_lhojoj.png",
    marketing:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746566762/growth_ggcqxd.png",
    default:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1746565485/responsive-design_wobrfb.png",
  };

  // Function to determine appropriate icon based on service type
  const getServiceIcon = (title: string, description: string) => {
    const lowerTitle = title.toLowerCase();
    const lowerDesc = description.toLowerCase();

    if (lowerTitle.includes("website") || lowerDesc.includes("website"))
      return iconMapping.website;
    if (
      lowerTitle.includes("consultation") ||
      lowerDesc.includes("consultation")
    )
      return iconMapping.consultation;
    if (lowerTitle.includes("ai") || lowerDesc.includes("ai"))
      return iconMapping.ai;
    if (lowerTitle.includes("marketing") || lowerDesc.includes("marketing"))
      return iconMapping.marketing;
    if (lowerTitle.includes("growth") || lowerDesc.includes("growth"))
      return iconMapping.growth;
    if (lowerTitle.includes("analysis") || lowerDesc.includes("analysis"))
      return iconMapping.analysis;
    if (lowerTitle.includes("blockchain") || lowerDesc.includes("blockchain"))
      return iconMapping.blockchain;

    return iconMapping.default;
  };

  // Function to approximate pricing based on service complexity
  const approximatePrice = (
    title: string,
    description: string,
    service: string
  ) => {
    const content = `${title} ${description} ${service}`.toLowerCase();

    // Enterprise/Custom solutions
    if (
      content.includes("enterprise") ||
      content.includes("custom") ||
      content.includes("blockchain")
    ) {
      return `₦${pricingBenchmarks.enterprise.naira.toLocaleString()} / $${pricingBenchmarks.enterprise.usd}`;
    }

    // Premium solutions
    if (
      content.includes("premium") ||
      content.includes("master") ||
      content.includes("advanced")
    ) {
      return `₦${pricingBenchmarks.premium.naira.toLocaleString()} / $${pricingBenchmarks.premium.usd}`;
    }

    // Marketing packages
    if (
      content.includes("marketing") ||
      content.includes("seo") ||
      content.includes("ads")
    ) {
      return `₦${pricingBenchmarks.marketing.naira.toLocaleString()} / $${pricingBenchmarks.marketing.usd}`;
    }

    // Growth packages
    if (
      content.includes("growth") ||
      content.includes("bundle") ||
      content.includes("funnel")
    ) {
      return `₦${pricingBenchmarks.growth.naira.toLocaleString()} / $${pricingBenchmarks.growth.usd}`;
    }

    // Digital presence
    if (
      content.includes("digital") ||
      content.includes("social") ||
      content.includes("presence")
    ) {
      return `₦${pricingBenchmarks.digital.naira.toLocaleString()} / $${pricingBenchmarks.digital.usd}`;
    }

    // Consultation
    if (
      content.includes("consultation") ||
      content.includes("audit") ||
      content.includes("strategy")
    ) {
      return `₦${pricingBenchmarks.consultation.naira.toLocaleString()} / $${pricingBenchmarks.consultation.usd}`;
    }

    // Default to starter pricing
    return `₦${pricingBenchmarks.starter.naira.toLocaleString()} / $${pricingBenchmarks.starter.usd}`;
  };

  // Process AI recommendations to add missing data
  const processedRecommendations = recommendations.map((rec, index) => ({
    ...rec,
    icon: rec.icon || getServiceIcon(rec.title, rec.description),
    price:
      rec.price || approximatePrice(rec.title, rec.description, rec.service),
    priority: rec.priority || index + 1,
    planName: rec.planName || `🔹 ${rec.title}`,
  }));

  // Sort by priority if available
  const sortedRecommendations = processedRecommendations.sort(
    (a, b) => a.priority - b.priority
  );

  const nextRecommendation = () => {
    setCurrentRecommendation(
      (prev) => (prev + 1) % sortedRecommendations.length
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
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
          Recommended Services For {brandName}
        </h3>

        {sortedRecommendations.length > 0 ? (
          <div className="bg-gradient-to-br from-slate-900 to-gray-950 rounded-2xl border border-gray-700 p-6 md:p-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
              Best Match
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-4">
              <div className="md:w-1/3 flex justify-center">
                <img
                  src={sortedRecommendations[currentRecommendation].icon}
                  alt={sortedRecommendations[currentRecommendation].title}
                  className="h-48 w-48 object-cover rounded-lg"
                />
              </div>

              <div className="md:w-2/3">
                <h4 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  {sortedRecommendations[currentRecommendation].title}
                </h4>

                <p className="text-gray-300 mb-6 text-lg">
                  {sortedRecommendations[currentRecommendation].description}
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-3 text-gray-300">
                      {sortedRecommendations[currentRecommendation].service}
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
                        {sortedRecommendations[currentRecommendation].planName}
                      </p>
                      <p className="text-xl text-blue-400 font-bold">
                        {sortedRecommendations[currentRecommendation].price}
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

                    {sortedRecommendations.length > 1 && (
                      <button
                        onClick={nextRecommendation}
                        className="w-full bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-200"
                      >
                        See Alternative ({currentRecommendation + 1} of{" "}
                        {sortedRecommendations.length})
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-900 to-gray-950 rounded-2xl border border-gray-700 p-8 text-center">
            <p className="text-gray-400 text-lg mb-4">
              No specific service recommendations available at this time.
            </p>
            <p className="text-gray-500 text-sm">
              Our AI analysis couldn't determine specific services for your
              brand. Please try running the analysis again or contact our
              support team.
            </p>
          </div>
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

      {/* Call to Action */}
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

      {sortedRecommendations.length > 0 && (
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          planName={sortedRecommendations[currentRecommendation].planName}
          price={sortedRecommendations[currentRecommendation].price}
          planTitle={sortedRecommendations[currentRecommendation].title}
        />
      )}
    </div>
  );
};

export default BrandRecommendations;
