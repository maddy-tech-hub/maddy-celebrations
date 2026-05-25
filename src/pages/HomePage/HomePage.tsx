import { Sparkles, Timer, ShieldCheck } from "lucide-react";
import { ContactSection } from "../../components/sections/ContactSection/ContactSection";
import { FaqSection } from "../../components/sections/FaqSection/FaqSection";
import { HeroSection } from "../../components/sections/HeroSection/HeroSection";
import { ServicesSection } from "../../components/sections/ServicesSection/ServicesSection";
import { TestimonialsSection } from "../../components/sections/TestimonialsSection/TestimonialsSection";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { services } from "../../data/services";

const topCategories = [...new Set(services.map((service) => service.category))];

export const HomePage = () => (
  <main className="space-y-10 pb-8">
    <HeroSection />
    <section className="mx-auto max-w-[1320px] px-4 sm:px-6">
      <Card className="rounded-3xl border border-slate-100 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-5xl">Make Every Celebration Memorable</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-lg">
          Premium Decoration Services For Every Special Occasion
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a href="#services">
            <Button>Explore Services</Button>
          </a>
          <p className="text-sm font-medium text-slate-500">Trusted decoration partner for home and event venues.</p>
        </div>
      </Card>
    </section>
    <section className="mx-auto max-w-[1320px] space-y-4 px-4 sm:px-6">
      <h2 className="text-xl font-bold text-slate-900">Explore Categories</h2>
      <div className="flex flex-wrap gap-2">
        {topCategories.map((category) => (
          <a
            key={category}
            href="#services"
            className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:border-brand-500 hover:bg-white"
          >
            {category}
          </a>
        ))}
      </div>
    </section>
    <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
      <ServicesSection />
    </div>
    <section className="mx-auto max-w-[1320px] space-y-5 px-4 sm:px-6">
      <h2 className="text-2xl font-bold text-slate-900">Why Choose Us</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <Sparkles className="mb-2 text-brand-700" />
          <p className="text-sm text-slate-700">Premium styling and quality decor materials.</p>
        </Card>
        <Card>
          <Timer className="mb-2 text-brand-700" />
          <p className="text-sm text-slate-700">Punctual setup with experienced decorators.</p>
        </Card>
        <Card>
          <ShieldCheck className="mb-2 text-brand-700" />
          <p className="text-sm text-slate-700">Transparent pricing with dependable support.</p>
        </Card>
      </div>
    </section>
    <div className="mx-auto max-w-[1320px] space-y-10 px-4 sm:px-6">
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </div>
  </main>
);
