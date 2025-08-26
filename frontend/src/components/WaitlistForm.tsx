import { useState } from "react";
import { Input } from "@heroui/input";
import { AlertCircle, Check } from "lucide-react";
import { supabase, WAITLIST_TABLE } from "@/lib/supabase";

const WaitlistForm = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error
    setError(null);

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Check if email already exists
      const { data: existingEmail } = await supabase
        .from(WAITLIST_TABLE)
        .select('email')
        .eq('email', email.trim())
        .single();

      if (existingEmail) {
        setError("This email is already on our waitlist!");
        return;
      }

      // Insert new email into waitlist
      const { data, error: insertError } = await supabase
        .from(WAITLIST_TABLE)
        .insert([
          {
            email: email.trim(),
            status: 'pending'
          }
        ])
        .select();

      if (insertError) {
        console.error('Supabase error:', insertError);
        setError("Something went wrong. Please try again.");
        return;
      }

      // Log to console for debugging
      console.log("Waitlist signup successful:", { 
        email: email.trim(), 
        timestamp: new Date().toISOString(),
        data 
      });

      // Show success state
      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) setError(null);
    if (isSubmitted) setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-3 text-green-400 text-center bg-green-500/10 border border-green-500/20 rounded-lg px-6 py-4">
          <Check className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">You're in! We'll send you an invite to test ScrollMine alpha soon.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex-1 relative">
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              value={email}
              onValueChange={handleEmailChange}
              isRequired
              variant="bordered"
              classNames={{
                base: "w-full",
                input: "text-white placeholder:text-gray-400",
                inputWrapper: `bg-gray-700/50 border ${
                  error ? "border-red-500/80" : "border-gray-600"
                } hover:border-gray-500 focus-within:border-blue-500 transition-all duration-200`,
                label: "text-gray-300 font-medium",
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

                     {/* Submit Button */}
           <button
             type="submit"
             disabled={isLoading}
             className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <span className="flex items-center justify-center gap-2">
               {isLoading ? (
                 <>
                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                   Joining...
                 </>
               ) : (
                 <>
                   Join Alpha Test
                   <span>→</span>
                 </>
               )}
             </span>
           </button>
        </div>
      </form>
    </div>
  );
};

export default WaitlistForm;
