import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameCards from "@/components/GameCards";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import ArenaBreakoutGuides from "@/components/ArenaBreakoutGuides";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";

const Index = () => {
  return (
    <>
      <SEO
        title="Professional Pro Gaming Services - Fast, Safe & Affordable"
        description="Get professional gaming services for Arena Breakout: Infinite, CS2, Dota 2, and Rust. Expert pro players, 24/7 support, secure account handling. 5000+ orders completed with 4.9★ rating."
        keywords="pro gaming services, arena breakout carry, cs2 pro service, dota 2 pro service, rust services, professional gaming service, safe game carry"
        canonicalUrl="https://www.myboost.top/"
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Reveal><GameCards /></Reveal>
        <Reveal><HowItWorks /></Reveal>
        <Reveal><WhyChooseUs /></Reveal>
        <Reveal><Reviews /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><ArenaBreakoutGuides /></Reveal>
        <Footer />
      </div>
    </>
  );
};

export default Index;
