//@ts-nocheck

import { useState, useEffect } from "react";
import {
  Check,
  X,
  ShieldCheck,

  TrendingUp,
  Eye,
  Search,
  MousePointer,
  Globe,

  FileText,
  MessageSquare,
  Target,
  BarChart3,
  Heart,
  Crown,
  Lock,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";

interface BenchmarkItem {
  text: string;
  present: boolean;
  impact?: string; // Revenue leak description
}

interface Benchmark {
  title: string;
  score: number;
  items: BenchmarkItem[];
  moneyLeak: string; // Main revenue leak insight
  isPaid?: boolean; // Whether this is a paid metric
}

interface BrandResultsDisplayProps {
  brandName: string;
  industry: string;
  score: number;
  medal: string;
  freeMetrics?: Benchmark[];
  paidMetrics?: Benchmark[];
  summary?: string;
  isPremiumUser?: boolean;
}

const BrandResultsDisplay = ({
  brandName = "TechCorp",
  industry = "Technology",
  score = 78,
  medal = "Gold",
  freeMetrics,
  paidMetrics,
  summary,
  isPremiumUser = false,
}: BrandResultsDisplayProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
 
  const [activeTab, setActiveTab] = useState<"free" | "paid">("free");

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Dynamic styling based on score
  const getScoreBasedStyling = (score: number) => {
    if (score >= 85) {
      return {
        bgColor: "bg-green-900",
        border: "border-green-500/40",
        shadow: "shadow-green-500/20",
      };
    } else if (score >= 75) {
      return {
        bgColor: "bg-blue-900",
        border: "border-blue-500/40",
        shadow: "shadow-blue-500/20",
      };
    } else if (score >= 60) {
      return {
        bgColor: "bg-yellow-900",
        border: "border-yellow-500/40",
        shadow: "shadow-yellow-500/20",
      };
    } else if (score >= 45) {
      return {
        bgColor: "bg-orange-900",
        border: "border-orange-500/40",
        shadow: "shadow-orange-500/20",
      };
    } else {
      return {
        bgColor: "bg-red-900",
        border: "border-red-500/40",
        shadow: "shadow-red-500/20",
      };
    }
  };

  const scoreStyles = getScoreBasedStyling(score);

  // Score animation
  useEffect(() => {
    const duration = 1500;
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

  

  const finalFreeMetrics = freeMetrics 
  const finalPaidMetrics = paidMetrics 

  // Icon mapping for metrics
  const getMetricIcon = (title: string) => {
    const iconMap = {
      "Search Visibility Score": <Search className="text-blue-400" size={18} />,
      "Website Conversion Readiness": (
        <MousePointer className="text-green-400" size={18} />
      ),
      "Digital Presence Score": <Globe className="text-purple-400" size={18} />,
      "Trust & Credibility Signals": (
        <ShieldCheck className="text-emerald-400" size={18} />
      ),
      "Content Authority Index": (
        <FileText className="text-amber-400" size={18} />
      ),
      "Social Proof & Mentions": (
        <MessageSquare className="text-pink-400" size={18} />
      ),
      "Top 3 Competitor Advantage Analysis": (
        <Target className="text-red-400" size={18} />
      ),
      "Marketing Funnel Strength Assessment": (
        <BarChart3 className="text-indigo-400" size={18} />
      ),
      "Engagement-to-Conversion Ratio": (
        <Heart className="text-rose-400" size={18} />
      ),
      "Perceived Brand Authority Score": (
        <Crown className="text-yellow-400" size={18} />
      ),
    };
    return iconMap[title] || <TrendingUp className="text-gray-400" size={18} />;
  };

  const circumference = 2 * Math.PI * 32;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const MetricCard = ({
    metric
  }: {
    metric: Benchmark;
    index: number;
  }) => (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center mr-3">
              {getMetricIcon(metric.title)}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{metric.title}</h4>
              <div className="flex items-center mt-1">
                <span
                  className="text-xs font-bold px-2 py-1 rounded-full mr-2"
                  style={{
                    color:
                      metric.score >= 80
                        ? "#10B981"
                        : metric.score >= 60
                          ? "#F59E0B"
                          : "#EF4444",
                    backgroundColor:
                      metric.score >= 80
                        ? "#10B98110"
                        : metric.score >= 60
                          ? "#F59E0B10"
                          : "#EF444410",
                  }}
                >
                  {metric.score}%
                </span>
              </div>
            </div>
          </div>
          {metric.isPaid && (
            <div className="flex items-center">
              <Lock className="text-amber-400 mr-1" size={16} />
              <span className="text-xs text-amber-400 font-medium">
                PREMIUM
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Money Leak Insight - Only show if at least one item is not present */}
        {metric.items.some((item) => !item.present) && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle
                className="text-red-400 mr-2 mt-0.5 flex-shrink-0"
                size={16}
              />
              <div>
                <h5 className="text-red-300 font-medium text-sm mb-1">
                  Revenue Leak
                </h5>
                <p className="text-red-200 text-xs">{metric.moneyLeak}</p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
          <div
            className="h-2 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: animationComplete ? `${metric.score}%` : "0%",
              backgroundColor:
                metric.score >= 80
                  ? "#10B981"
                  : metric.score >= 60
                    ? "#F59E0B"
                    : "#EF4444",
            }}
          />
        </div>

        {/* Data Points */}
        <ul className="space-y-2">
          {metric.items.map((item, i) => (
            <li key={i} className="flex items-start text-xs">
              {item.present ? (
                <Check className="flex-shrink-0 h-3 w-3 text-green-500 mt-0.5 mr-2" />
              ) : (
                <X className="flex-shrink-0 h-3 w-3 text-red-500 mt-0.5 mr-2" />
              )}
              <div className="flex-1">
                <span
                  className={`${item.present ? "text-gray-300" : "text-gray-500"}`}
                >
                  {item.text}
                </span>
                {item.impact && (
                  <p className="text-gray-400 text-xs mt-1 italic">
                    {item.impact}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const PaidWallOverlay = () => (
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent rounded-xl flex items-center justify-center backdrop-blur-sm">
      <div className="text-center p-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Premium Insights</h3>
        <p className="text-gray-300 text-sm mb-4 max-w-xs">
          Unlock deep revenue opportunity analysis and competitor intelligence
        </p>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg">
          <Zap className="inline mr-2" size={16} />
          SignUp
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-2 p-4 ">
      {/* Main Score Display */}
      <div
        className={`max-w-2xl mx-auto ${scoreStyles.bgColor} rounded-2xl overflow-hidden border ${scoreStyles.border} shadow-2xl ${scoreStyles.shadow}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {brandName}'s Brand & Market Health
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Score Circle */}
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
                      transform: animationComplete ? "scale(1)" : "scale(0.8)",
                    }}
                  >
                    {medal} Level
                  </span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="max-w-md text-center lg:text-left">
              <h3 className="text-xl font-bold text-white mb-3">
                {score >= 75
                  ? "Strong Foundation, Minor Leaks"
                  : score >= 60
                    ? "Good Potential, Revenue Opportunities"
                    : score >= 45
                      ? "Significant Revenue Leaks Detected"
                      : "Critical Revenue Bleeding"}
              </h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {summary ||
                  `We found ${finalFreeMetrics.length + finalPaidMetrics.length} areas where ${brandName} is potentially losing revenue in the ${industry} sector.`}
              </p>
              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={onOpen}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Eye className="mr-2" size={18} />
                  Show Revenue Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="outside"
        backdrop="blur"
      >
        <ModalContent>
          <>
            <ModalBody>
              <div className="max-w-7xl mx-auto">
                {/* Tab Navigation */}
                <div className="flex bg-gray-800 rounded-lg p-1 mb-6 max-w-md mx-auto">
                  <button
                    onClick={() => setActiveTab("free")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === "free"
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Free Metrics ({finalFreeMetrics.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("paid")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === "paid"
                        ? "bg-green-500 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Lock className="inline mr-1" size={14} />
                    Advanced ({finalPaidMetrics.length})
                  </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {activeTab === "free"
                    ? finalFreeMetrics.map((metric, index) => (
                        <MetricCard key={index} metric={metric} index={index} />
                      ))
                    : finalPaidMetrics.map((metric, index) => (
                        <div key={index} className="relative">
                          <MetricCard metric={metric} index={index} />
                          {!isPremiumUser && <PaidWallOverlay />}
                        </div>
                      ))}
                </div>
              </div>
            </ModalBody>{" "}
            <ModalFooter>
              <Button  variant="solid" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BrandResultsDisplay;