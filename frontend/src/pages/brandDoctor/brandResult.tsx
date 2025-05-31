//@ts-nocheck

import { useState, useEffect } from "react";
import { Check, X, ShieldCheck, Star, TrendingUp, Eye } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@heroui/react";

interface BrandResultsDisplayProps {
  brandName: string;
  industry: string;
  score: number;
  medal: string;
}

const BrandResultsDisplay = ({
  brandName = "TechCorp",
  industry = "Technology",
  score = 78,
  medal = "Gold",
}: BrandResultsDisplayProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Optimized counter animation
  useEffect(() => {
    const duration = 1500; // Reduced from 2000
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);

      setDisplayScore(Math.round(score * easeOutQuad));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimationComplete(true);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  // Business Authenticity metrics
  const authenticityBenchmarks = [
    {
      title: "Legal Compliance",
      items: [
        { text: "CAC Registration verified", present: true },
        { text: "Valid TIN available", present: true },
        { text: "Corporate bank account", present: false },
      ],
      icon: <ShieldCheck className="text-green-500" size={18} />,
      score: 67,
    },
    {
      title: "Digital Presence",
      items: [
        { text: "Professional website (.com/.ng)", present: true },
        { text: "Business domain email", present: false },
        { text: "Active social media profiles", present: true },
      ],
      icon: <Check className="text-blue-500" size={18} />,
      score: 67,
    },
    {
      title: "Reputation Management",
      items: [
        { text: "Positive online reviews", present: true },
        { text: "No legal disputes", present: true },
        { text: "Verified partnerships", present: false },
      ],
      icon: <ShieldCheck className="text-purple-500" size={18} />,
      score: 67,
    },
  ];

  // Tech & Growth metrics
  const techBenchmarks = [
    {
      title: "Technical Maturity",
      items: [
        { text: "Mobile-responsive website", present: true },
        { text: "HTTPS secured", present: true },
        { text: "Modern tech tools (CRM, payments)", present: false },
      ],
      icon: <TrendingUp className="text-emerald-500" size={18} />,
      score: 67,
    },
    {
      title: "Brand Consistency",
      items: [
        { text: "Uniform branding across platforms", present: false },
        { text: "Professional content marketing", present: true },
        { text: "Active in tech communities", present: true },
      ],
      icon: <Star className="text-amber-500" size={18} />,
      score: 67,
    },
    {
      title: "Risk Assessment",
      items: [
        { text: "No impersonation detected", present: true },
        { text: "Physical address verified", present: false },
        { text: "No fake claims identified", present: true },
      ],
      icon: <X className="text-red-500" size={18} />,
      score: 67,
    },
  ];

  const circumference = 2 * Math.PI * 32; // Reduced from 42
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const MetricSection = ({ title, benchmarks, icon, bgColor, borderColor }: any) => (
    <div
      className={`bg-gradient-to-br ${bgColor} rounded-xl border ${borderColor} overflow-hidden`}
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center mr-2">
            {icon}
          </div>
          <h4 className="text-lg font-bold text-white">{title}</h4>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {benchmarks.map((benchmark, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {benchmark.icon}
                <h5 className="font-medium text-white ml-2 text-sm">
                  {benchmark.title}
                </h5>
              </div>
              <span
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{
                  color:
                    benchmark.score >= 80
                      ? "#10B981"
                      : benchmark.score >= 60
                      ? "#F59E0B"
                      : "#EF4444",
                  backgroundColor:
                    benchmark.score >= 80
                      ? "#10B98110"
                      : benchmark.score >= 60
                      ? "#F59E0B10"
                      : "#EF444410",
                }}
              >
                {benchmark.score}%
              </span>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: animationComplete ? `${benchmark.score}%` : "0%",
                  backgroundColor:
                    benchmark.score >= 80
                      ? "#10B981"
                      : benchmark.score >= 60
                      ? "#F59E0B"
                      : "#EF4444",
                }}
              />
            </div>

            <ul className="space-y-1">
              {benchmark.items.map((item, i) => (
                <li key={i} className="flex items-start text-xs">
                  {item.present ? (
                    <Check className="flex-shrink-0 h-3 w-3 text-green-500 mt-0.5" />
                  ) : (
                    <X className="flex-shrink-0 h-3 w-3 text-red-500 mt-0.5" />
                  )}
                  <span
                    className={`ml-1 ${
                      item.present ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-2 p-2 bg-gray-950">
        {/* Main Score Display */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-red-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {brandName}'s Brand Health Score
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              {/* Score Circle - Reduced size */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-800"></div>

                  <svg
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      strokeWidth="8"
                      stroke={
                        medal === "Gold"
                          ? "#F59E0B"
                          : medal === "Silver"
                          ? "#9CA3AF"
                          : medal === "Bronze"
                          ? "#B45309"
                          : "#EF4444"
                      }
                      strokeLinecap="round"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-white tabular-nums">
                      {displayScore}%
                    </span>
                    <span className="text-gray-300 text-sm mt-1">
                      Health Score
                    </span>
                    <span
                      className={`mt-2 inline-flex items-center px-4 py-1 rounded-full font-medium transition-all duration-500 ${
                        medal === "Gold"
                          ? "bg-yellow-500 text-yellow-900"
                          : medal === "Silver"
                          ? "bg-gray-400 text-gray-900"
                          : medal === "Bronze"
                          ? "bg-amber-600 text-amber-100"
                          : "bg-blue-500 text-white"
                      }`}
                      style={{
                        opacity: animationComplete ? 1 : 0,
                        transform: animationComplete
                          ? "scale(1)"
                          : "scale(0.8)",
                      }}
                    >
                      {medal} Level
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary Text */}
              <div className="max-w-md text-center lg:text-left">
                <h3 className="text-xl font-bold text-white mb-3">
                  {score >= 75
                    ? "Excellent Digital Presence!"
                    : score >= 60
                    ? "Good, With Growth Potential"
                    : score >= 45
                    ? "Needs Strategic Improvement"
                    : "Urgent Attention Required"}
                </h3>

                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {score >= 75
                    ? `${brandName} is performing exceptionally well in the ${industry} sector. You're ahead of 85% of similar businesses.`
                    : score >= 60
                    ? `${brandName} shows good potential in the ${industry} sector. Strategic improvements could boost your competitive edge.`
                    : score >= 45
                    ? `${brandName} is performing below average for the ${industry} sector. Key improvements needed for better market position.`
                    : `${brandName} requires immediate attention to core digital presence issues in the ${industry} sector.`}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4 justify-center lg:justify-start">
                  {[
                    "Digital Presence",
                    "Brand Identity",
                    "Technical Setup",
                    "Customer Trust",
                  ].map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-800 px-2 py-0.5 rounded-full text-xs text-gray-300 border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* See Details Button */}
                <div className="flex item-end justify-end w-full">
                  <button
                    onClick={onOpen}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-sm"
                  >
                    <Eye className="mr-1.5" size={16} />
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NextUI Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
        backdrop="blur"
        className="bg-gray-900 border border-gray-700"
      >
        <ModalContent>
            <>
              
              <ModalBody className="p-6">
                <div className="grid lg:grid-cols-2 gap-4">
                  <MetricSection
                    title="Business Authenticity"
                    benchmarks={authenticityBenchmarks}
                    icon={<ShieldCheck className="text-blue-400" size={18} />}
                    bgColor="from-blue-950/20 to-slate-900"
                    borderColor="border-blue-500/30"
                  />

                  <MetricSection
                    title="Tech & Growth Metrics"
                    benchmarks={techBenchmarks}
                    icon={<TrendingUp className="text-purple-400" size={18} />}
                    bgColor="from-purple-950/20 to-slate-900"
                    borderColor="border-purple-500/30"
                  />
                </div>
              </ModalBody>
              
            </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BrandResultsDisplay;
