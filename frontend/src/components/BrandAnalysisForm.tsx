//@ts-nocheck

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import type { Selection } from "@heroui/select";

interface Industry {
  key: string;
  label: string;
}

const BrandAnalysisForm = () => {
  const [brandName, setBrandName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Extended industry options with Fashion and Beauty separated
  const industries: Industry[] = [
    { key: "technology", label: "Technology & Software" },
    { key: "ecommerce", label: "E-commerce & Retail" },
    { key: "healthcare", label: "Healthcare & Medical" },
    { key: "finance", label: "Finance & Banking" },
    { key: "education", label: "Education & Training" },
    { key: "food", label: "Food & Beverage" },
    { key: "fashion", label: "Fashion & Apparel" },
    { key: "beauty", label: "Beauty & Cosmetics" },
    { key: "realestate", label: "Real Estate" },
    { key: "automotive", label: "Automotive" },
    { key: "entertainment", label: "Entertainment & Media" },
    { key: "travel", label: "Travel & Tourism" },
    { key: "sports", label: "Sports & Fitness" },
    { key: "nonprofit", label: "Non-profit & NGO" },
    { key: "manufacturing", label: "Manufacturing" },
    { key: "professional", label: "Professional Services" },
    { key: "consulting", label: "Consulting Services" },
    { key: "marketing", label: "Marketing & Advertising" },
    { key: "construction", label: "Construction & Architecture" },
    { key: "energy", label: "Energy & Utilities" },
    { key: "agriculture", label: "Agriculture & Farming" },
    { key: "logistics", label: "Logistics & Transportation" },
    { key: "telecommunications", label: "Telecommunications" },
    { key: "insurance", label: "Insurance" },
    { key: "legal", label: "Legal Services" },
    { key: "hospitality", label: "Hospitality & Hotels" },
    { key: "retail", label: "Retail & Consumer Goods" },
    { key: "pharmacy", label: "Pharmacy & Pharmaceuticals" },
    { key: "security", label: "Security Services" },
    { key: "government", label: "Government & Public Sector" },
    { key: "gaming", label: "Gaming & Esports" },
    { key: "photography", label: "Photography & Creative Services" },
    { key: "environmental", label: "Environmental Services" },
    { key: "petcare", label: "Pet Care & Veterinary" },
    { key: "childcare", label: "Childcare & Family Services" },
    { key: "eldercare", label: "Elder Care & Senior Services" },
    { key: "arts", label: "Arts & Culture" },
    { key: "jewelry", label: "Jewelry & Accessories" },
    { key: "home", label: "Home & Garden" },
    { key: "cleaning", label: "Cleaning Services" },
    { key: "other", label: "Other" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting form with brandName:", brandName);
    console.log("Submitting form with industry (state key):", industry);

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
    if (!industry || industry === "") {
      setError("Please select your industry");
      return;
    }

    // Find the selected industry object using the 'key' stored in the 'industry' state
    const selectedIndustry = industries.find((ind) => ind.key === industry);

    // Ensure we have a valid industry label before proceeding
    if (!selectedIndustry) {
      setError("Invalid industry selected. Please try again.");
      return;
    }

    // Navigate with both brand name and the *label* of the selected industry
    const params = new URLSearchParams({
      brand: brandName.trim(),
      industry: selectedIndustry.label,
    });

    navigate(`/bake?${params.toString()}`);
  };

  // Handle the Selection type from @heroui/select
  const handleIndustryChange = (selection: Selection) => {
    let selectedKey = "";

    if (typeof selection === "string") {
      // If it's a single selection (string key)
      selectedKey = selection;
    } else if (selection instanceof Set && selection.size > 0) {
      // If it's a Set (for multi-select, or how it's internally represented for single)
      const firstValue = selection.values().next().value;
      selectedKey = typeof firstValue === "string" ? firstValue : "";
    } else if (
      selection &&
      typeof selection === "object" &&
      "currentKey" in selection
    ) {
      // Handle other Selection types that might have a currentKey property
      selectedKey =
        typeof selection.currentKey === "string" ? selection.currentKey : "";
    }

    console.log("Industry selected (extracted key):", selectedKey);
    setIndustry(selectedKey);
    if (error) setError(null);
  };

  const isIndustryError = error && (!industry || industry === "");
  const isBrandNameError = error && !brandName.trim();

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
              onValueChange={(value: string) => {
                setBrandName(value);
                if (error) setError(null);
              }}
              isRequired
              variant="bordered"
              classNames={{
                base: "w-full",
                input: "text-white placeholder:text-gray-400",
                inputWrapper: `bg-gray-700/50 border ${
                  isBrandNameError ? "border-red-500/80" : "border-gray-600"
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
              selectedKeys={industry ? new Set([industry]) : new Set()}
              onSelectionChange={handleIndustryChange}
              isRequired
              variant="bordered"
              classNames={{
                base: "w-full",
                trigger: `bg-gray-700/50 border ${
                  isIndustryError ? "border-red-500/80" : "border-gray-600"
                } hover:border-gray-500 focus:border-blue-500 text-white`,
                label: "text-gray-300 font-medium",
                value: "text-white",
                popoverContent: "bg-gray-800 border-gray-600",
                listbox: "bg-gray-800",
              }}
            >
              {industries.map((industryItem) => (
                <SelectItem
                  key={industryItem.key}
                  
                  classNames={{
                    base: "text-white hover:bg-gray-700 data-[selected=true]:bg-blue-600",
                  }}
                >
                  {industryItem.label}
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
