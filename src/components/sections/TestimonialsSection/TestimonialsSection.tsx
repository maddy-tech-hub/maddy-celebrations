import { Card } from "../../ui/Card";

const testimonials = [
  { name: "Asha", quote: "Beautiful decor and on-time setup. Our guests loved it." },
  { name: "Rohan", quote: "Very smooth coordination and premium quality finish." },
];

export const TestimonialsSection = () => (
  <section className="space-y-5">
    <h2 className="text-2xl font-bold text-slate-900">Testimonials</h2>
    <div className="grid gap-4 md:grid-cols-2">
      {testimonials.map((item) => (
        <Card key={item.name}>
          <p className="text-slate-700">{item.quote}</p>
          <p className="mt-3 text-sm font-semibold text-slate-900">{item.name}</p>
        </Card>
      ))}
    </div>
  </section>
);
