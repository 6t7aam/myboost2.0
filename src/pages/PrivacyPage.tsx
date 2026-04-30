import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPage = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-primary">Privacy Policy</h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: April 12, 2026</p>

        <p className="mb-6 text-muted-foreground">We value your privacy and are committed to protecting your personal information.</p>

        {[
          { title: "1. Information We Collect", body: "We may collect personal information such as email address, order details, and usage data when you interact with our website." },
          { title: "2. How We Use Information", body: "We use collected data to:", list: ["Provide and improve our services", "Process orders and communicate with users", "Ensure security and prevent fraud"] },
          { title: "3. Data Protection", body: "We take reasonable measures to protect your information from unauthorized access, loss, or misuse." },
          { title: "4. Third-Party Services", body: "We may use third-party services (such as payment providers) to process payments and support functionality. These services may process your data according to their own policies." },
          { title: "5. Cookies", body: "We may use cookies and similar technologies to improve user experience and analyze site usage." },
          { title: "6. User Rights", body: "Users may request access, correction, or deletion of their personal data by contacting us." },
          { title: "7. Changes", body: "We may update this Privacy Policy at any time without prior notice." },
          { title: "8. Contact", body: "If you have questions, contact us via our support channels (Discord or email)." },
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

export default PrivacyPage;
