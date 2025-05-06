import { Link } from "@heroui/link";
import { Navbar } from "@/components/navbar";
import { useEffect, useRef, useState } from "react";

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
          <div className={`absolute inset-0 bg-black ${isMobile ? 'bg-opacity-70' : 'bg-opacity-50'}`}></div>
        </div>
      )}

      {/* Original Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl px-3 md:px-6 flex-grow pt-12 md:pt-16">
          {children}
        </main>
        <footer className="w-full flex items-center justify-center py-2 md:py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current text-sm md:text-base"
            href="https://heroui.com"
            title="heroui.com homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">HeroUI</p>
          </Link>
        </footer>
      </div>
    </div>
  );
}