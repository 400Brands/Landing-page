import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";

const BrandAnalysisForm = () => {
  const [brandName, setBrandName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Industry options
  const industries = [
    { key: "technology", label: "Technology & Software" },
    { key: "ecommerce", label: "E-commerce & Retail" },
    { key: "healthcare", label: "Healthcare & Medical" },
    { key: "finance", label: "Finance & Banking" },
    { key: "education", label: "Education & Training" },
    { key: "food", label: "Food & Beverage" },
    { key: "fashion", label: "Fashion & Beauty" },
    { key: "realestate", label: "Real Estate" },
    { key: "automotive", label: "Automotive" },
    { key: "entertainment", label: "Entertainment & Media" },
    { key: "travel", label: "Travel & Tourism" },
    { key: "sports", label: "Sports & Fitness" },
    { key: "nonprofit", label: "Non-profit & NGO" },
    { key: "manufacturing", label: "Manufacturing" },
    { key: "professional", label: "Professional Services" },
    { key: "other", label: "Other" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error
    setError(null);

    // Validate brand name
    if (!brandName.trim()) {
      setError("Please enter your brand name");
      return;
    }

    if (brandName.trim().length < 2) {
      setError("Brand name must be at least 2 characters");
      return;
    }

    // Validate industry selection
    if (!industry) {
      setError("Please select your industry");
      return;
    }

    // Navigate with both brand name and industry
    const selectedIndustry = industries.find((ind) => ind.key === industry);
    const params = new URLSearchParams({
      brand: brandName.trim(),
      industry: selectedIndustry?.label || industry,
    });

    navigate(`/bake?${params.toString()}`);
  };

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
    if (error) setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-4">
          {/* Brand Name Input */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Input
              type="text"
              label="Brand Name"
              placeholder="e.g., MyAwesomeBrand"
              value={brandName}
              onValueChange={(value) => {
                setBrandName(value);
                if (error) setError(null);
              }}
              isRequired
              variant="bordered"
              classNames={{
                base: "w-full",
                input: "text-white placeholder:text-gray-400",
                inputWrapper: `bg-gray-700/50 border ${
                  error && !brandName.trim()
                    ? "border-red-500/80"
                    : "border-gray-600"
                } hover:border-gray-500 focus-within:border-blue-500 transition-all duration-200`,
                label: "text-gray-300 font-medium",
              }}
            />
          </motion.div>

          {/* Industry Selection */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Select
              label="Industry"
              placeholder="Select your industry"
              value={industry}
              onSelectionChange={(key) => handleIndustryChange(key as string)}
              isRequired
              variant="bordered"
              classNames={{
                base: "w-full",
                trigger: `bg-gray-700/50 border ${
                  error && !industry ? "border-red-500/80" : "border-gray-600"
                } hover:border-gray-500 focus:border-blue-500 text-white`,
                label: "text-gray-300 font-medium",
                value: "text-white",
                popoverContent: "bg-gray-800 border-gray-600",
                listbox: "bg-gray-800",
              }}
            >
              {industries.map((industry) => (
                <SelectItem
                  key={industry.key}
                  classNames={{
                    base: "text-white hover:bg-gray-700 data-[selected=true]:bg-blue-600",
                  }}
                >
                  {industry.label}
                </SelectItem>
              ))}
            </Select>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="flex items-center justify-center gap-2">
              Analyze Brand
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.div>
            </span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default BrandAnalysisForm;