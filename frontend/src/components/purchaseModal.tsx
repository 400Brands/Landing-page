import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: string;
  planTitle: string;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  planName,
  price,
  planTitle,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    customInstructions: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayNow = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const url =
        "https://script.google.com/macros/s/AKfycbyHj7OfbJDAGdnMmLmvyVSShEI0zKPeAd4MaMxoSlabn8QYBuerQZcX3t7SYopBr9AT/exec";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          customInstructions: formData.customInstructions,
          planName,
          price,
          planTitle,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();
      console.log("Submission successful:", data);

      // Navigate to payment page after successful submission
      window.location.href = "/payment";
    } catch (error) {
      console.error("Submission error:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior={"outside"}
      backdrop={"blur"}
    >
      <ModalContent className="bg-gradient-to-br from-slate-900 to-gray-950 border border-gray-700 rounded-2xl overflow-hidden">
        <ModalHeader className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Complete Your Purchase
              </h2>
              <p className="text-gray-400">
                You're about to purchase our premium service package
              </p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="p-6 ">
          {/* Selected Plan Card */}
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {planTitle}
                </h3>
                <p className="text-sm text-gray-400">{planName}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-400">{price}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="inline h-4 w-4 mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.fullName ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="inline h-4 w-4 mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.email ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Phone className="inline h-4 w-4 mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.phone ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Custom Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MessageSquare className="inline h-4 w-4 mr-2" />
                Custom Instructions (Optional)
              </label>
              <textarea
                name="customInstructions"
                value={formData.customInstructions}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                placeholder="Tell us about your specific requirements, preferences, or any additional details that would help us serve you better..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Share any specific requirements or preferences for your project
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="p-6 border-t border-gray-700">
          <div className="w-full space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handlePayNow}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                {isSubmitting ? "Processing..." : "Pay Now"}
                {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
              </button>

              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>

            {/* Security Note */}
            <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
              <p className="text-sm text-blue-300 text-center">
                🔒 Your information is secure and encrypted. We'll contact you
                within 24 hours to confirm your order details.
              </p>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PurchaseModal;
