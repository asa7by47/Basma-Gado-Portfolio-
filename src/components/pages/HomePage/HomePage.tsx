import { Hero, AboutSection, ContactSection } from "@/components/organisms";
import { SectionHeader } from "@/components/molecules/SectionHeader";

export function HomePage() {
  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-24">
      <Hero />

      <div className="max-w-content mx-auto px-6 w-full flex flex-col gap-12">
        <SectionHeader
          eyebrow="Introduction"
          title="About Me"
          align="center"
          className="mx-auto"
        />
        <AboutSection />
      </div>

      <div className="max-w-content mx-auto px-6 w-full">
        <ContactSection />
      </div>
    </div>
  );
}
