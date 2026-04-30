import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameCards from "@/components/GameCards";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
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
  );
};

export default Index;
