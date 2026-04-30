import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameCards from "@/components/GameCards";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO
        title="Professional Game Boosting Services - Fast, Safe & Affordable"
        description="Get professional game boosting for Arena Breakout Infinite, CS2, Dota 2, and Rust. Expert boosters, 24/7 support, secure account handling. 5000+ orders completed with 4.9★ rating."
        keywords="game boosting, arena breakout boosting, cs2 boosting, dota 2 boosting, rust boosting, professional boosting service, safe game boost"
        canonicalUrl="https://www.myboost.top/"
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <GameCards />
        <HowItWorks />
        <WhyChooseUs />
        <Reviews />
        <FAQ />
        <Footer />
      </div>
    </>
  );
};

export default Index;
