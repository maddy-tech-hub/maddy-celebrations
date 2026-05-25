import { Card } from "../../ui/Card";

const faq = [
  { q: "How early should I book?", a: "We recommend booking 5-7 days in advance." },
  { q: "Can I customize themes?", a: "Yes, all packages support custom themes and color palettes." },
];

export const FaqSection = () => (
  <section className="space-y-5">
    <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
    <div className="grid gap-4 md:grid-cols-2">
      {faq.map((item) => (
        <Card key={item.q}>
          <h3 className="font-semibold text-slate-900">{item.q}</h3>
          <p className="mt-2 text-sm text-slate-600">{item.a}</p>
        </Card>
      ))}
    </div>
  </section>
);
