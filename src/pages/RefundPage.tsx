import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const RefundPage = () => (
  <>
    <Helmet>
      <link rel="canonical" href="https://www.myboost.top/refund" />
    </Helmet>
    <Navbar />
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-primary">Refund Policy</h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: April 12, 2026</p>

        <p className="mb-6 text-muted-foreground">We strive to provide high-quality digital services. This Refund Policy outlines the conditions under which refunds may be issued.</p>

        {[
          { title: "1. Eligibility for Refunds", body: "Refunds may be considered in the following cases:", list: ["The service has not yet been started", "The service cannot be delivered due to internal limitations", "A duplicate payment was made"] },
          { title: "2. Non-Refundable Cases", body: "Refunds will not be issued if:", list: ["The service has already been started or completed", "Delays occur due to factors beyond our control", "The customer changes their mind after purchase"] },
          { title: "3. Partial Refunds", body: "In some cases, partial refunds may be issued based on the progress of the service at the time of the request." },
          { title: "4. Payment Disputes", body: "By purchasing our services, you agree to contact us first before opening any dispute or chargeback. We are committed to resolving issues fairly." },
          { title: "5. Processing Time", body: "Approved refunds are processed within a reasonable timeframe, depending on the payment provider." },
          { title: "6. Fraud Prevention", body: "We reserve the right to refuse refunds in cases of abuse, fraud, or violation of our Terms of Service." },
          { title: "7. Contact", body: "To request a refund, please contact our support team via Discord or email with your order details." },
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

export default RefundPage;
