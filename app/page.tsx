import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Guarantees from "./components/Guarantees";
import WhoCanApply from "./components/WhoCanApply";
import ImmigrationOptions from "./components/ImmigrationOptions";
import ClientReviews from "./components/ClientReviews";
import UsefulInfo from "./components/UsefulInfo";
import CTA from "./components/CTA";
import TheBestLawyers from "./components/TheBestLawyers";

export default function Home() {
  return (
    <main className="bg-white text-black">
      <div id="consultation">
        <Hero />
      </div>
      <div className="mx-auto max-w-screen-2xl px-5 md:px-20">
        <div id="about">
          <Stats />
          <Guarantees />
          <TheBestLawyers />
        </div>
        <WhoCanApply />
        <div id="services">
          <ImmigrationOptions />
        </div>
        <div id="reviews">
          <ClientReviews />
        </div>
        <UsefulInfo />
      </div>
      <div id="contacts">
        <CTA />
      </div>
    </main>
  );
}
