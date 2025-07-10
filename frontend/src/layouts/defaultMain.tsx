"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Mail, Phone } from "lucide-react";
import { Link } from "@heroui/link";
import { useNavigate } from "react-router-dom";

interface DefaultMainProps {
  children: React.ReactNode;
}

export default function DefaultMain({ children }: DefaultMainProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [showFirstVideo, setShowFirstVideo] = useState(true);
  const navigate = useNavigate(); // Moved inside the component

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = isMobile
        ? window.innerHeight / 3
        : window.innerHeight / 2;

      if (scrollPosition > threshold && showFirstVideo) {
        setShowFirstVideo(false);
      } else if (scrollPosition <= threshold && !showFirstVideo) {
        setShowFirstVideo(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, showFirstVideo]);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/2347083519662`, "_blank"); // Better to use window.open for external links
  };

  const handleEmail = () => {
    window.location.href = "mailto:hello@400brands.com";
  };

  return (
    <div className="relative flex flex-col min-h-screen font-Raleway">
      {/* Video Backgrounds */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
        {/* First Video */}
        <video
          className={`absolute w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            showFirstVideo ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          poster="https://res.cloudinary.com/dgbreoalg/image/upload/v1747050845/Screenshot_1_luugsj.png"
        >
          <source
            src="https://res.cloudinary.com/dgbreoalg/video/upload/v1751546559/Bg_video_Trim_py8qk0.mp4"
            type="video/mp4"
          />
        </video>

        {/* Second Video */}
        <video
          className={`absolute w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            showFirstVideo ? "opacity-0" : "opacity-100"
          }`}
          autoPlay
          muted
          loop
          playsInline
          poster="https://res.cloudinary.com/dgbreoalg/image/upload/v1747050845/Screenshot_1_luugsj.png"
        >
          <source
            src="https://res.cloudinary.com/dgbreoalg/video/upload/v1751545995/trimed_1_p0nprj.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay for contrast */}
        <div
          className={`absolute inset-0 bg-black ${
            isMobile ? "bg-opacity-70" : "bg-opacity-50"
          }`}
        ></div>
      </div>

      {/* Content & Footer Here */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl px-3 space-y-6 md:px-6 flex-grow">
          {children}
        </main>

        {/* Footer CTA */}
        <footer className="w-full flex flex-col items-stretch justify-center pt-2 md:pt-3">
          <div className="p-12 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Digital Journey?
              </h2>
              <p className="mb-8 text-lg">
                Book your <b>free consultation</b> or pick a plan that fits your
                business!
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate("/bake")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded-lg flex items-center"
                >
                  <span>Start Now</span>
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="bg-white text-green-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg flex space-x-3 items-center"
                >
                  <Phone className="text-green-700" />
                  <span>Call On WhatsApp</span>
                </button>
                <button
                  onClick={handleEmail}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg flex items-center"
                >
                  <Mail className="mr-2" />
                  <span>hello@400brands.com</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="p-8 bg-gray-950 text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-10 h-10 bg-blue-500 rounded-full mr-3 flex items-center justify-center text-white font-bold">
                  400
                </div>
                <span className="text-white font-bold">400Brands</span>
              </div>

              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/400brands/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1725023787/instagram_jwzgzp.svg"
                    width={25}
                    alt="Instagram"
                  />
                </a>
                <Link isExternal href="https://wa.me/2347083519662">
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746726813/whatsapp_xyz2jq.png"
                    width={25}
                    alt="WhatsApp"
                  />
                </Link>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746726393/facebook_npnmeh.png"
                    width={25}
                    alt="Facebook"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/400brands/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746726511/linkedin_tcu2e5.png"
                    width={25}
                    alt="LinkedIn"
                  />
                </a>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-6 pt-6 text-sm text-center">
              © 2025 400Brands.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
