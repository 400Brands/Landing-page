import DefaultMain from "@/layouts/defaultMain";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Check,
  Flame,
  Headset,
  Heart,
  Phone,
  Star,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useRef } from "react";
import { Link } from "@heroui/link";
import { TypeAnimation } from "react-type-animation";
import BrandAnalysisForm from "@/components/BrandAnalysisForm";
import { works } from "@/constant";

export default function IndexPage() {
  const [currentWork, setCurrentWork] = useState(0);
  const ref = useRef(null);

  const nextWork = () => {
    setCurrentWork((prev) => (prev + 1) % works.length);
  };

  const prevWork = () => {
    setCurrentWork((prev) => (prev - 1 + works.length) % works.length);
  };


  interface HashLinkProps {
    href: string;
    children: ReactNode;
    [key: string]: any; // Allow other props
  }

  const HashLink = ({ href, children, ...props }: HashLinkProps) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  };
  

  return (
    <DefaultMain>
      {/* Hero Section with Video Background */}
      <section className="flex flex-col items-center justify-between min-h-screen text-white py-16 overflow-hidden">
        <div
          className="container mx-auto flex flex-col gap-6"
          
        >
          <div className="flex flex-col md:flex-row item-center">
            <div className="md:w-1/2 z-10 px-4 md:px-0" >
              <h1
                className="text-4xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 md:mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                
              >
                Growth Partner for Future-Ready Brands
              </h1>

              <p
                className="text-lg md:text-xl mb-6 md:mb-8 opacity-90"
                
              >
                From 🧠 <b>Idea</b> to 🚀 <b>Execution</b>, we digitize, design,
                and drive growth for businesses, professionals, and rising
                brands.
              </p>

              <div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                
              >
                <HashLink href="#brandDoctor">
                  <button
                    className="bg-gradient-to-r from-blue-600 to-purple-500 text-black font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
                   
                  >
                    <span>Brand Doctor</span>
                  </button>
                </HashLink>

                <Link isExternal href="https://wa.me/2347083519662">
                  <button
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
                    
                  >
                    <Headset className="w-4 h-4 mr-2" />
                    <span>Book Free Consultation</span>
                  </button>
                </Link>
              </div>
            </div>

            <div
              className="md:w-1/2"
             
            >
              {/* Animated decorative elements can be added here */}
            </div>
          </div>
        </div>

        <div
          className="w-full h-24 z-10 text-center px-4"
          
        >
          <p className="font-sans">
            <TypeAnimation
              sequence={[
                "400Brands",
                2000,
                "400Products",
                2000,
                "400Successes",
                2000,
                "400Solutions",
                2000,
                "400Brands",
                2000,
              ]}
              speed={30}
              deletionSpeed={50}
              style={{
                display: "inline-block",
                color: "#3b82f6", // blue-500
                fontFamily: '"Underdog", cursive',
              }}
              wrapper="span"
              repeat={Infinity}
            />{" "}
            — We blend <b>strategy, design, engineering, and marketing</b>{" "}
            <br /> to turn your ideas into world-class product
            <br /> just starting or scaling
          </p>
        </div>
      </section>

      {/* Brand Doctor aesthetic 1 input form that Routes to /D with the input value */}
      <section
        id="brandDoctor"
        className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950"
      >
        <div
          className="container mx-auto px-4"
         
        >
          <div className="text-center mb-12" >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Brand Doctor Diagnosis
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get a free instant analysis of your brand's digital health and
              discover growth opportunities in under 30 seconds.
            </p>
          </div>

          <div
            className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-lg"
            
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Star className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                What's your brand's name?
              </h3>
            </div>

            <BrandAnalysisForm />

            <div
              className="mt-6 flex items-center gap-2 text-sm text-gray-400"
            >
              <Check className="w-4 h-4 text-green-400" />
              <span>Privacy-first analysis. We never store your data.</span>
            </div>
          </div>
        </div>
      </section>

      <section
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-once="false"
        className="relative flex flex-col gap-6"
        ref={ref}
      >
        <div
          className="py-10 md:py-10 relative z-0"
          
        >
          <div className="text-center mb-12 md:mb-16" >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Your End-to-End Growth & Tech Partner
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
            
          >
            {[
              {
                icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746565485/responsive-design_wobrfb.png",
                title: "Software As A Service (SAAS)",
                desc: "Fast, mobile-first, beautiful digital experiences, both as Mobile or as webApp",
              },
              {
                icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746566344/ai_nuhrup.png",
                title: "AI Integrations & WhatsApp Automation",
                desc: "Automate customer care, sales, and engagement",
              },
              {
                icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746566762/growth_ggcqxd.png",
                title: "Digital Marketing & Social Media",
                desc: "Get visible, stay viral, grow consistently",
              },
              {
                icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746696017/consultant_bgaqe2.png",
                title: "Tech Consultations",
                desc: "Smart strategy for software, hardware & future tech",
              },
              {
                icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746696632/blockchain-security_lhojoj.png",
                title: "Blockchain & Web3 Solutions",
                desc: "DApps, tokenomics, NFT campaigns, and more",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-900 to-gray-950 p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:translate-y-[-5px] border border-gray-700"
                
              >
                <div className="text-4xl mb-4">
                  <img
                    width={50}
                    src={service.icon}
                    
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.desc}</p>
              </div>
            ))}

            <div
              className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:translate-y-[-5px] border border-purple-500/30"
              
              
            >
              <div className="text-4xl mb-4">
                <img
                  width={50}
                  src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746713887/star_cwjdh1.png"
                  
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Solutions</h3>
              <p>
                Need something unique? Let's build a solution tailored to your
                business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR WORKS - DARK MODE - COMPACT */}
      <section
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-once="false"
      >
        <div
          className="p-8 bg-gray-950 text-gray-100 border border-gray-700 rounded-md"
          
        >
          <h2
            className="text-3xl font-bold mb-1 text-center"
            
          >
            Our Works
          </h2>
          <p
            className="text-center mb-8 text-xl text-gray-300"
            
          >
            Real Brands. Real Results.
          </p>

          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-medium flex items-center text-gray-100">
                <span
                  className="text-3xl mr-3"
                 
                >
                  {typeof works[currentWork].icon === "string" &&
                  works[currentWork].icon.startsWith("https://") ? (
                    <img
                      src={works[currentWork].icon}
                      alt="Brand icon"
                      width={120}
                     
                      key={currentWork}
                    />
                  ) : (
                    works[currentWork].icon
                  )}
                </span>
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={prevWork}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300"
                  
                >
                  <ArrowBigLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextWork}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300"
                  
                >
                  <ArrowBigRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div >
              <div
                key={currentWork}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700"
                
              >
                <div className="aspect-[16/6] bg-slate-950 w-full relative overflow-hidden grid grid-cols-2 grid-rows-2 gap-0">
                  {/* Left half (full height) */}
                  <div
                    className="col-span-1 row-span-2 relative overflow-hidden"
                    
                  >
                    <img
                      src={works[currentWork].image1}
                      alt={works[currentWork].desc}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Top right quarter */}
                  <div
                    className="col-span-1 row-span-1 relative overflow-hidden border-l  border-b border-gray-700"
                    
                  >
                    <img
                      src={works[currentWork].image}
                      alt={works[currentWork].desc}
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>

                  {/* Bottom right quarter */}
                  <div
                    className="col-span-1 row-span-1 relative overflow-hidden border-l border-gray-700"
                    
                  >
                    <img
                      src={works[currentWork].image}
                      alt={works[currentWork].desc}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "right bottom" }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div
                      className="w-10 h-10 rounded-full border-1 border-blue-900 flex items-center justify-center text-xl mr-3 text-blue-300 overflow-hidden"
                   
                    >
                      <img
                        src={works[currentWork].avatar}
                        alt="Brand icon"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-100 text-sm">
                        {works[currentWork].name}
                      </h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            
                          >
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p
                    className="italic text-gray-400 text-sm mb-2"
                    
                  >
                    "400Brands transformed our business completely. The ROI has
                    been incredible!"
                  </p>
                  <p
                    className="text-blue-300 font-medium text-sm"
                    
                  >
                    {works[currentWork].desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              {works.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    idx === currentWork ? "bg-blue-500" : "bg-gray-700"
                  }`}
                  onClick={() => setCurrentWork(idx)}
                  
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-once="false"
      >
        {/* PRICING PLANS - DARK MODE */}
        <div
          className="py-12 text-gray-100"
        >
          <h2
            className="text-3xl font-bold mb-2 text-center"
          
          >
            Pricing Plans
          </h2>
          <p
            className="text-center mb-12 text-xl text-gray-300"
          
          >
            Simple Tiers, Big Impact
          </p>

          <div
            className="text-center mb-16"
          
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Growth Path
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built on Brian Chesky's philosophy of creating 10-star experiences
              that turn customers into lifelong advocates
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            
          >
            {/* Starter Kit */}
            <div
              className="border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-gray-800"
             
            
            >
              <div
                className="p-6 bg-gradient-to-br from-slate-900 to-gray-950 border-b border-gray-700"
              
              >
                <h3 className="text-2xl font-bold mb-1 flex flex-row gap-2">
                  <Flame className="text-blue-500" /> Starter Kit
                </h3>
                <div className="flex items-end">
                  <span
                    className="text-3xl font-bold"
                    
                  >
                    ₦150,000
                  </span>
                  <span className="text-gray-400 ml-2">/ $99</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Perfect for new professionals & small shops
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-300">
                  {[
                    "1-Page Premium Website (Custom Domain Included for 1 Year)",
                    "AI-Powered Chatbot for Instant Customer Engagement",
                    "Complete SEO Optimization (Rank Ready from Day 1)",
                    "30-Min Brand Strategy Call with Growth Expert",
                    "Basic Analytics Setup to Track Your Success",
                    "Mobile-Optimized Design That Converts",
                    "Lifetime Security Updates",
                  ].map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start"
                      
                    >
                      <div
                       
                        className="mt-0.5"
                      >
                        <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3 rounded-lg"
                 
                >
                  Launch Your Digital Presence →
                </button>
              </div>
            </div>

            {/* Growth Bundle */}
            <div
              className="border-2 border-emerald-500 rounded-xl overflow-hidden shadow-lg relative bg-gray-800"
              
            >
              <div
                className="absolute top-0 right-0 bg-emerald-600 text-white text-xs px-3 py-1 rounded-bl-lg"
               
              >
                POPULAR
              </div>
              <div
                className="p-6 bg-gradient-to-br from-emerald-900 to-teal-950 border-b border-emerald-800"
                
              >
                <h3 className="text-2xl font-bold mb-1 flex flex-row gap-2">
                  {" "}
                  <Heart className="text-[#FF0098]" /> Growth Bundle
                </h3>
                <div className="flex items-end">
                  <span
                    className="text-3xl font-bold"
                    
                  >
                    ₦450,000
                  </span>
                  <span className="text-gray-400 ml-2">/ $299</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Best for businesses ready to grow online
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-300">
                  {[
                    "Multi-Page Website (5 Pages) + E-commerce Ready",
                    "Advanced AI Assistant with Lead Qualification",
                    "Social Media Automation (3 Platforms)",
                    "Email Marketing Sequences (Welcome + Nurture Series)",
                    "Advanced Analytics Dashboard with Conversion Tracking",
                    "Custom Brand Kit (Logo, Colors, Typography Guide)",
                    "Speed Optimization (3-Second Load Time Guarantee)",
                    "API Integrations (CRM, Payment, Social Proof)",
                    "Monthly Strategy & Optimization Call (3 Months)",
                  ].map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start"
                     
                    >
                      <div
                        
                        className="mt-0.5"
                      >
                        <Check className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium py-3 rounded-lg"
                 
                >
                  Accelerate Your Growth →
                </button>
              </div>
            </div>

            {/* Brand Master Plan */}
            <div
              className="border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-gray-800"
             
            >
              <div
                className="p-6 bg-gradient-to-br from-purple-900 to-indigo-950 border-b border-gray-700"
                
              >
                <h3 className="text-2xl font-bold mb-1 flex flex-row gap-2 ">
                  <Star className="text-yellow-500" />
                  Brand Master Plan
                </h3>
                <div className="flex items-end">
                  <span
                    className="text-3xl font-bold"
                    
                  >
                    ₦950,000
                  </span>
                  <span className="text-gray-400 ml-2">/ $599</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  For serious brands & growing companies
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-300">
                  {[
                    "Unlimited Pages + Custom Web Application",
                    "AI-Powered Customer Journey Optimization",
                    "Omnichannel Marketing Automation (All Major Platforms)",
                    "Advanced Email Marketing with Behavioral Triggers",
                    "Enterprise Analytics Suite with Predictive Insights",
                    "Complete Brand Identity Package + Style Guide",
                    "Enterprise CDN + 99.9% Uptime SLA",
                    "Advanced Security Suite + Compliance Ready",
                    "Dedicated Account Manager + Weekly Strategy Sessions",
                    "A/B Testing Platform for Continuous Optimization",
                    "Custom Integrations + API Development",
                    "Native Mobile App Development (iOS + Android)",
                  ].map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start"
                     
                    >
                      <div
                       
                        className="mt-0.5"
                      >
                        <Check className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 rounded-lg"
                 
                >
                  Dominate Your Market →
                </button>
              </div>
            </div>
          </div>

          {/* Custom Plan */}
          <div
            className="mt-8 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-8 text-white border border-purple-700"
           
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  🛠️ Enterprise & Custom Builds
                </h3>
                <p className="max-w-2xl text-gray-200 font-sans">
                  Need something unique? Web3 integrations, Business Specific
                  AI, internal dashboards, or national campaigns?{" "}
                  <b>Let's talk.</b> We'll build a custom package just for your
                  needs.
                </p>
              </div>
              <button
                className="mt-6 md:mt-0 bg-gray-800 text-blue-300 hover:bg-gray-700 font-medium px-6 py-3 rounded-lg flex items-center border border-blue-700"
               
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>Schedule Your Custom Brief</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-once="false"
      >
        {/* WHY 400BRANDS */}
        <div
          className="py-12 text-gray-100"
          
        >
          <h2
            className="text-3xl font-bold mb-12 text-center"
          
          >
            Why 400Brands?
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
           
           
          >
            <div
              className="flex flex-col items-center text-center p-6 bg-gray-950 rounded-xl shadow-md border border-gray-700"
              
            >
              <div
                className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-4"
                
              >
                <img
                  src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746723502/checklist_ymxzrd.png"
                  width={90}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Affordable Excellence</h3>
              <p className="text-gray-400">
                Premium quality at budget-friendly prices for African
                businesses.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center p-6 bg-gray-950 rounded-xl shadow-md border border-gray-700"
              
            >
              <div
                className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center mb-4"
                
              >
                <img
                  src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746723633/forecasting_tbrc7h.png"
                  width={90}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Future-Tech Ready</h3>
              <p className="text-gray-400">
                AI, Web3, and Automation solutions for tomorrow's challenges.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center p-6 bg-gray-950 rounded-xl shadow-md border border-gray-700"
              
            >
              <div
                className="w-16 h-16 bg-yellow-900 rounded-full flex items-center justify-center mb-4"
                
              >
                <img
                  src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746723859/analysis_nnspfu.png"
                  width={90}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Data-driven & Design-forward
              </h3>
              <p className="text-gray-400">
                Beautiful solutions backed by real metrics and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>
    </DefaultMain>
  );
}
