import { Gamepad2, Settings, Rocket } from "lucide-react";

const steps = [
  { icon: Gamepad2, title: "Choose Your Game", description: "Pick from our roster of supported competitive titles." },
  { icon: Settings, title: "Select Your Boost", description: "Configure your desired rank, level, or service package." },
  { icon: Rocket, title: "Get Boosted", description: "Our pro players complete your order fast and safely." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="border-y border-border/50 bg-secondary py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl animate-slide-up">
          How It <span className="text-primary glow-text">Works</span>
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center group animate-slide-up" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 glow-box transition-all duration-500 group-hover:scale-110 group-hover:glow-box-intense group-hover:rotate-12">
                <step.icon className="h-7 w-7 text-primary transition-transform duration-500 group-hover:scale-110" />

                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute left-full top-1/2 w-full h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </div>
              <span className="mt-4 text-sm font-bold text-primary glow-text">Step {i + 1}</span>
              <h3 className="mt-2 text-xl font-bold uppercase text-foreground transition-colors duration-300 group-hover:text-primary">{step.title}</h3>
              <p className="mt-2 text-muted-foreground transition-colors duration-300 group-hover:text-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
