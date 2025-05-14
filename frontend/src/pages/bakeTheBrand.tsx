"use client";
import { useState, useEffect } from "react";
import DefaultMain from "@/layouts/defaultMain";
import {
  ArrowBigRight,
  CheckIcon,
  FileWarningIcon,
  VerifiedIcon,
  HeartPulse,
  Headset,
  Phone,
  Star,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants from index page
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function BakeTheBrandPage() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [medal, setMedal] = useState("");
  const [currentRecommendation, setCurrentRecommendation] = useState(0);

  // For the animated score counter
  const [displayScore, setDisplayScore] = useState(0);

  const industries = [
    "Retail / E-commerce",
    "Real Estate",
    "Technology",
    "Healthcare",
    "Food & Beverage",
    "Fashion & Apparel",
    "Education",
    "Finance & Banking",
    "Entertainment",
    "Other",
  ];

  const handleAnalysis = () => {
    if (!brandName.trim() || !industry) return;

    setIsAnalyzing(true);

    // Simulate analysis
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 50) + 30; // 30-80 for demo
      setScore(randomScore);
      setDisplayScore(0); // Start the counter from 0

      if (randomScore >= 75) setMedal("Gold");
      else if (randomScore >= 60) setMedal("Silver");
      else if (randomScore >= 45) setMedal("Bronze");
      else setMedal("Starter");

      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  // Increment counter effect
  useEffect(() => {
    if (showResults && displayScore < score) {
      const timeout = setTimeout(() => {
        setDisplayScore((prev) => Math.min(prev + 1, score));
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [showResults, displayScore, score]);

  const resetAnalysis = () => {
    setShowResults(false);
    setBrandName("");
    setIndustry("");
  };

  // Analysis benchmarks with enhanced details
  const authenticityBenchmarks = [
    {
      title: "Legal Compliance",
      items: [
        "CAC Registration verified",
        "Valid TIN available",
        "Corporate bank account",
      ],
      icon: <VerifiedIcon className="text-green-500" />,
      score: Math.floor(Math.random() * 30) + 70,
    },
    {
      title: "Digital Presence",
      items: [
        "Professional website (.com/.ng)",
        "Business domain email",
        "Active social media profiles",
      ],
      icon: <CheckIcon className="text-blue-500" />,
      score: Math.floor(Math.random() * 40) + 50,
    },
    {
      title: "Reputation",
      items: [
        "Positive online reviews",
        "No legal disputes",
        "Verified partnerships",
      ],
      icon: <VerifiedIcon className="text-purple-500" />,
      score: Math.floor(Math.random() * 50) + 40,
    },
  ];

  const techBenchmarks = [
    {
      title: "Technical Maturity",
      items: [
        "Mobile-responsive website",
        "HTTPS secured",
        "Modern tech tools (CRM, payments)",
      ],
      icon: <CheckIcon className="text-emerald-500" />,
      score: Math.floor(Math.random() * 40) + 40,
    },
    {
      title: "Brand Consistency",
      items: [
        "Uniform branding across platforms",
        "Professional content marketing",
        "Active in tech communities",
      ],
      icon: <CheckIcon className="text-amber-500" />,
      score: Math.floor(Math.random() * 35) + 55,
    },
    {
      title: "Red Flags Checked",
      items: [
        "No impersonation detected",
        "Physical address verified",
        "No fake claims identified",
      ],
      icon: <FileWarningIcon className="text-red-500" />,
      score: Math.floor(Math.random() * 25) + 65,
    },
  ];

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

  const nextRecommendation = () => {
    setCurrentRecommendation(
      (prev) => (prev + 1) % getRecommendations().length
    );
  };

  return (
    <DefaultMain>
      <section className="py-8 md:py-8 bg-gray-950">
        {/* Hero Section */}
        <motion.div
          className="container mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div className="text-center mb-12" variants={slideUp}>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            >
              Brand Doctor
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Get a professional assessment of your brand's health and receive
              tailored recommendations to boost your presence
            </motion.p>
          </motion.div>

          {!showResults ? (
            <motion.div className="max-w-3xl mx-auto" variants={scaleUp}>
              <motion.div
                className="bg-gradient-to-br from-slate-900 to-gray-950 p-8 rounded-xl border border-gray-700 shadow-xl"
                whileHover={{
                  boxShadow:
                    "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
                }}
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    <HeartPulse className="w-6 h-6 text-blue-300" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Free Brand Health Check
                    </h2>
                    <p className="text-gray-400">
                      Test your brand's online health and get expert
                      recommendations
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="brand-name"
                      className="block text-lg font-medium text-gray-300 mb-2"
                    >
                      Your Brand/Business Name
                    </label>
                    <motion.input
                      type="text"
                      id="brand-name"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g. My Business Name"
                      whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-lg font-medium text-gray-300 mb-2"
                    >
                      Industry/Sector
                    </label>
                    <motion.select
                      id="industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
                    >
                      <option value="">Select your industry</option>
                      {industries.map((ind, index) => (
                        <option key={index} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </motion.select>
                  </div>

                  <motion.div
                    className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-500"
                    whileHover={{ x: 5 }}
                  >
                    <h3 className="font-bold text-white mb-2">
                      What We Analyze:
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
                      {[
                        "Legal compliance & registration",
                        "Digital footprint & reputation",
                        "Technical infrastructure quality",
                        "Competitor benchmarking",
                        "Social media presence & engagement",
                        "Brand consistency across platforms",
                      ].map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center"
                          whileHover={{ x: 3 }}
                        >
                          <CheckIcon className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.button
                    onClick={handleAnalysis}
                    disabled={isAnalyzing || !brandName.trim() || !industry}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isAnalyzing || !brandName.trim() || !industry
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                    }`}
                    whileHover={
                      brandName.trim() && industry
                        ? {
                            scale: 1.02,
                            boxShadow:
                              "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
                          }
                        : {}
                    }
                    whileTap={
                      brandName.trim() && industry ? { scale: 0.98 } : {}
                    }
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Analyzing {industry} Industry Standards...
                      </span>
                    ) : (
                      "Check My Brand Health Now"
                    )}
                  </motion.button>

                  <motion.p
                    className="text-center text-gray-400 text-sm"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    Takes less than 60 seconds • No credit card required •
                    Instant results
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Score Display */}
              <motion.div
                className="max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-gray-950 rounded-xl overflow-hidden border border-gray-700 shadow-xl"
                variants={scaleUp}
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                }}
              >
                <motion.div className="p-8 text-center">
                  <motion.h2
                    className="text-3xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {brandName}'s Brand Health Score
                  </motion.h2>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <motion.div
                      className="relative w-48 h-48"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        delay: 0.5,
                      }}
                    >
                      {/* Background circle */}
                      <div className="absolute inset-0 rounded-full border-[16px] border-gray-800"></div>

                      {/* Animated progress circle */}
                      <svg
                        className="absolute inset-0 w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          strokeWidth="16"
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
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: score / 100 }}
                          transition={{
                            duration: 2,
                            ease: "easeOut",
                            delay: 0.8,
                          }}
                          strokeDasharray="264"
                          strokeDashoffset="0"
                        />
                      </svg>

                      {/* Score text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                          className="text-5xl font-bold text-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          {displayScore}%
                        </motion.span>
                        <motion.span
                          className="text-sm text-gray-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          Health Score
                        </motion.span>
                        <motion.span
                          className={`mt-2 inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${
                            medal === "Gold"
                              ? "bg-yellow-500 text-yellow-900"
                              : medal === "Silver"
                              ? "bg-gray-400 text-gray-900"
                              : medal === "Bronze"
                              ? "bg-amber-600 text-amber-100"
                              : "bg-blue-500 text-white"
                          }`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.5, type: "spring" }}
                        >
                          {medal} Level
                        </motion.span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="max-w-lg text-left"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {score >= 75
                          ? "Excellent Digital Presence!"
                          : score >= 60
                          ? "Good, With Growth Potential"
                          : score >= 45
                          ? "Needs Strategic Improvement"
                          : "Urgent Attention Required"}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {score >= 75
                          ? `${brandName} is performing exceptionally well in the ${industry} sector. You're ahead of 85% of similar businesses in your region. Focus on optimization to maintain your lead.`
                          : score >= 60
                          ? `${brandName} shows good potential in the ${industry} sector. With some strategic improvements, you could significantly outperform competitors in your region.`
                          : score >= 45
                          ? `${brandName} is performing below average for the ${industry} sector. Addressing key gaps could quickly improve your market position and customer trust.`
                          : `${brandName} requires immediate attention to core digital presence issues. You're missing key opportunities in the ${industry} sector that competitors are leveraging.`}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {[
                          "Digital Presence",
                          "Brand Identity",
                          "Technical Setup",
                          "Customer Trust",
                        ].map((tag, idx) => (
                          <motion.span
                            key={idx}
                            className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 + idx * 0.1 }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "#374151",
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Performance Metrics */}
              <motion.div
                className="max-w-5xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                <motion.h3
                  className="text-2xl font-bold text-white mb-6 text-center"
                  variants={item}
                >
                  Detailed Performance Metrics
                </motion.h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Business Authenticity */}
                  <motion.div
                    className="bg-gradient-to-br from-slate-900 to-gray-950 rounded-xl border border-gray-700 overflow-hidden"
                    variants={item}
                    whileHover={{ y: -5, borderColor: "#3b82f6" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 border-b border-gray-800">
                      <div className="flex items-center">
                        <motion.div
                          className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center mr-3"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 1 }}
                        >
                          <VerifiedIcon className="text-blue-400" />
                        </motion.div>
                        <h4 className="text-xl font-bold text-white">
                          Business Authenticity
                        </h4>
                      </div>
                    </div>

                    <div className="p-6 space-y-5">
                      {authenticityBenchmarks.map((benchmark, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              {benchmark.icon}
                              <h5 className="font-medium text-white ml-2">
                                {benchmark.title}
                              </h5>
                            </div>
                            <span
                              className="text-sm font-medium"
                              style={{
                                color:
                                  benchmark.score >= 80
                                    ? "#10B981"
                                    : benchmark.score >= 60
                                    ? "#F59E0B"
                                    : "#EF4444",
                              }}
                            >
                              {benchmark.score}%
                            </span>
                          </div>

                          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-3">
                            <motion.div
                              className="h-2.5 rounded-full"
                              style={{
                                width: `${benchmark.score}%`,
                                backgroundColor:
                                  benchmark.score >= 80
                                    ? "#10B981"
                                    : benchmark.score >= 60
                                    ? "#F59E0B"
                                    : "#EF4444",
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${benchmark.score}%` }}
                              transition={{
                                duration: 1,
                                delay: 0.5 + index * 0.2,
                              }}
                            />
                          </div>

                          <ul className="space-y-1 text-gray-400 text-sm">
                            {benchmark.items.map((item, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start"
                                whileHover={{ x: 3 }}
                              >
                                <CheckIcon className="flex-shrink-0 h-4 w-4 text-blue-500 mt-0.5" />
                                <span className="ml-2">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tech & Social Stature */}
                  <motion.div
                    className="bg-gradient-to-br from-slate-900 to-gray-950 rounded-xl border border-gray-700 overflow-hidden"
                    variants={item}
                    whileHover={{ y: -5, borderColor: "#8B5CF6" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 border-b border-gray-800">
                      <div className="flex items-center">
                        <motion.div
                          className="w-10 h-10 bg-purple-900/30 rounded-full flex items-center justify-center mr-3"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 1 }}
                        >
                          <Star className="text-purple-400" />
                        </motion.div>
                        <h4 className="text-xl font-bold text-white">
                          Tech & Social Stature
                        </h4>
                      </div>
                    </div>

                    <div className="p-6 space-y-5">
                      {techBenchmarks.map((benchmark, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              {benchmark.icon}
                              <h5 className="font-medium text-white ml-2">
                                {benchmark.title}
                              </h5>
                            </div>
                            <span
                              className="text-sm font-medium"
                              style={{
                                color:
                                  benchmark.score >= 80
                                    ? "#10B981"
                                    : benchmark.score >= 60
                                    ? "#F59E0B"
                                    : "#EF4444",
                              }}
                            >
                              {benchmark.score}%
                            </span>
                          </div>

                          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-3">
                            <motion.div
                              className="h-2.5 rounded-full"
                              style={{
                                width: `${benchmark.score}%`,
                                backgroundColor:
                                  benchmark.score >= 80
                                    ? "#10B981"
                                    : benchmark.score >= 60
                                    ? "#F59E0B"
                                    : "#EF4444",
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${benchmark.score}%` }}
                              transition={{
                                duration: 1,
                                delay: 0.5 + index * 0.2,
                              }}
                            />
                          </div>

                          <ul className="space-y-1 text-gray-400 text-sm">
                            {benchmark.items.map((item, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start"
                                whileHover={{ x: 3 }}
                              >
                                <CheckIcon className="flex-shrink-0 h-4 w-4 text-purple-500 mt-0.5" />
                                <span className="ml-2">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Recommended Services */}
              <motion.div
                className="max-w-5xl mx-auto"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <motion.h3
                  className="text-2xl font-bold text-white mb-6 text-center"
                  variants={item}
                >
                  Recommended Services For {brandName}
                </motion.h3>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRecommendation}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-slate-900 to-gray-950 rounded-xl border border-gray-700 p-6 md:p-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-600 text-white px-4 py-1 text-sm font-medium">
                      Best Match
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="md:w-1/3 flex justify-center">
                        <img
                          src={getRecommendations()[currentRecommendation].icon}
                          alt={
                            getRecommendations()[currentRecommendation].title
                          }
                          className="h-48 object-contain"
                        />
                      </div>

                      <div className="md:w-2/3">
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {getRecommendations()[currentRecommendation].title}
                        </h4>

                        <p className="text-gray-300 mb-4">
                          {
                            getRecommendations()[currentRecommendation]
                              .description
                          }
                        </p>

                        <ul className="space-y-3 mb-6">
                          <li className="flex items-start">
                            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                            <span className="ml-2 text-gray-300">
                              {
                                getRecommendations()[currentRecommendation]
                                  .service
                              }
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                            <span className="ml-2 text-gray-300">
                              Free technical consultation
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                            <span className="ml-2 text-gray-300">
                              Ongoing support for 30 days
                            </span>
                          </li>
                        </ul>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="sm:w-1/2">
                            <div className="bg-gray-800 rounded-lg p-4 text-center">
                              <p className="text-sm text-gray-400">
                                Service Package
                              </p>
                              <p className="text-xl font-bold text-white">
                                {
                                  getRecommendations()[currentRecommendation]
                                    .planName
                                }
                              </p>
                              <p className="text-lg text-blue-400 font-medium">
                                {
                                  getRecommendations()[currentRecommendation]
                                    .price
                                }
                              </p>
                            </div>
                          </div>

                          <div className="sm:w-1/2 w-full">
                            <motion.button
                              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Request Consultation
                              <ArrowUpRight className="ml-2 h-5 w-5" />
                            </motion.button>

                            <motion.button
                              onClick={nextRecommendation}
                              className="w-full mt-2 bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              See Alternative
                              <ArrowBigRight className="ml-2 h-5 w-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Free Resources */}
              <motion.div
                className="max-w-5xl mx-auto"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <motion.h3
                  className="text-2xl font-bold text-white mb-6 text-center"
                  variants={item}
                >
                  Free Resources To Improve Your Score
                </motion.h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Digital Health Guide",
                      description:
                        "Essential steps to improve your brand's online presence",
                      icon: <HeartPulse className="h-8 w-8 text-red-400" />,
                      color: "from-red-900/20 to-red-900/5",
                    },
                    {
                      title: "Tech Setup Checklist",
                      description:
                        "Technical requirements for a professional business setup",
                      icon: <Headset className="h-8 w-8 text-blue-400" />,
                      color: "from-blue-900/20 to-blue-900/5",
                    },
                    {
                      title: "Book Consultation",
                      description:
                        "Schedule a free 15-minute consultation with our experts",
                      icon: <Phone className="h-8 w-8 text-green-400" />,
                      color: "from-green-900/20 to-green-900/5",
                    },
                  ].map((resource, index) => (
                    <motion.div
                      key={index}
                      className={`bg-gradient-to-br ${resource.color} rounded-xl border border-gray-700 p-6 flex flex-col items-center text-center`}
                      variants={item}
                      whileHover={{ y: -5, borderColor: "#4B5563" }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 1 }}
                      >
                        {resource.icon}
                      </motion.div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {resource.title}
                      </h4>
                      <p className="text-gray-400 mb-4">
                        {resource.description}
                      </p>
                      <motion.button
                        className="mt-auto bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Access Resource
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="max-w-5xl mx-auto mt-2"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-900/50 p-8 text-center"
                  variants={scaleUp}
                >
                  <motion.div
                    className="absolute top-2 right-4"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <AlertCircle className="h-6 w-6 text-blue-400" />
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Unlock {brandName}'s Full Potential
                  </h3>
                  <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                    Get a complete brand overhaul with our expert team. We've
                    analyzed over 500+ brands in the {industry} industry and
                    know exactly what works.
                  </p>

                  <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-4"
                    variants={staggerContainer}
                  >
                    <motion.button
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      variants={item}
                    >
                      Schedule Strategy Call
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </motion.button>

                    <motion.button
                      onClick={resetAnalysis}
                      className="bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 font-medium py-3 px-8 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      variants={item}
                    >
                      Check Another Brand
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </section>
    </DefaultMain>
  );
}
