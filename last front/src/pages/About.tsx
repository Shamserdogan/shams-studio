import AboutSection from "../components/About";
import BackButton from "../components/ui/BackButton";

export default function About() {
  return (
    <div className="relative">
     <div className="absolute top-28 md:top-24 left-2 md:left-6 z-20">
  <BackButton />
</div>

      <AboutSection />
    </div>
  );
}