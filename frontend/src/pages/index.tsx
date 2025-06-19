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
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Link } from "@heroui/link";
import { TypeAnimation } from "react-type-animation";
import BrandAnalysisForm from "@/components/BrandAnalysisForm";
import { works } from "@/constant";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

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
        <motion.div
          className="container mx-auto flex flex-col gap-6"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <div className="flex flex-col md:flex-row item-center">
            <motion.div className="md:w-1/2 z-10 px-4 md:px-0" variants={item}>
              <motion.h1
                className="text-4xl md:text-4xl lg:text-6xl font-sans font-bold mb-4 md:mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Growth Partner for Future-Ready Brands
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl mb-6 md:mb-8 opacity-90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                From 🧠 <b>Idea</b> to 🚀 <b>Execution</b>, we digitize, design,
                and drive growth for businesses, professionals, and rising
                brands.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <HashLink href="#brandDoctor">
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-purple-500 text-black font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Brand Doctor</span>
                  </motion.button>
                </HashLink>

                <Link isExternal href="https://wa.me/2347083519662">
                  <motion.button
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Headset className="w-4 h-4 mr-2" />
                    <span>Book Free Consultation</span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Animated decorative elements can be added here */}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="w-full h-24 z-10 text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
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
        </motion.div>
      </section>

      {/* Brand Doctor aesthetic 1 input form that Routes to /D with the input value */}
      <section
        id="brandDoctor"
        className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950"
      >
        <motion.div
          className="container mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <motion.div className="text-center mb-12" variants={slideUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Brand Doctor Diagnosis
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get a free instant analysis of your brand's digital health and
              discover growth opportunities in under 30 seconds.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-lg"
            variants={scaleUp}
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

            <motion.div
              className="mt-6 flex items-center gap-2 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Check className="w-4 h-4 text-green-400" />
              <span>Privacy-first analysis. We never store your data.</span>
            </motion.div>
          </motion.div>
        </motion.div>
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
        <motion.div
          className="py-10 md:py-10 relative z-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.div className="text-center mb-12 md:mb-16" variants={slideUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Your End-to-End Growth & Tech Partner
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
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
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-slate-900 to-gray-950 p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:translate-y-[-5px] border border-gray-700"
                variants={item}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
                }}
              >
                <div className="text-4xl mb-4">
                  <motion.img
                    width={50}
                    src={service.icon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * idx, type: "spring" }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.desc}</p>
              </motion.div>
            ))}

            <motion.div
              className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:translate-y-[-5px] border border-purple-500/30"
              variants={item}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.3)",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                },
              }}
            >
              <div className="text-4xl mb-4">
                <motion.img
                  width={50}
                  src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746713887/star_cwjdh1.png"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Solutions</h3>
              <p>
                Need something unique? Let's build a solution tailored to your
                business goals.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* OUR WORKS - DARK MODE - COMPACT */}
      <section
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-once="false"
      >
        <motion.div
          className="p-8 bg-gray-950 text-gray-100 border border-gray-700 rounded-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.h2
            className="text-3xl font-bold mb-1 text-center"
            variants={slideUp}
          >
            Our Works
          </motion.h2>
          <motion.p
            className="text-center mb-8 text-xl text-gray-300"
            variants={slideUp}
          >
            Real Brands. Real Results.
          </motion.p>

          <motion.div className="relative" variants={scaleUp}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-medium flex items-center text-gray-100">
                <motion.span
                  className="text-3xl mr-3"
                  whileHover={{ scale: 1.05 }}
                >
                  {typeof works[currentWork].icon === "string" &&
                  works[currentWork].icon.startsWith("https://") ? (
                    <motion.img
                      src={works[currentWork].icon}
                      alt="Brand icon"
                      width={120}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={currentWork}
                    />
                  ) : (
                    works[currentWork].icon
                  )}
                </motion.span>
              </h3>
              <div className="flex space-x-2">
                <motion.button
                  onClick={prevWork}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowBigLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={nextWork}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowBigRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentWork}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-[16/6] bg-slate-950 w-full relative overflow-hidden grid grid-cols-2 grid-rows-2 gap-0">
                  {/* Left half (full height) */}
                  <motion.div
                    className="col-span-1 row-span-2 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <img
                      src={works[currentWork].image1}
                      alt={works[currentWork].desc}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Top right quarter */}
                  <motion.div
                    className="col-span-1 row-span-1 relative overflow-hidden border-l  border-b border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <img
                      src={works[currentWork].image}
                      alt={works[currentWork].desc}
                      className="w-full h-full object-contain bg-white"
                    />
                  </motion.div>

                  {/* Bottom right quarter */}
                  <motion.div
                    className="col-span-1 row-span-1 relative overflow-hidden border-l border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <img
                      src={works[currentWork].image}
                      alt={works[currentWork].desc}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "right bottom" }}
                    />
                  </motion.div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <motion.div
                      className="w-10 h-10 rounded-full border-1 border-blue-900 flex items-center justify-center text-xl mr-3 text-blue-300 overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        src={works[currentWork].avatar}
                        alt="Brand icon"
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-gray-100 text-sm">
                        {works[currentWork].name}
                      </h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.div
                            key={star}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.p
                    className="italic text-gray-400 text-sm mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    "400Brands transformed our business completely. The ROI has
                    been incredible!"
                  </motion.p>
                  <motion.p
                    className="text-blue-300 font-medium text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {works[currentWork].desc}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-4">
              {works.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    idx === currentWork ? "bg-blue-500" : "bg-gray-700"
                  }`}
                  onClick={() => setCurrentWork(idx)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                  animate={{
                    width: idx === currentWork ? 16 : 8,
                    backgroundColor:
                      idx === currentWork ? "#3b82f6" : "#374151",
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-once="false"
      >
        {/* PRICING PLANS - DARK MODE */}
        <motion.div
          className="py-12 text-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.h2
            className="text-3xl font-bold mb-2 text-center"
            variants={slideUp}
          >
            Pricing Plans
          </motion.h2>
          <motion.p
            className="text-center mb-12 text-xl text-gray-300"
            variants={slideUp}
          >
            Simple Tiers, Big Impact
          </motion.p>

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Growth Path
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built on Brian Chesky's philosophy of creating 10-star experiences
              that turn customers into lifelong advocates
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Starter Kit */}
            <motion.div
              className="border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-gray-800"
              variants={item}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="p-6 bg-gradient-to-br from-slate-900 to-gray-950 border-b border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-1 flex flex-row gap-2">
                  <Flame className="text-blue-500" /> Starter Kit
                </h3>
                <div className="flex items-end">
                  <motion.span
                    className="text-3xl font-bold"
                    animate={{
                      scale: [1, 1.05, 1],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    ₦150,000
                  </motion.span>
                  <span className="text-gray-400 ml-2">/ $99</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Perfect for new professionals & small shops
                </p>
              </motion.div>
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
                    <motion.li
                      key={idx}
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="mt-0.5"
                      >
                        <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                      </motion.div>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Launch Your Digital Presence →
                </motion.button>
              </div>
            </motion.div>

            {/* Growth Bundle */}
            <motion.div
              className="border-2 border-emerald-500 rounded-xl overflow-hidden shadow-lg relative bg-gray-800"
              variants={item}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="absolute top-0 right-0 bg-emerald-600 text-white text-xs px-3 py-1 rounded-bl-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                POPULAR
              </motion.div>
              <motion.div
                className="p-6 bg-gradient-to-br from-emerald-900 to-teal-950 border-b border-emerald-800"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-1 flex flex-row gap-2">
                  {" "}
                  <Heart className="text-[#FF0098]" /> Growth Bundle
                </h3>
                <div className="flex items-end">
                  <motion.span
                    className="text-3xl font-bold"
                    animate={{
                      scale: [1, 1.05, 1],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    ₦450,000
                  </motion.span>
                  <span className="text-gray-400 ml-2">/ $299</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Best for businesses ready to grow online
                </p>
              </motion.div>
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
                    <motion.li
                      key={idx}
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="mt-0.5"
                      >
                        <Check className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                      </motion.div>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium py-3 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Accelerate Your Growth →
                </motion.button>
              </div>
            </motion.div>

            {/* Brand Master Plan */}
            <motion.div
              className="border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-gray-800"
              variants={item}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="p-6 bg-gradient-to-br from-purple-900 to-indigo-950 border-b border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-1 flex flex-row gap-2 ">
                  <Star className="text-yellow-500" />
                  Brand Master Plan
                </h3>
                <div className="flex items-end">
                  <motion.span
                    className="text-3xl font-bold"
                    animate={{
                      scale: [1, 1.05, 1],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    ₦950,000
                  </motion.span>
                  <span className="text-gray-400 ml-2">/ $599</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  For serious brands & growing companies
                </p>
              </motion.div>
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
                    <motion.li
                      key={idx}
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="mt-0.5"
                      >
                        <Check className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" />
                      </motion.div>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Dominate Your Market →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Custom Plan */}
          <motion.div
            className="mt-8 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-8 text-white border border-purple-700"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
            }}
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
              <motion.button
                className="mt-6 md:mt-0 bg-gray-800 text-blue-300 hover:bg-gray-700 font-medium px-6 py-3 rounded-lg flex items-center border border-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>Schedule Your Custom Brief</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-once="false"
      >
        {/* WHY 400BRANDS */}
        <motion.div
          className="py-12 text-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            variants={slideUp}
          >
            Why 400Brands?
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="flex flex-col items-center text-center p-6 bg-gray-950 rounded-xl shadow-md border border-gray-700"
              variants={item}
              whileHover={{
                y: -10,
                borderColor: "#3b82f6",
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)",
              }}
            >
              <motion.div
                className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
              >
                <img
                  src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746723502/checklist_ymxzrd.png"
                  width={90}
                />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Affordable Excellence</h3>
              <p className="text-gray-400">
                Premium quality at budget-friendly prices for African
                businesses.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-6 bg-gray-950 rounded-xl shadow-md border border-gray-700"
              variants={item}
              whileHover={{
                y: -10,
                borderColor: "#a855f7",
                boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.1)",
              }}
            >
              <motion.div
                className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                <img
                  src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746723633/forecasting_tbrc7h.png"
                  width={90}
                />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Future-Tech Ready</h3>
              <p className="text-gray-400">
                AI, Web3, and Automation solutions for tomorrow's challenges.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-6 bg-gray-950 rounded-xl shadow-md border border-gray-700"
              variants={item}
              whileHover={{
                y: -10,
                borderColor: "#f59e0b",
                boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.1)",
              }}
            >
              <motion.div
                className="w-16 h-16 bg-yellow-900 rounded-full flex items-center justify-center mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                <img
                  src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746723859/analysis_nnspfu.png"
                  width={90}
                />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">
                Data-driven & Design-forward
              </h3>
              <p className="text-gray-400">
                Beautiful solutions backed by real metrics and analytics.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </DefaultMain>
  );
}
