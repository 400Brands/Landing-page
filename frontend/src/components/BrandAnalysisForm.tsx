import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

 const BrandAnalysisForm = () => {
  const [brandName, setBrandName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!brandName.trim()) {
      setError("Please enter your brand name");
      return;
    }

    if (brandName.trim().length < 2) {
      setError("Brand name must be at least 2 characters");
      return;
    }

    setError(null);
    navigate(`/bake?brand=${encodeURIComponent(brandName.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.div className="flex-1 relative">
            <input
              type="text"
              value={brandName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBrandName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g., MyAwesomeBrand"
              className={`w-full px-4 py-3 bg-gray-700/50 border ${
                error ? "border-red-500/80" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 ${
                error ? "focus:ring-red-500" : "focus:ring-blue-500"
              } text-white placeholder-gray-400 transition-colors`}
            />

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-400 text-sm mt-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Analyze Brand
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default BrandAnalysisForm;