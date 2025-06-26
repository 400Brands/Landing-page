import { useState } from "react";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import DefaultMain from "@/layouts/defaultMain";
import BrandAnalysisForm from "./brandDoctor/brandForm";
import BrandResultsDisplay from "./brandDoctor/brandResult";
import BrandRecommendations from "./brandDoctor/brandRecommendation";

// Initialize Gemini AI
const GEMINI_API_KEY = "AIzaSyCkfZ0QXrsstOS0dNrpGIslNU_6b_I-uWg"; // Replace with your actual key
// IMPORTANT: For production, do NOT expose your API key directly in client-side code.
// Consider using environment variables (process.env.NEXT_PUBLIC_GEMINI_API_KEY)
// or a backend proxy to make API calls securely.

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

// ---
// Updated Interface: Include competitors
// ---
interface Competitor {
  name: string;
  score: number; // Hypothetical score or general market standing
  industry: string;
  rating: number; // Average rating (e.g., from reviews)
  reviews: number; // Number of reviews
  description: string;
  strengths: string[];
  avatar: string; // URL for a placeholder avatar or a generic icon if specific logos can't be found
  verified: boolean; // Indicates if their presence is well-established and verifiable
}

interface AnalysisResult {
  score: number;
  medal: string;
  authenticityBenchmarks: {
    title: string;
    score: number;
    items: { text: string; present: boolean }[];
  }[];
  techBenchmarks: {
    title: string;
    score: number;
    items: { text: string; present: boolean }[];
  }[];
  recommendations: string[];
  summary: string;
  competitors: Competitor[]; // Added competitors array
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

