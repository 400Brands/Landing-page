import DefaultMain from "@/layouts/defaultMain";
import {
  ArrowBigLeft,
  ArrowBigRight,
  ArrowLeft,
  Check,
  Headset,
  Phone,
  Star,
} from "lucide-react";
import { useState } from "react";

export default function IndexPage() {
  const [currentWork, setCurrentWork] = useState(0);

  const works = [
    {
      name: "Promotionalproductsnow",
      image:
        "https://res.cloudinary.com/dgbreoalg/image/upload/v1746718752/pro_bj1wxu.jpg",
      desc: "Website, WhatsApp bot, and Google visibility (from 12 bookings/month → 80+)",
      icon: "https://res.cloudinary.com/dgbreoalg/image/upload/v1746716076/logo-CEQPpPRZ_p5otwz.png",
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      name: "ClevaHq",
      image:
        "https://res.cloudinary.com/dgbreoalg/image/upload/v1746719104/cmm_kiwctc.jpg",
      desc: "Mobile app + influencer campaign = 3x consultation growth",
      icon: "https://clevahq.com/clevaLogo.svg",
    },
    {
      name: "Defrankfurtglobal",
      image:
        "https://res.cloudinary.com/dgbreoalg/image/upload/v1746719449/defrank_y2gyxf.jpg",
      desc: "Marketplace setup, social media, and AI pricing engine",
      icon: "https://www.defrankfurtglobal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.ec8a5c02.png&w=256&q=75",
    },
    {
      name: "londonhotel&apartments",
      image:
        "https://res.cloudinary.com/dgbreoalg/image/upload/v1746718256/london_glixpi.jpg",
      desc: "Full-stack digital suite, SEO blog, and thought leadership content",
      icon: "https://jnoznbd6y3.ufs.sh/f/PKy8oE1GN2J3pe5blUVwi394rogIqdXzW56n8bYJTPQ1MAjv",
    },
  ];

  const nextWork = () => {
    setCurrentWork((prev) => (prev + 1) % works.length);
  };

  const prevWork = () => {
    setCurrentWork((prev) => (prev - 1 + works.length) % works.length);
  };

  return (
    <DefaultMain>
      {/* Hero Section with Video Background */}
      <section className="flex flex-col items-center justify-between min-h-screen text-white py-16">
        <div className="container mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row item-center">
            <div className="md:w-1/2 z-10 px-4 md:px-0">
              <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Growth Partner for Future-Ready Brands
              </h1>
              <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
                From 🧠 <b>Idea</b> to 🚀 <b>Execution</b>, we digitize, design,
                and drive growth for businesses, professionals, and rising
                brands.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <span>Brand Doctor</span>
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <Headset className="w-4 h-4 mr-2" />
                  <span>Book Free Consultation</span>
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              {/* This space is intentionally left empty for balanced layout */}
            </div>
          </div>
        </div>
        <div className=" w-full h-24 z-10 text-center px-4">
          <p>
            We blend <b>strategy, design, engineering, and marketing</b> <br />{" "}
            to turn your ideas into world-class product
            <br /> just starting or scaling —{" "}
            <span className="text-primary">400Brands</span>
          </p>
        </div>
      </section>

      <section className="relative flex flex-col gap-6">
        {/* Subtle gradient overlay to maintain dark theme transition */}

        <div className=" py-10 md:py-10 relative z-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Your End-to-End Growth & Tech Partner
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
                className="bg-gradient-to-br from-slate-900 to-gray-950  p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:translate-y-[-5px] border border-gray-700"
              >
                <div className="text-4xl mb-4">
                  <img width={50} src={service.icon} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.desc}</p>
              </div>
            ))}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:translate-y-[-5px] border border-purple-500/30">
              <div className="text-4xl mb-4">
                {" "}
                <img
                  width={50}
                  src={
                    "https://res.cloudinary.com/dgbreoalg/image/upload/v1746713887/star_cwjdh1.png"
                  }
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

      {/* OUR WORKS - DARK MODE */}
      <section>
        <div className="p-12 bg-gray-950 text-gray-100  border border-gray-700 rounded-md">
          <h2 className="text-3xl font-bold mb-2 text-center">Our Works</h2>
          <p className="text-center mb-12 text-xl text-gray-300">
            Real Brands. Real Results.
          </p>

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-medium flex items-center text-gray-100">
                <span className="text-4xl mr-3">
                  {typeof works[currentWork].icon === "string" &&
                  works[currentWork].icon.startsWith("https://") ? (
                    <img
                      src={works[currentWork].icon}
                      alt="Brand icon"
                      width={150}
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
                  <ArrowBigLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextWork}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300"
                >
                  <ArrowBigRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
              <div className="aspect-video bg-slate-950 w-full relative overflow-hidden">
                <img
                  src={works[currentWork].image}
                  alt={works[currentWork].desc}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full border-1 border-blue-900  flex items-center justify-center text-2xl mr-4 text-blue-300 overflow-hidden">
                    <img
                      src={"https://avatar.iran.liara.run/public"}
                      alt="Brand icon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100">
                      {works[currentWork].name}
                    </h4>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-gray-400">
                  "400Brands transformed our business completely. The ROI has
                  been incredible!"
                </p>
                <p className="mt-4 text-blue-300 font-medium">
                  {works[currentWork].desc}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
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

      <section>
        {/* PRICING PLANS - DARK MODE */}
        <div className="py-12  text-gray-100">
          <h2 className="text-3xl font-bold mb-2 text-center">Pricing Plans</h2>
          <p className="text-center mb-12 text-xl text-gray-300">
            Simple Tiers, Big Impact
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Kit */}
            <div className="border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-gray-800">
              <div className="p-6 bg-gradient-to-br from-slate-900 to-gray-950 border-b border-gray-700">
                <h3 className="text-2xl font-bold mb-1">🔹 Starter Kit</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">₦150,000</span>
                  <span className="text-gray-400 ml-2">/ $99</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Perfect for new professionals & small shops
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-300">
                  {[
                    "1-page website",
                    "WhatsApp biz setup",
                    "Social media audit",
                    "1-hour tech strategy call",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>

            {/* Growth Bundle */}
            <div className="border-2 border-blue-500 rounded-xl overflow-hidden shadow-lg relative bg-gray-800">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="p-6 bg-gradient-to-br from-slate-900 to-gray-950 border-b border-blue-800">
                <h3 className="text-2xl font-bold mb-1">🔸 Growth Bundle</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">₦450,000</span>
                  <span className="text-gray-400 ml-2">/ $299</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Best for businesses ready to grow online
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-300">
                  {[
                    "5-page website or landing funnel",
                    "1 AI WhatsApp bot",
                    "1 month social media management",
                    "Basic SEO + Google Business setup",
                    "2 strategy calls + monthly report",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-blue-400 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>

            {/* Brand Master Plan */}
            <div className="border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-gray-800">
              <div className="p-6 bg-gradient-to-br from-slate-900 to-gray-950 border-b border-gray-700">
                <h3 className="text-2xl font-bold mb-1">
                  🌟 Brand Master Plan
                </h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">₦950,000</span>
                  <span className="text-gray-400 ml-2">/ $599</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  For serious brands & growing companies
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-300">
                  {[
                    "Full website or mobile app",
                    "AI & automation workflows",
                    "3-month content & marketing plan",
                    "Custom design pack (logo, templates)",
                    "Monthly consulting + reviews",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Custom Plan */}
          <div className="mt-8 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-8 text-white border border-purple-700">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  🛠️ Enterprise & Custom Builds
                </h3>
                <p className="max-w-2xl text-gray-200">
                  Need something unique? Web3 integrations, POS setup, internal
                  dashboards, or national campaigns? <b>Let's talk.</b> We'll
                  build a custom package just for your needs.
                </p>
              </div>
              <button className="mt-6 md:mt-0 bg-gray-800 text-blue-300 hover:bg-gray-700 font-medium px-6 py-3 rounded-lg flex items-center border border-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                <span>Schedule Your Custom Brief</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* WHY 400BRANDS */}
        <div className="py-12 text-gray-100">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why 400Brands?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-950 rounded-xl shadow-md border border-gray-700">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-4">
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

            <div className="flex flex-col items-center text-center p-6 bg-gray-950 rounded-xl shadow-md border border-gray-700">
              <div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <div className="text-2xl">
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746723633/forecasting_tbrc7h.png"
                    width={90}
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Future-Tech Ready</h3>
              <p className="text-gray-400">
                AI, Web3, and Automation solutions for tomorrow's challenges.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-950 rounded-xl shadow-md border border-gray-700">
              <div className="w-16 h-16 bg-yellow-900 rounded-full flex items-center justify-center mb-4">
                <div className="text-2xl">
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746723859/analysis_nnspfu.png"
                    width={90}
                  />
                </div>
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
