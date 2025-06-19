import { title } from "@/components/primitives";
import DefaultMain from "@/layouts/defaultMain";

export default function DocsPage() {
  return (
    <DefaultMain>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Careers</h1>
          <p> There is nothing For Now - check back later</p>
        </div>
      </section>
    </DefaultMain>
  );
}