  const analyzeBrandWithAI = async (
    brandName: string,
    industry: string
  ): Promise<AnalysisResult> => {
    // ---
    // Modified AI Prompt: Request competitor data with stronger search instructions
    // ---
    const prompt = `
    Perform a comprehensive digital brand health analysis for the brand "${brandName}" in the "${industry}" industry.
    **Crucially, use the available web search tool to find and verify public online information** to assess the brand's business authenticity and technical maturity.

    Evaluate the brand across these specific categories, *verifying information through web search queries where possible*:

    BUSINESS AUTHENTICITY BENCHMARKS:
    1. Legal Compliance - Search for business registration (e.g., CAC in Nigeria), tax compliance indicators, and corporate structure.
    2. Digital Presence - Search for and assess website quality, domain ownership details, professional email setup, and active social media presence.
    3. Reputation Management - Search for online reviews, news of legal disputes or scandals, and evidence of verifiable partnerships.

    TECH & GROWTH BENCHMARKS:
    1. Technical Maturity - Search for and evaluate website responsiveness, security (HTTPS status), and indications of modern tools usage (e.g., presence of recognizable payment gateways, CRM features).
    2. Brand Consistency - Search for and observe uniform branding across detected online platforms, signs of professional content marketing (blogs, high-quality product descriptions), and active community engagement.
    3. Risk Assessment - Attempt to detect brand impersonation or phishing attempts, verify physical addresses if publicly available, and assess the authenticity of claims made by the brand.

    For each benchmark category, provide:
    - A score out of 100 based on the presence, quality, and verifiability of information found through web search.
    - 3 specific evaluation items with true/false status based on your findings.
    - Focus on verifiable digital presence, technical setup, and business credibility.

    If specific information for an item is not publicly available or cannot be verified through web search, mark that item as 'false' and adjust the score accordingly. Explicitly state in the summary or recommendations when information is lacking due to limited public presence.

    **Additionally, identify and provide details for the 3 strongest/most prominent actual companies that are direct competitors in the "${industry}" industry in Nigeria, leveraging public web search information.** When searching for competitors, prioritize companies with a strong, verifiable online presence. For each competitor, use specific search queries to find:
    - Their 'name' (e.g., search for "top [industry] companies", "[industry] market leaders")
    - A 'score' (estimate their market/digital presence strength out of 100 based on search results like search volume, social media following, general prominence)
    - Their 'industry' (which should be "${industry}")
    - A 'rating' (search for "[competitor name] reviews", "best [industry] companies reviews" and infer an average user review rating, e.g., 4.5. If exact data is not found, make a reasonable inference based on general sentiment found in search results, or use a default like 4.0 if no sentiment is clear.)
    - 'reviews' (search for "[competitor name] reviews count", "number of [competitor name] user reviews" and infer a count. If exact data isn't found, estimate based on mentions of reviews, or use a default like 100 if none are clear.)
    - A brief 'description' (based on their official website or prominent online descriptions)
    - An array of 'strengths' (3-4 key digital or business strengths derived from their online presence and what they are known for, e.g., "Extensive product range", "Strong customer support", "Innovative platform")
    - An 'avatar' URL (attempt to find a direct URL to their logo or a representative image.)
    - A 'verified' boolean (true if they have a strong, verifiable online presence and easily discoverable information via search.)

    If specific, verifiable data for any competitor field (e.g., exact rating, exact review count) is not easily found through a quick search, provide a reasonable estimate or a placeholder value (e.g., 4.0 for rating, 100 for reviews) and mention that it's an inference. Avoid using "Placeholder" in the actual competitor names or descriptions.

    Format your entire response as a JSON object with these exact keys:
    {
      "score": number (0-100) should be the average of all the Benchmarks score parameters,
      "summary": "Brief 2-3 sentence summary of overall brand health",
      "authenticityBenchmarks": [
        {
          "title": "Legal Compliance",
          "score": number (0-100) should be the average of all the text items score parameters,
          "items": [
            {"text": "Business registration found (e.g., CAC in Nigeria)", "present": boolean},
            {"text": "Indications of tax compliance (e.g., TIN on website, public records)", "present": boolean},
            {"text": "Clear corporate structure/company type publicly stated", "present": boolean}
          ]
        },
        {
          "title": "Digital Presence",
          "score": number (0-100) should be the average of all the text items score parameters,
          "items": [
            {"text": "Professional website (.com/.ng) found and accessible", "present": boolean},
            {"text": "Business domain email (e.g., info@brand.com) used publicly", "present": boolean},
            {"text": "Active and professional social media profiles (Facebook, Instagram, etc.)", "present": boolean}
          ]
        },
        {
          "title": "Reputation Management",
          "score": number (0-100) should be the average of all the text items score parameters,
          "items": [
            {"text": "Predominantly positive online reviews/mentions found", "present": boolean},
            {"text": "No public record of significant legal disputes/scandals found", "present": boolean},
            {"text": "Evidence of verifiable and reputable partnerships/collaborations", "present": boolean}
          ]
        }
      ],
      "techBenchmarks": [
        {
          "title": "Technical Maturity",
          "score": number (0-100) should be the average of all the text items score parameters,
          "items": [
            {"text": "Mobile-responsive website", "present": boolean},
            {"text": "HTTPS secured", "present": boolean},
            {"text": "Modern tech tools (CRM, payments)", "present": boolean}
          ]
        },
        {
          "title": "Brand Consistency",
          "score": number (0-100) should be the average of all the text items score parameters,
          "items": [
            {"text": "Uniform branding across platforms", "present": boolean},
            {"text": "Professional content marketing", "present": boolean},
            {"text": "Active in tech communities", "present": boolean}
          ]
        },
        {
          "title": "Risk Assessment",
          "score": number (0-100) should be the average of all the text items score parameters,
          "items": [
            {"text": "No impersonation detected", "present": boolean},
            {"text": "Physical address verified", "present": boolean},
            {"text": "No fake claims identified", "present": boolean}
          ]
        }
      ],
      "recommendations": ["recommendation1", "recommendation2", "recommendation3", "recommendation4"],
      "competitors": [
        {
          "name": "Competitor Name 1",
          "score": number (0-100),
          "industry": "${industry}",
          "rating": number (e.g., 4.5),
          "reviews": number (e.g., 120),
          "description": "Brief description of Competitor 1.",
          "strengths": ["Strength 1", "Strength 2", "Strength 3"],
          "avatar": "URL_to_avatar_image_1",
          "verified": boolean
        },
        // ... (up to 3 competitors)
      ]
    }

    Be realistic in your assessment. If the brand or its competitors are not well-known or have a limited digital footprint, base analysis on the lack of discoverable information and typical industry standards for digital presence. Provide a generic placeholder avatar URL if a real one isn't readily available through search.
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

      // The model may first respond with tool calls, then you execute them
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
        console.log(
          "Model might have tried to make a tool call. Raw response parts:",
          response.candidates[0].content.parts
        );
        const parts = response.candidates[0].content.parts;
        for (const part of parts) {
          if ("text" in part) {
            textContent += part.text;
          }
        }
      }

      console.log(
        "Raw AI response (with search grounding enabled):",
        textContent
      );

      // Extract JSON from the response
      const jsonMatch = textContent?.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error(
          "Invalid response format from AI: No JSON object found."
        );
      }

      const analysisData = JSON.parse(jsonMatch[0]);

      // Determine medal based on score
      let medal = "";
      if (analysisData.score >= 80) medal = "Gold";
      else if (analysisData.score >= 65) medal = "Silver";
      else if (analysisData.score >= 50) medal = "Bronze";
      else medal = "Starter";

      return {
        ...analysisData,
        medal,
      };
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
            isAnalyzing={isAnalyzing}
          />
        ) : (
          analysisResult && (
            <div className="container mx-auto px-4 space-y-2">
              <BrandResultsDisplay
                brandName={brandName}
                industry={industry}
                score={analysisResult.score}
                medal={analysisResult.medal}
                authenticityBenchmarks={analysisResult.authenticityBenchmarks}
                techBenchmarks={analysisResult.techBenchmarks}
                summary={analysisResult.summary}
              />
              <BrandRecommendations
                brandName={brandName}
                industry={industry}
                score={analysisResult.score}
                competitors={analysisResult.competitors} // Pass competitors here
                onReset={resetAnalysis}
                //
                authenticityBenchmarks={analysisResult.authenticityBenchmarks}
                techBenchmarks={analysisResult.techBenchmarks}
              />
            </div>
          )
        )}
      </section>
    </DefaultMain>
  );
}
