import { title, subtitle } from "@/components/primitives";
import DefaultMain from "@/layouts/defaultMain";

export default function DocsPage() {
  return (
    <DefaultMain>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen bg-gradient-to-br from-slate-900/50 to-blue-900/30 backdrop-blur-3xl border border-white/20 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] mx-4">
        {" "}
        <div className="inline-block max-w-4xl text-center justify-center ">
          <h1 className={title()}>400Brands</h1>
          <p className={subtitle({ class: "mt-4" })}>
            Cultivating Creativity Through Faith Powered Disruptive Innovation
          </p>

          <div className="text-left mt-8 space-y-6 text-lg">
            <p>
              400 Brands is not just another corporate entity - we're a movement
              of believers building kingdom-focused enterprises that reshape
              industries while maintaining an uncompromising commitment to our
              Christian values. Our name draws inspiration from Genesis 15:5,
              where God promises Abraham descendants as numerous as the stars,
              challenging us to think abundantly about our potential impact.
            </p>

            <h2 className="text-2xl font-bold mt-8">Our Vision</h2>
            <p>
              We envision creating 400 billion-dollar valuation brands within
              the next decade that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Solve pressing global problems through technological innovation
              </li>
              <li>
                Create platforms that amplify Christian values in mainstream
                culture
              </li>
              <li>
                Fund kingdom initiatives through sustainable business models
              </li>
              <li>Develop ethical alternatives to secular tech giants</li>
              <li>
                Empower believers to occupy influential spaces in every industry
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">Our Strategy</h2>
            <p>
              Our approach combines Silicon Valley-level innovation with
              biblical wisdom:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="p-4 border rounded-lg space-y-4">
                <h3 className="text-xl font-semibold text-center">
                  Incubation Engine
                </h3>
                <p>
                  We identify, fund, and scale startups that align with our
                  mission across sectors including AI, biotech, renewable
                  energy, and media. Each venture undergoes rigorous spiritual
                  and business vetting.
                </p>
              </div>
              <div className="p-4 border rounded-lg space-y-4">
                <h3 className="text-xl font-semibold text-center">
                  Talent Development
                </h3>
                <p>
                  Through our 400Brands Academy, we train next-gen entrepreneurs
                  in both cutting-edge technologies and biblical leadership
                  principles.
                </p>
              </div>
              <div className="p-4 border rounded-lg space-y-4">
                <h3 className="text-xl font-semibold text-center">
                  Strategic Partnerships
                </h3>
                <p>
                  We collaborate with Govt, Ministries, Investors and Ethical
                  investors to create an ecosystem where faith-driven innovation
                  thrives.
                </p>
              </div>
              <div className="p-4 border rounded-lg space-y-4">
                <h3 className="text-xl font-semibold text-center">
                  Impact Measurement
                </h3>
                <p>
                  Beyond financial metrics, we track spiritual impact - lives
                  changed, cultural influence gained, and biblical values
                  advanced in society.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8">Core Focus Areas</h2>
            <p>Our current portfolio includes ventures in:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Ethical AI:</strong> Developing artificial intelligence
                systems with biblical worldview frameworks
              </li>
              <li>
                <strong>Kingdom Media:</strong> Creating alternative platforms
                to mainstream entertainment and social media
              </li>
              <li>
                <strong>BioInnovation:</strong> Advancing medical technologies
                that honor the sanctity of life
              </li>
              <li>
                <strong>Green Tech:</strong> Sustainable solutions that fulfill
                our creation mandate
              </li>
              <li>
                <strong>Financial Systems:</strong> Building economic
                infrastructure aligned with biblical principles
              </li>
            </ul>

            <div className="bg-blue-950 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold text-center">
                Join the Movement
              </h2>
              <p className="mt-4">
                Whether you're an entrepreneur, investor, technologist, or
                prayer warrior, there's a place for you in the 400Brands vision.
                We believe the next decade will see unprecedented opportunities
                for believers to lead in innovation while remaining steadfast in
                faith.
              </p>
              <p className="mt-4 font-semibold">
                Together, we're proving that the most cutting-edge solutions can
                come from those who kneel before the cross.
              </p>
            </div>
          </div>
        </div>
      </section>
    </DefaultMain>
  );
}