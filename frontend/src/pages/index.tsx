import DefaultMain from "@/layouts/defaultMain";
import {
  Check,
  Headset,
  Star,
} from "lucide-react";
import { ReactNode } from "react";
import { Link } from "@heroui/link";
import { TypeAnimation } from "react-type-animation";
import WaitlistForm from "@/components/WaitlistForm";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function IndexPage() {

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
      <section className="flex flex-col items-center justify-between min-h-screen text-white overflow-hidden">
        <div className="container mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row item-center justify-center">
            <div className="space-y-8 lg:pr-8 mt-20">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Ready-to-post social content.
                  </span>
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                ScrollMine turns your everyday browsing into ready-to-post social content. Currently in alpha testing.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <HashLink href="#brandDoctor">
                  <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                    <span className="flex items-center justify-center">
                     Join Alpha Test
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </HashLink>

                <Link isExternal href="https://wa.me/2347083519662">
                  <button className="group bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                    <span className="flex items-center justify-center">
                      <Headset className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Book Free Consultation
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex items-start justify-center lg:justify-end">
              <div className="relative">
                <DotLottieReact
                  src="https://lottie.host/f435da50-b436-410e-99a6-08ffbb25329a/OG58OcEfUo.lottie"
                  loop
                  autoplay
                  className="w-80 h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px]"
                />
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-24 z-10 text-center px-4">
          <p className="font-sans">
            <TypeAnimation
              sequence={[
                "Capture with a Click",
                2000,
                "Organize Your Ideas",
                2000,
                "Create Polished Posts",
                2000,
                "Ready-to-post social content",
                2000,
                "Post to Social Media",
                2000,
                "Alpha Testing Now",
                2000,
              ]}
              speed={30}
              deletionSpeed={50}
              style={{
                color: "#3b82f6",
                fontFamily: '"Underdog", cursive',
              }}
              wrapper="span"
              repeat={Infinity}
            />{" "}
            — 💡  <b>ScrollMine</b>{" "}
            <br /> turns your everyday browsing
            <br /> into ready-to-post social content
          </p>
        </div>
      </section>

      {/* Waitlist Section */}
      <section
        id="brandDoctor"
        className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Join Alpha Testing
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              ScrollMine is currently in alpha stage! Enter your email to get invited to test it out and be among the first to experience our revolutionary social content creation platform.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Star className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Get Alpha Access
              </h3>
            </div>

            <WaitlistForm />

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
              <Check className="w-4 h-4 text-green-400" />
              <span>We'll send you an invite to test the alpha version. No spam, just early access.</span>
            </div>
          </div>
        </div>
      </section>

{/* Testimonials Section */}
      <section
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-once="false"
        className="relative flex flex-col gap-6"
      >
        <div className="py-10 md:py-10 relative z-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Real reviews from beauty enthusiasts who are testing our alpha version and transforming their social media presence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                name: "Sarah Johnson",
                handle: "@sarahbeauty",
                rating: 5,
                review: "Being part of ScrollMine's alpha testing has been incredible! I went from spending hours editing to posting daily in minutes. My engagement went up 300% in just 2 weeks!",
                product: "Daily Glow Foundation",
                category: "Makeup Reviews"
              },
              {
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                name: "Maria Rodriguez",
                handle: "@mariabeauty",
                rating: 5,
                review: "As a makeup artist, I was struggling to keep up with content creation. Being an alpha tester for ScrollMine has been amazing - the AI suggestions are spot-on and save me hours every week. My clients love seeing the behind-the-scenes!",
                product: "Pro Palette Collection",
                category: "Beauty Tips"
              },
              {
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
                name: "Emma Thompson",
                handle: "@emmatrends",
                rating: 5,
                review: "The alpha version of ScrollMine is incredible! I discovered so many new makeup trends and my followers can't get enough. My affiliate sales increased by 150% since testing it.",
                product: "Trending Lipsticks",
                category: "Product Reviews"
              },
              {
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                name: "Alex Chen",
                handle: "@alexbeauty",
                rating: 5,
                review: "Finally, a tool that understands beauty content! Testing the alpha version has been amazing - the captions are engaging and the hashtag suggestions are gold. My organic reach doubled in the first month.",
                product: "Skincare Routine",
                category: "Skincare Reviews"
              },
              {
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
                name: "Jessica Park",
                handle: "@jessbeauty",
                rating: 5,
                review: "I was spending 3 hours daily on content creation. Since joining the alpha test, it takes me 30 minutes max! The AI understands my brand voice perfectly. My followers think I hired a social media manager!",
                product: "Eye Shadow Palette",
                category: "Tutorial Content"
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-900 to-gray-950 p-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:translate-y-[-5px] border border-gray-700"
              >
                {/* Header with Avatar and Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-purple-400">{testimonial.handle}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm mb-4 italic">
                  "{testimonial.review}"
                </p>

                {/* Product and Category */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-400 font-medium">{testimonial.product}</span>
                  <span className="text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                    {testimonial.category}
                  </span>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-purple-600 to-pink-700 p-6 rounded-xl text-white hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:translate-y-[-5px] border border-pink-500/30">
              <div className="text-center">
                <div className="text-4xl mb-4">
                  <Star className="w-12 h-12 mx-auto fill-yellow-400 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Join Alpha Testing</h3>
                <p className="text-sm mb-4">
                  Be part of the exclusive group of beauty creators testing ScrollMine alpha and transforming their social media game
                </p>
                <div className="text-2xl font-bold text-yellow-400">4.9/5</div>
                <p className="text-xs text-gray-300">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </DefaultMain>
  );
}