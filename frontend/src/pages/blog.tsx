import { TwitterIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { leaders } from "@/constant";
import DefaultMain from "@/layouts/defaultMain";
import { Image } from "@heroui/image";
import { Linkedin, Mail } from "lucide-react";

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
