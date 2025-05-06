import DefaultMain from "@/layouts/defaultMain";
import { Headset } from 'lucide-react';

export default function IndexPage() {
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
                From 🧠 <b>Idea</b> to 🚀 <b>Execution</b>, we digitize, design, and drive growth for businesses, professionals, and rising brands.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <span>Get Started</span>
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
        <div className=" w-full h-24 z-10 text-center px-4"><p>We blend <b>strategy, design, engineering, and marketing</b> <br/> to turn your ideas into world-class product<br/> just starting or scaling — <span className="text-primary">400Brands</span></p></div>

      </section>

      <section className="relative flex flex-col gap-6">
        {/* Subtle gradient overlay to maintain dark theme transition */}
        
        <div className=" py-10 md:py-10 relative z-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Your End-to-End Growth & Tech Partner</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { icon: "🌐", title: "Software As A Service (SAAS)", desc: "Fast, mobile-first, beautiful digital experiences, both as Mobile or as webApp" },
              { icon: "🤖", title: "AI Integrations & WhatsApp Automation", desc: "Automate customer care, sales, and engagement" },
              { icon: "📈", title: "Digital Marketing & Social Media", desc: "Get visible, stay viral, grow consistently" },
              { icon: "🧠", title: "Tech Consultations", desc: "Smart strategy for software, hardware & future tech" },
              { icon: "🔗", title: "Blockchain & Web3 Solutions", desc: "DApps, tokenomics, NFT campaigns, and more" }
            ].map((service, idx) => (
              <div key={idx} className="bg-gray-900 p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:translate-y-[-5px] border border-gray-700">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-300">{service.desc}</p>
              </div>
            ))}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:translate-y-[-5px] border border-purple-500/30">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Custom Solutions</h3>
              <p>Need something unique? Let's build a solution tailored to your business goals.</p>
            </div>
          </div>
        </div>
      </section>
    </DefaultMain>
  );
}