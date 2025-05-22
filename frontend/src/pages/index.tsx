import DefaultMain from "@/layouts/defaultMain";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Check,
  Headset,
  Phone,
  Star,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Link } from "@heroui/link";
import { TypeAnimation } from "react-type-animation";

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
                <Link href="/bake">
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-purple-500 text-black font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Brand Doctor</span>
                  </motion.button>
                </Link>

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

      {/* OUR WORKS - DARK MODE */}
      <section
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-once="false"
      >
        <motion.div
          className="p-12 bg-gray-950 text-gray-100 border border-gray-700 rounded-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.h2
            className="text-3xl font-bold mb-2 text-center"
            variants={slideUp}
          >
            Our Works
          </motion.h2>
          <motion.p
            className="text-center mb-12 text-xl text-gray-300"
            variants={slideUp}
          >
            Real Brands. Real Results.
          </motion.p>

          <motion.div className="relative" variants={scaleUp}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-medium flex items-center text-gray-100">
                <motion.span
                  className="text-4xl mr-3"
                  whileHover={{ scale: 1.05 }}
                >
                  {typeof works[currentWork].icon === "string" &&
                  works[currentWork].icon.startsWith("https://") ? (
                    <motion.img
                      src={works[currentWork].icon}
                      alt="Brand icon"
                      width={150}
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
                  <ArrowBigLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={nextWork}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowBigRight className="w-5 h-5" />
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
                <div className="aspect-video bg-slate-950 w-full relative overflow-hidden">
                  <motion.img
                    src={works[currentWork].image}
                    alt={works[currentWork].desc}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-full border-1 border-blue-900 flex items-center justify-center text-2xl mr-4 text-blue-300 overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        src={"https://avatar.iran.liara.run/public"}
                        alt="Brand icon"
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-gray-100">
                        {works[currentWork].name}
                      </h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.div
                            key={star}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.p
                    className="italic text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    "400Brands transformed our business completely. The ROI has
                    been incredible!"
                  </motion.p>
                  <motion.p
                    className="mt-4 text-blue-300 font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {works[currentWork].desc}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-6">
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
                <h3 className="text-2xl font-bold mb-1">🔹 Starter Kit</h3>
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
                    "1-page website",
                    "WhatsApp biz setup",
                    "Social media audit",
                    "1-hour tech strategy call",
                  ].map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <Check className="w-5 h-5 text-green-400 mr-2" />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>

            {/* Growth Bundle */}
            <motion.div
              className="border-2 border-blue-500 rounded-xl overflow-hidden shadow-lg relative bg-gray-800"
              variants={item}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg"
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
                className="p-6 bg-gradient-to-br from-slate-900 to-gray-950 border-b border-blue-800"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-1">🔸 Growth Bundle</h3>
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
                    "5-page website or landing funnel",
                    "1 AI WhatsApp bot",
                    "1 month social media management",
                    "Basic SEO + Google Business setup",
                    "2 strategy calls + monthly report",
                  ].map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <Check className="w-5 h-5 text-blue-400 mr-2" />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
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
                className="p-6 bg-gradient-to-br from-slate-900 to-gray-950 border-b border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-1">
                  🌟 Brand Master Plan
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
                    "Full website or mobile app",
                    "AI & automation workflows",
                    "3-month content & marketing plan",
                    "Custom design pack (logo, templates)",
                    "Monthly consulting + reviews",
                  ].map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <Check className="w-5 h-5 text-green-400 mr-2" />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
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
