import { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, CheckIcon } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};


const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

interface BrandAnalysisFormProps {
  onAnalysis: (brandName: string, industry: string) => void;
  isAnalyzing: boolean;
}

const BrandAnalysisForm: React.FC<BrandAnalysisFormProps> = ({
  onAnalysis,
  isAnalyzing,
}) => {
  const [brandName, setBrandName] = useState("");
  const industry = "online";

  const handleSubmit = () => {
    if (!brandName.trim() || !industry) return;
    onAnalysis(brandName, industry);
  };

  return (
    <motion.div
      className="container min-h-screen mx-auto px-4"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >

      {/* Form Section */}
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
                Brands Doctor
              </h2>
              <p className="text-gray-400">
                Test your brand's online health and get expert recommendations
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

            <motion.div
              className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-500"
              whileHover={{ x: 5 }}
            >
              <h3 className="font-bold text-white mb-2">What We Analyze:</h3>
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
              onClick={handleSubmit}
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
                      boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
                    }
                  : {}
              }
              whileTap={brandName.trim() && industry ? { scale: 0.98 } : {}}
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
              Takes less than 60 seconds • No credit card required • Instant
              results
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BrandAnalysisForm;
