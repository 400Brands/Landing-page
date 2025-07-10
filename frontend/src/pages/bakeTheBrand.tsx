//@ts-nocheck

import { useState, useEffect } from "react";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import DefaultMain from "@/layouts/defaultMain";
import BrandAnalysisForm from "./brandDoctor/brandForm";
import BrandResultsDisplay from "./brandDoctor/brandResult";
import BrandRecommendations from "./brandDoctor/brandRecommendation";
import { useAuth } from "@/context/AuthContext";

// Initialize Gemini AI
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your actual key
// IMPORTANT: For production, do NOT expose your API key directly in client-side code.
// Consider using environment variables (process.env.NEXT_PUBLIC_GEMINI_API_KEY)
// or a backend proxy to make API calls securely.

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

// Location interface for ipapi.co response
interface LocationData {
  country_name: string;
  country_code: string;
  city: string;
  region: string;
  error?: boolean;
  reason?: string;
}

// Competitor interface
interface Competitor {
  name: string;
  score: number;
  industry: string;
  rating: number;
  reviews: number;
  description: string;
  strengths: string[];
  avatar: string;
  verified: boolean;
}

// Service recommendation interface matching BrandRecommendations
interface ServiceRecommendation {
  title: string;
  description: string;
  service: string;
  planName: string;
  price?: string;
  icon?: string;
  priority: number;
  relevantBenchmarks: string[];
}

// Updated benchmark interfaces to match BrandResultsDisplay
interface BenchmarkItem {
  text: string;
  present: boolean;
  impact?: string;
}

interface Benchmark {
  title: string;
  score: number;
  items: BenchmarkItem[];
  moneyLeak: string;
  isPaid?: boolean;
}

interface AnalysisResult {
  score: number;
  medal: string;
  summary: string;
  freeMetrics: Benchmark[];
  paidMetrics: Benchmark[];
  competitors: Competitor[];
  recommendations: ServiceRecommendation[];
}

