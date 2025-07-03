import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Input } from "@heroui/input";

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

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = e.target.value;
    setIndustry(selectedKey);
    if (error) setError(null);
  };

  const isIndustryError = error && (!industry || industry === "");
  const isBrandNameError = error && !brandName.trim();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-4">
          {/* Brand Name Input */}
          <div className="flex-1 relative">
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
          </div>

          {/* Industry Selection */}
          <div className="flex-1 relative">
            <label className="block text-gray-300 font-medium mb-1">
              Industry <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={industry}
                onChange={handleIndustryChange}
                required
                className={`w-full px-3 py-2.5 bg-gray-700/50 border ${
                  isIndustryError ? "border-red-500/80" : "border-gray-600"
                } hover:border-gray-500 focus:border-blue-500 text-white rounded-lg appearance-none transition-all duration-200 pr-8`}
              >
                <option value="">Select your industry</option>
                {industries.map((industryItem) => (
                  <option
                    key={industryItem.key}
                    value={industryItem.key}
                    className="bg-gray-800 text-white hover:bg-blue-600"
                  >
                    {industryItem.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              Analyze Brand
              <span>→</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandAnalysisForm;