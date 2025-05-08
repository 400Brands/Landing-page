import { Link } from "@heroui/link";
import { Navbar } from "@/components/navbar";
import { useEffect, useRef, useState } from "react";
import { FacebookIcon, InstagramIcon, Linkedin, Mail, MessageSquare, Phone, X } from "lucide-react";
import { TwitterIcon } from "@/components/icons";

export default function DefaultMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    // Check screen size on mount and when resizing
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Scroll handler
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust scroll threshold based on screen size
      const threshold = isMobile ? window.innerHeight / 3 : window.innerHeight / 2;
      
      if (scrollPosition > threshold) {
        setIsVideoVisible(false);
      } else {
        setIsVideoVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [isMobile]);

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Video Background */}
      {isVideoVisible && (
        <div
          ref={videoContainerRef}
          className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden"
        >
          <video
            className="absolute w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Placeholder until video loads
          >
            <source
              src="https://res.cloudinary.com/dgbreoalg/video/upload/v1746533090/3129957-uhd_3840_2160_25fps_yzki9b.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {/* Darker overlay for better text visibility on mobile */}
          <div
            className={`absolute inset-0 bg-black ${
              isMobile ? "bg-opacity-70" : "bg-opacity-50"
            }`}
          ></div>
        </div>
      )}

      {/* Original Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl px-3 space-y-6 md:px-6 flex-grow pt-12 md:pt-16">
          {children}
        </main>
        <footer className="w-full flex flex-col items-stretch justify-center pt-2 md:pt-3">
          {/* CALL TO ACTION */}
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
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded-lg flex items-center">
                  <span>Start Now</span>
                </button>
                <button className="bg-white text-green-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg flex space-x-3 items-center">
                  <Phone className="text-green-700"/>
                  <span>Call On Phone</span>
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg flex items-center">
                  <Mail className=" mr-2" />
                  <span>hello@400brands.com</span>
                </button>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-8 bg-gray-950 text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-10 h-10 bg-blue-500 rounded-full mr-3 flex items-center justify-center text-white font-bold">
                  400
                </div>
                <span className="text-white font-bold">400Brands</span>
              </div>

              <div className="flex space-x-6">
                <a href="#">
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1725023787/instagram_jwzgzp.svg"
                    width={25}
                  />
                </a>
                <a href="#">
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746726813/whatsapp_xyz2jq.png"
                    width={25}
                  />
                </a>
                <a href="#">
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746726393/facebook_npnmeh.png"
                    width={25}
                  />
                </a>
                <a href="#">
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746726511/linkedin_tcu2e5.png"
                    width={25}
                  />
                </a>
                <a href="#">
                  <img
                    src="https://res.cloudinary.com/dgbreoalg/image/upload/v1746726877/tiktok_ajbb4g.png"
                    width={25}
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