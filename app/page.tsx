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
      <Hero />
      <Stats />
      <Guarantees />
      <TheBestLawyers />
      {/* <WhoCanApply /> */}
      <ImmigrationOptions />
      <ClientReviews />
      <UsefulInfo />
      <CTA />
    </main>
  );
}
