import { useState } from "react";
import {
  Check,
  Heart,
  Headphones,
  Phone,
  AlertCircle,
  ArrowUpRight,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";

interface BrandRecommendationsProps {
  brandName: string;
  industry: string;
  score: number;
  onReset: () => void;
}

const BrandRecommendations = ({
  brandName = "TechCorp",
  industry = "Technology",
  score = 78,
  onReset = () => {},
}: BrandRecommendationsProps) => {
  const [currentRecommendation, setCurrentRecommendation] = useState(0);

  // Service recommendations based on score
  const getRecommendations = () => {
    if (score >= 75) {
      return [
        {
          title: "Brand Master Plan",
          description:
            "Take your already strong brand to the next level with our premium services",
          service:
            "Full website or mobile app, AI & automation workflows, 3-month content & marketing plan",
          planName: "🌟 Brand Master Plan",
          price: "₦950,000 / $599",
          icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746723859/analysis_nnspfu.png",
        },
        {
          title: "Web3 & Blockchain Integration",
          description:
            "Integrate cutting-edge blockchain solutions into your business",
          service:
            "DApps, tokenomics, NFT campaigns and more for your established brand",
          planName: "🛠️ Enterprise & Custom Build",
          price: "Custom Quote",
          icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746696632/blockchain-security_lhojoj.png",
        },
      ];
    } else if (score >= 60) {
      return [
        {
          title: "Growth Bundle",
          description:
            "Scale your business with our comprehensive growth services",
          service:
            "5-page website or landing funnel, AI WhatsApp bot, social media management",
          planName: "🔸 Growth Bundle",
          price: "₦450,000 / $299",
          icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746566344/ai_nuhrup.png",
        },
        {
          title: "Digital Marketing Package",
          description: "Enhance your online presence and reach more customers",
          service:
            "SEO optimization, content marketing, and social media management",
          planName: "🌟 Brand Master Plan",
          price: "₦950,000 / $599",
          icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746566762/growth_ggcqxd.png",
        },
      ];
    } else {
      return [
        {
          title: "Starter Kit",
          description: "Build a solid foundation for your brand online",
          service:
            "1-page website, WhatsApp business setup, social media audit",
          planName: "🔹 Starter Kit",
          price: "₦150,000 / $99",
          icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746565485/responsive-design_wobrfb.png",
        },
        {
          title: "Tech Consultation",
          description: "Get expert advice on how to improve your tech presence",
          service:
            "1-hour tech strategy call, social media audit, WhatsApp business setup",
          planName: "🔹 Starter Kit",
          price: "₦150,000 / $99",
          icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746696017/consultant_bgaqe2.png",
        },
      ];
    }
  };

  // Mock competitor data
  const competitors = [
    {
      name: "InnovateTech Solutions",
      score: 89,
      industry: "Technology",
      rating: 4.9,
      reviews: 127,
      description:
        "Leading digital transformation company with exceptional online presence",
      strengths: [
        "Mobile-first website",
        "Active social media",
        "Customer testimonials",
        "SEO optimized",
      ],
      avatar:
        "https://res.cloudinary.com/dgbreoalg/image/upload/v1733322294/foods_co_ovgnaw.webp",
      verified: true,
    },
    {
      name: "Digital Dynamics Ltd",
      score: 86,
      industry: "Technology",
      rating: 4.8,
      reviews: 94,
      description: "Comprehensive tech solutions with strong brand consistency",
      strengths: [
        "Professional branding",
        "Regular content",
        "Client case studies",
        "Modern tech stack",
      ],
      avatar:
        "https://res.cloudinary.com/dgbreoalg/image/upload/v1733321092/KFC_n6gc4v.png",
      verified: true,
    },
    {
      name: "NextGen Enterprises",
      score: 83,
      industry: "Technology",
      rating: 4.7,
      reviews: 156,
      description: "Innovative company with excellent customer engagement",
      strengths: [
        "Interactive website",
        "Social proof",
        "Industry partnerships",
        "Thought leadership",
      ],
      avatar:
        "https://res.cloudinary.com/dgbreoalg/image/upload/v1733320788/crunchies_yylzrm.webp",
      verified: true,
    },
  ];

  const nextRecommendation = () => {
    setCurrentRecommendation(
      (prev) => (prev + 1) % getRecommendations().length
    );
  };

  const renderStars = (rating: any) => {
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

        <div className="bg-gradient-to-br from-slate-900 to-gray-950 rounded-2xl border border-gray-700 p-6 md:p-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
            Best Match
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-4">
            <div className="md:w-1/3 flex justify-center">
              <img
                src={getRecommendations()[currentRecommendation].icon}
                alt={getRecommendations()[currentRecommendation].title}
                className="h-48 w-48 object-cover rounded-lg"
              />
            </div>

            <div className="md:w-2/3">
              <h4 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                {getRecommendations()[currentRecommendation].title}
              </h4>

              <p className="text-gray-300 mb-6 text-lg">
                {getRecommendations()[currentRecommendation].description}
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                  <span className="ml-3 text-gray-300">
                    {getRecommendations()[currentRecommendation].service}
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
                      {getRecommendations()[currentRecommendation].planName}
                    </p>
                    <p className="text-xl text-blue-400 font-bold">
                      {getRecommendations()[currentRecommendation].price}
                    </p>
                  </div>
                </div>

                <div className="sm:w-1/2 w-full space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105">
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

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {competitors.map((competitor, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-900 to-gray-950 rounded-2xl border border-gray-700 p-6 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={competitor.avatar}
                    alt={competitor.name}
                    className="w-12 h-12 rounded-full object-cover border-1 border-gray-200"
                  />
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
                      <span className="text-gray-300 text-xs">{strength}</span>
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
    </div>
  );
};

export default BrandRecommendations;
