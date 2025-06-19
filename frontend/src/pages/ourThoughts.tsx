import { title, subtitle } from "@/components/primitives";
import DefaultMain from "@/layouts/defaultMain";

export default function DocsPage() {
  return (
    <DefaultMain>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen bg-gradient-to-br from-slate-900/50 to-blue-900/30 backdrop-blur-3xl border border-white/20 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] mx-4">
        <div className="inline-block max-w-4xl text-center justify-center p-8">
          <h1 className={title({ class: "mb-6" })}>What We Think</h1>
          <p className={subtitle({ class: "mt-2 mb-8" })}>
            Inspired by Simon Sinek's Golden Circle Principle
          </p>

          <div className="text-left space-y-6 text-lg bg-white/5 p-8 rounded-xl backdrop-blur-sm">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-400">Our Why</h2>
              <p>
                We believe every great movement starts with a{" "}
                <span className="font-semibold">clear purpose</span>. Our "why"
                is to empower believers to think differently about their
                God-given potential and create solutions that reflect Kingdom
                principles in every sector of society.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-400">Our How</h2>
              <p>
                Through{" "}
                <span className="font-semibold">intentional frameworks</span>{" "}
                that combine:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Biblical wisdom with innovative thinking</li>
                <li>Spiritual discernment with technological advancement</li>
                <li>Kingdom values with business excellence</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-400">Our What</h2>
              <p>
                We're building <span className="font-semibold">400 Brands</span>{" "}
                - a portfolio of purpose-driven companies that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Solve real problems through a "why-first" lens</li>
                <li>Create alternative platforms for Kingdom influence</li>
                <li>
                  Demonstrate that faith and innovation aren't mutually
                  exclusive
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10">
              <blockquote className="text-xl italic">
                "People don't buy what you do, they buy why you do it. The goal
                is not to do business with everybody who needs what you have.
                The goal is to do business with people who believe what you
                believe." <br />
                <span className="not-italic font-semibold">— Simon Sinek</span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </DefaultMain>
  );
}
