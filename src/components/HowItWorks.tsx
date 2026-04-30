import { Gamepad2, Settings, Rocket } from "lucide-react";

const steps = [
  { icon: Gamepad2, title: "Choose Your Game", description: "Pick from our roster of supported competitive titles." },
  { icon: Settings, title: "Select Your Boost", description: "Configure your desired rank, level, or service package." },
  { icon: Rocket, title: "Get Boosted", description: "Our pro players complete your order fast and safely." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="border-y border-border/50 bg-secondary py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
          How It <span className="text-primary glow-text">Works</span>
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 glow-box">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="mt-4 text-sm font-bold text-primary">Step {i + 1}</span>
              <h3 className="mt-2 text-xl font-bold uppercase text-foreground">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