export default function BrandDoctorPage() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);

  // Function to get user's location using ipapi.co
  const getUserLocation = async (): Promise<LocationData> => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      console.log(data);

      if (data.error) {
        throw new Error(data.reason || "Failed to get location");
      }

      return data;
    } catch (error) {
      console.error("Error fetching location:", error);
      // Return default location if API fails
      return {
        country_name: "Nigeria",
        country_code: "NG",
        city: "Lagos",
        region: "Lagos",
      };
    }
  };

  const { user  } = useAuth();

  // Get user location on component mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getUserLocation();
        console.log(`location - ${location.city}`);
        setUserLocation(location);
      } catch (error) {
        console.error("Failed to fetch location:", error);
        // Set default location if fetch fails
        setUserLocation({
          country_name: "Nigeria",
          country_code: "NG",
          city: "Lagos",
          region: "Lagos",
        });
      } finally {
        setLocationLoading(false);
      }
    };

    fetchLocation();
  }, []);

  // Function to transform AI benchmarks to the new format
  const transformBenchmarks = (
    benchmarks: any[],
    isPaid: boolean = false
  ): Benchmark[] => {
    const moneyLeakMessages = {
      "Legal Compliance":
        "Lack of legal compliance creates customer trust issues, reducing conversion rates by up to 40%",
      "Digital Presence":
        "Poor digital presence means customers can't find or verify your business, losing 60% of potential leads",
      "Reputation Management":
        "Negative or missing reviews cause 80% of customers to choose competitors instead",
      "Technical Maturity":
        "Slow, insecure, or broken website loses 50% of visitors before they convert",
      "Brand Consistency":
        "Inconsistent branding confuses customers and reduces brand recall by 70%",
      "Risk Assessment":
        "Security and trust issues cause customers to abandon purchases at checkout",
      "Search Visibility Score":
        "You're invisible to customers actively searching for what you offer",
      "Website Conversion Readiness":
        "Lots of visits, but no signups/sales because CTAs aren't effective",
      "Trust & Credibility Signals":
        "Lack of trust = lost customers at the final decision stage",
      "Content Authority Index":
        "Customers see competitors as more knowledgeable, so they win deals",
      "Social Proof & Mentions":
        "No buzz = no virality = high customer acquisition cost",
      "Competitor Advantage Analysis":
        "Competitors win more traffic, attention, and conversions",
      "Marketing Funnel Strength":
        "You're losing leads at every stage due to broken or missing funnel",
      "Engagement-to-Conversion Ratio":
        "You're posting, but it's not selling or converting",
      "Perceived Brand Authority":
        "Low perceived status = less pricing power and premium positioning",
    };

    return benchmarks.map((benchmark) => ({
      title: benchmark.title,
      score: benchmark.score,
      moneyLeak:
        moneyLeakMessages[benchmark.title] ||
        "This issue is causing potential revenue loss",
      isPaid,
      items: benchmark.items.map((item: any) => ({
        text: item.text,
        present: item.present,
        impact: item.present
          ? "Contributing to brand health"
          : "Potential revenue opportunity",
      })),
    }));
  };

  const analyzeBrandWithAI = async (
    brandName: string,
    industry: string
  ): Promise<AnalysisResult> => {
    // Log to Google Apps Script
    const url =
      "https://script.google.com/macros/s/AKfycbyzC8e9cFqIRRGs5sjD069dC-DJ6J4l5KCylBAmig4j56xXnEWH0kIOlhD2ikBwHpcC/exec";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `country_name=${userLocation?.country_name}&city=${userLocation?.city}&brandName=${brandName}&industry=${industry}`,
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));

    // Use detected country or fallback to Nigeria
    const country = userLocation?.country_name || "Nigeria";
    const countryCode = userLocation?.country_code || "NG";

    // Updated prompt for analyzeBrandWithAI function
    const prompt = `
Perform a comprehensive revenue leak analysis for the brand "${brandName}" in the "${industry}" industry, focusing on their presence in ${country}.
**Use the available web search tool to find and verify public online information** to assess potential revenue losses.

Analyze the brand across FREE METRICS (basic revenue leaks):

FREE METRICS:
1. Search Visibility Score - How findable are they when customers search?
2. Website Conversion Readiness - Are visitors converting to leads/sales?
3. Digital Presence Score - Do they look professional and trustworthy online?
4. Trust & Credibility Signals - Do customers trust them enough to buy?
5. Content Authority Index - Are they seen as industry experts?
6. Social Proof & Mentions - Do they have buzz and recommendations?

PAID METRICS (premium insights):
1. Competitor Advantage Analysis - How do top 3 competitors outperform them?
2. Marketing Funnel Strength Assessment - Where are leads being lost?
3. Engagement-to-Conversion Ratio - Is their content driving sales?
4. Perceived Brand Authority Score - How much premium pricing power do they have?

**Additionally, identify the 3 strongest competitors in the "${industry}" industry in ${country}** with their details.

**IMPORTANT: Generate 2-3 specific service recommendations** based on the analysis findings. Each recommendation should address the biggest revenue leaks identified.

For each FREE metric, provide:
- A score out of 100
- 3-4 specific evaluation items with true/false status
- Focus on revenue impact potential

For each PAID metric, provide:
- A score out of 100  
- 3-4 specific evaluation items with true/false status
- Focus on competitive disadvantages and missed opportunities

For competitors, find:
- name, score (0-100), industry, rating (1-5), reviews count, description, strengths array, avatar URL, verified boolean

For service recommendations, provide:
- title: Clear service name
- description: Brief explanation of how it helps
- service: Specific deliverables included
- planName: Branded package name with emoji
- priority: 1-3 (1 = highest priority)
- relevantBenchmarks: Array of benchmark titles this service addresses

Format response as JSON:
{
  "score": number (0-100, average of all metrics),
  "summary": "Brief summary of revenue leak findings for ${country}'s market",
  "freeMetrics": [
    {
      "title": "Search Visibility Score",
      "score": number (0-100),
      "items": [
        {"text": "Ranking for primary industry keywords", "present": boolean},
        {"text": "Google Business Profile optimized", "present": boolean},
        {"text": "Local SEO signals present", "present": boolean},
        {"text": "Mobile search visibility", "present": boolean}
      ]
    },
    {
      "title": "Website Conversion Readiness",
      "score": number (0-100),
      "items": [
        {"text": "Clear value proposition above fold", "present": boolean},
        {"text": "Strong call-to-action buttons", "present": boolean},
        {"text": "Lead magnets or free trials", "present": boolean},
        {"text": "Mobile-optimized conversion flow", "present": boolean}
      ]
    },
    {
      "title": "Digital Presence Score",
      "score": number (0-100),
      "items": [
        {"text": "Professional website design", "present": boolean},
        {"text": "Business email and contact info", "present": boolean},
        {"text": "Active social media presence", "present": boolean},
        {"text": "Consistent brand messaging", "present": boolean}
      ]
    },
    {
      "title": "Trust & Credibility Signals",
      "score": number (0-100),
      "items": [
        {"text": "Customer reviews and testimonials", "present": boolean},
        {"text": "Security badges and certifications", "present": boolean},
        {"text": "About us page with team info", "present": boolean},
        {"text": "Clear privacy and terms policies", "present": boolean}
      ]
    },
    {
      "title": "Content Authority Index",
      "score": number (0-100),
      "items": [
        {"text": "Regular blog or educational content", "present": boolean},
        {"text": "Industry thought leadership posts", "present": boolean},
        {"text": "How-to guides and resources", "present": boolean},
        {"text": "Speaking engagements or interviews", "present": boolean}
      ]
    },
    {
      "title": "Social Proof & Mentions",
      "score": number (0-100),
      "items": [
        {"text": "Positive brand mentions online", "present": boolean},
        {"text": "User-generated content", "present": boolean},
        {"text": "Influencer or media endorsements", "present": boolean},
        {"text": "Industry awards or recognition", "present": boolean}
      ]
    }
  ],
  "paidMetrics": [
    {
      "title": "Competitor Advantage Analysis",
      "score": number (0-100),
      "items": [
        {"text": "SEO performance vs top 3 competitors", "present": boolean},
        {"text": "Social media engagement rates comparison", "present": boolean},
        {"text": "Content marketing effectiveness gap", "present": boolean},
        {"text": "Technology stack competitiveness", "present": boolean}
      ]
    },
    {
      "title": "Marketing Funnel Strength Assessment",
      "score": number (0-100),
      "items": [
        {"text": "Lead capture optimization", "present": boolean},
        {"text": "Email nurture sequences active", "present": boolean},
        {"text": "Retargeting campaigns running", "present": boolean},
        {"text": "Sales process automation", "present": boolean}
      ]
    },
    {
      "title": "Engagement-to-Conversion Ratio",
      "score": number (0-100),
      "items": [
        {"text": "Social media drives website traffic", "present": boolean},
        {"text": "Content generates qualified leads", "present": boolean},
        {"text": "Email campaigns drive conversions", "present": boolean},
        {"text": "Paid ads have positive ROI", "present": boolean}
      ]
    },
    {
      "title": "Perceived Brand Authority Score",
      "score": number (0-100),
      "items": [
        {"text": "Premium pricing compared to competitors", "present": boolean},
        {"text": "Thought leadership recognition", "present": boolean},
        {"text": "Media coverage and PR mentions", "present": boolean},
        {"text": "Industry partnership and collaborations", "present": boolean}
      ]
    }
  ],
  "competitors": [
    {
      "name": "Competitor Name 1",
      "score": number (0-100),
      "industry": "${industry}",
      "rating": number (1-5),
      "reviews": number,
      "description": "Brief description",
      "strengths": ["strength1", "strength2", "strength3"],
      "avatar": "https://via.placeholder.com/150",
      "verified": boolean
    }
  ],
  "recommendations": [
    {
      "title": "Website Optimization Package",
      "description": "Fix conversion issues and improve user experience",
      "service": "Landing page redesign, mobile optimization, speed improvements, CTA optimization",
      "planName": "🚀 Conversion Booster",
      "priority": 1,
      "relevantBenchmarks": ["Website Conversion Readiness", "Digital Presence Score"]
    },
    {
      "title": "SEO & Visibility Boost",
      "description": "Increase online visibility and search rankings",
      "service": "Keyword research, on-page SEO, Google Business Profile setup, local SEO",
      "planName": "📈 Visibility Maximizer",
      "priority": 2,
      "relevantBenchmarks": ["Search Visibility Score", "Content Authority Index"]
    }
  ]
}

Be realistic in assessment. Focus on measurable revenue impact potential.
Generate recommendations that directly address the lowest-scoring metrics.
`;

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        tools: [
          {
            functionDeclarations: [
              {
                name: "google.search",
                description: "Search the web for information.",
                parameters: {
                  type: SchemaType.OBJECT,
                  properties: {
                    query: {
                      type: SchemaType.STRING,
                      description: "The search query.",
                    },
                  },
                  required: ["query"],
                },
              },
            ],
          },
        ],
      });

      const chat = model.startChat();
      const result = await chat.sendMessage(prompt);
      const response = result.response;

      let textContent = "";
      if (response.text()) {
        textContent = response.text() as string;
      } else if (
        response.candidates &&
        response.candidates[0] &&
        response.candidates[0].content &&
        response.candidates[0].content.parts
      ) {
        const parts = response.candidates[0].content.parts;
        for (const part of parts) {
          if ("text" in part) {
            textContent += part.text;
          }
        }
      }

      console.log("Raw AI response:", textContent);

      // Extract JSON from the response
      const jsonMatch = textContent?.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error(
          "Invalid response format from AI: No JSON object found."
        );
      }

      const rawData = JSON.parse(jsonMatch[0]);

      // Transform the data to match BrandResultsDisplay expectations
      const transformedData: AnalysisResult = {
        score: rawData.score,
        medal:
          rawData.score >= 80
            ? "Gold"
            : rawData.score >= 65
              ? "Silver"
              : rawData.score >= 50
                ? "Bronze"
                : "Starter",
        summary: rawData.summary,
        freeMetrics: transformBenchmarks(rawData.freeMetrics, false),
        paidMetrics: transformBenchmarks(rawData.paidMetrics, true),
        competitors: rawData.competitors || [],
        recommendations: rawData.recommendations || [],
      };

      return transformedData;
    } catch (error) {
      console.error("AI Analysis Error:", error);
      throw new Error("Failed to analyze brand. Please try again.");
    }
  };

  const handleAnalysis = async (
    inputBrandName: string,
    inputIndustry: string
  ) => {
    setBrandName(inputBrandName);
    setIndustry(inputIndustry);
    setIsAnalyzing(true);
    setError(null);

    try {
      if (!GEMINI_API_KEY) {
        throw new Error(
          "AI service is not configured. Please replace 'YOUR_GEMINI_API_KEY' with your actual API key."
        );
      }

      // Wait for location to be available before analysis
      if (locationLoading) {
        throw new Error("Loading location data, please try again in a moment.");
      }

      const result = await analyzeBrandWithAI(inputBrandName, inputIndustry);
      setAnalysisResult(result);
      setShowResults(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setBrandName("");
    setIndustry("");
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <DefaultMain>
      <section className="bg-transparent">
        {/* Location indicator */}
        {userLocation && !locationLoading && (
          <div className="container mx-auto px-4 mb-2">
            <div className="text-sm text-center">
              📍 Analyzing for {userLocation.city}, {userLocation.country_name}{" "}
              For {user?.email}
            </div>
          </div>
        )}

        {error && (
          <div className="container mx-auto px-4 mb-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
              <button
                onClick={resetAnalysis}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!showResults ? (
          <BrandAnalysisForm
            onAnalysis={handleAnalysis}
            isAnalyzing={isAnalyzing || locationLoading}
          />
        ) : (
          analysisResult && (
            <div className="container mx-auto px-4 space-y-2">
              <BrandResultsDisplay
                brandName={brandName}
                industry={industry}
                score={analysisResult.score}
                medal={analysisResult.medal}
                freeMetrics={analysisResult.freeMetrics}
                paidMetrics={analysisResult.paidMetrics}
                summary={analysisResult.summary}
                isPremiumUser={user ? true : false} // Set to true for premium users
              />
              <BrandRecommendations
                brandName={brandName}
                industry={industry}
                score={analysisResult.score}
                competitors={analysisResult.competitors}
                recommendations={analysisResult.recommendations} // Now properly passed
                onReset={resetAnalysis}
                authenticityBenchmarks={[]} // Legacy prop - can be removed if not needed
                techBenchmarks={[]} // Legacy prop - can be removed if not needed
              />
            </div>
          )
        )}
      </section>
    </DefaultMain>
  );
}
