import { Mail, Phone } from "lucide-react";
import { Card } from "../../ui/Card";

export const ContactSection = () => (
  <section className="space-y-5">
    <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
    <Card className="grid gap-3">
      <p className="inline-flex items-center gap-2 text-sm text-slate-700">
        <Phone size={16} /> +91 6362411428
      </p>
      <p className="inline-flex items-center gap-2 text-sm text-slate-700">
        <Mail size={16} /> vemireddyomr@gmail.com
      </p>
    </Card>
  </section>
);
