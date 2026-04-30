import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsPage = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-primary">Terms of Service</h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: April 12, 2026</p>

        <p className="mb-6 text-muted-foreground">By accessing and using our website, you agree to the following Terms of Service.</p>

        {[
          { title: "1. Services", body: "We provide digital services related to online gaming assistance, progression support, and in-game activity help. All services are delivered digitally and do not involve physical goods." },
          { title: "2. User Responsibility", body: "By using our services, you confirm that:", list: ["You are at least 18 years old or have permission from a legal guardian", "You provide accurate information when placing an order", "You understand that results may vary depending on in-game conditions"] },
          { title: "3. Service Delivery", list: ["Services are delivered within the estimated timeframe, but delays may occur due to technical or external factors", "We do not guarantee exact completion times or specific in-game outcomes"] },
          { title: "4. Payments", list: ["All payments are processed securely through third-party payment providers", "Prices are clearly displayed before purchase", "By completing a payment, you agree to the selected service and pricing"] },
          { title: "5. Limitation of Liability", body: "We are not responsible for:", list: ["Any actions taken by game publishers or third parties", "Account-related issues caused by external factors", "Indirect or consequential damages"] },
          { title: "6. Account Safety", body: "Users are responsible for maintaining the safety of their accounts and credentials. We recommend following best security practices." },
          { title: "7. Modifications", body: "We reserve the right to update or modify these Terms at any time without prior notice." },
          { title: "8. Contact", body: "For any questions, please contact us via our support channels (e.g. Discord or email)." },
        ].map((s) => (
          <section key={s.title} className="mb-6">
            <h2 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h2>
            {s.body && <p className="text-muted-foreground">{s.body}</p>}
            {s.list && (
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                {s.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
    <Footer />
  </>
);

export default TermsPage;
