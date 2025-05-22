import { TwitterIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import DefaultMain from "@/layouts/defaultMain";
import { Image } from "@heroui/image";
import { Linkedin, Mail } from "lucide-react";

interface SocialLinks {
  linkedin: string;
  twitter: string;
  email: string;
}

interface Leader {
  name: string;
  title: string;
  bio: string;
  image: string;
  social: SocialLinks;
}

const leaders: Leader[] = [
  {
    name: "Wisdom Chris",
    title: "Chair & Cofounder",
    bio: "Julie leads Accenture's strategy and operations globally, driving innovation and sustainable growth across all markets and services.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1747926521/1644496074350_gzqhkf.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "KC McClure",
    title: "Chief Financial Officer",
    bio: "KC oversees Accenture's global financial operations, investor relations, and strategic financial planning initiatives.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1725004015/samples/man-portrait.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "Emeka Chukwu",
    title: "Graphics Designer",
    bio: "Paul leads Accenture's technology services and innovation strategy, helping clients transform through emerging technologies.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1747927520/1743692080459_lzws4s.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "Manish Sharma",
    title: "Group Chief Executive – Strategy & Consulting",
    bio: "Manish drives strategic consulting services, helping organizations navigate complex business transformations.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1725004015/samples/man-portrait.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "Julie Spellman Sweet",
    title: "Group Chief Executive – Operations",
    bio: "Julie leads operational excellence initiatives and manages global service delivery across all client engagements.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1725004015/samples/man-portrait.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "Ellyn Shook",
    title: "Chief Leadership & Human Resources Officer",
    bio: "Ellyn champions talent development, diversity & inclusion, and organizational culture transformation initiatives.",
    image:
      "https://res.cloudinary.com/dgbreoalg/image/upload/v1725004016/samples/upscale-face-1.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  // Add more leaders as needed
];

export default function LeadershipPage() {
  return (
    <DefaultMain>
      <section className="flex flex-col items-start justify-center gap-4 py-4 min-h-screen bg-black text-white">
        <div className=" max-w-5xl text-left">
          <h1 className={title()}>Our Leadership</h1>
          <p className="mt-4 text-lg text-gray-300">
            Meet the leaders guiding our vision and strategy.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={leader.image}
                alt={leader.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{leader.name}</h2>
                  <p className="text-gray-400">{leader.title}</p>
                  <div className="mt-4 flex space-x-4">
                    <a
                      href={leader.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href={leader.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <TwitterIcon size={20} />
                    </a>
                    <a
                      href={`mailto:${leader.social.email}`}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
                <p className="mt-2 text-md font-bold text-gray-300">Read Bio</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DefaultMain>
  );
}
