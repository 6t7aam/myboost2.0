import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is boosting safe? Will I get banned?",
    a: "Absolutely. We use VPN protection, appear-offline mode, and professional techniques to ensure your account stays safe. We have a 0% ban rate across thousands of completed orders.",
  },
  {
    q: "How fast will my order be completed?",
    a: "Most orders start within 15 minutes of payment confirmation. Completion times vary by service — ELO boosts typically take 2-8 hours, while larger orders may take 1-3 days.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cryptocurrency (USDT TRC20, LTC) for instant, anonymous payments. Card payments (Visa/Mastercard) are also available through our operator.",
  },
  {
    q: "Can I play on my account during the boost?",
    a: "For account-sharing services, we recommend staying offline while the booster works. For play-with-booster and coaching services, you'll be playing together!",
  },
  {
    q: "What if I'm not satisfied with the service?",
    a: "We offer a full money-back guarantee. If you're not happy with the service, contact us on Discord and we'll resolve it immediately.",
  },
  {
    q: "How do I contact support?",
    a: "Reach us on Discord at geroj2 — we're available 24/7 and typically respond within minutes.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
          Frequently Asked <span className="text-primary glow-text">Questions</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Everything you need to know before ordering.
        </p>

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border/50 bg-card px-5 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
