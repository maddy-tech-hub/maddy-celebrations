import { BadgePercent, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { EnquiryForm } from "../../components/service/EnquiryForm/EnquiryForm";
import { Card } from "../../components/ui/Card";
import { fallbackServiceImage } from "../../data/images";
import { services } from "../../data/services";
import { formatPrice, getSpecialPrice, OFFER_DISCOUNT_PERCENTAGE } from "../../utils/pricing";

export const ServiceDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find((item) => item.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const galleryImages = useMemo(() => {
    if (!service) return [];
    const all = [service.image, ...service.gallery];
    return all.filter((image, index) => all.indexOf(image) === index);
  }, [service]);

  if (!service) return <Navigate to="/404" replace />;

  const activeImage = galleryImages[activeImageIndex] ?? fallbackServiceImage;
  const specialPrice = getSpecialPrice(service.startingPrice);
  const showPrev = () => setActiveImageIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1));
  const showNext = () => setActiveImageIndex((current) => (current + 1) % galleryImages.length);
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  return (
    <>
      <main className="mx-auto grid max-w-[1320px] gap-6 px-4 py-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
            Back to Services
          </button>

          <button
            type="button"
            onClick={() => setIsViewerOpen(true)}
            className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
          >
            <img
              src={activeImage}
              alt={service.title}
              className="h-[58vh] w-full object-contain"
              onError={(event) => {
                event.currentTarget.src = fallbackServiceImage;
              }}
            />
          </button>

          {galleryImages.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {galleryImages.map((image, index) => (
                <button
                  key={`${service.id}-thumb-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded-xl border ${index === activeImageIndex ? "border-brand-500" : "border-slate-200"}`}
                >
                  <img
                    src={image}
                    alt={`${service.title} ${index + 1}`}
                    className="h-20 w-24 object-cover sm:h-24 sm:w-32"
                    onError={(event) => {
                      event.currentTarget.src = fallbackServiceImage;
                    }}
                  />
                </button>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-900">{service.title}</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1.5 text-sm font-bold text-white shadow-lg shadow-rose-600/20">
              <BadgePercent size={16} />
              {OFFER_DISCOUNT_PERCENTAGE}% OFF
            </span>
          </div>
          <p className="text-slate-600">{service.description}</p>
          <Card className="border-rose-100 bg-gradient-to-br from-rose-50 via-white to-amber-50">
            <p className="text-sm font-bold uppercase text-rose-700">Limited celebration offer</p>
            <div className="mt-2 flex flex-wrap items-end gap-3">
              <span className="text-4xl font-black text-slate-950">{formatPrice(specialPrice)}</span>
              <span className="pb-1 text-lg font-semibold text-slate-400 line-through">
                {formatPrice(service.startingPrice)}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                Save {formatPrice(service.startingPrice - specialPrice)}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Every order gets {OFFER_DISCOUNT_PERCENTAGE}% off. Final pricing may vary based on customization and distance.
            </p>
          </Card>
          {service.pricingNote ? <p className="text-sm text-slate-500">{service.pricingNote}</p> : null}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h3 className="font-semibold">Package Inclusions</h3>
              <ul className="mt-2 list-disc pl-5 text-sm">
                {service.packageInclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="font-semibold">Service Highlights</h3>
              <ul className="mt-2 list-disc pl-5 text-sm">
                {service.serviceHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
          {service.addOns?.length ? (
            <Card>
              <h3 className="font-semibold">Optional Add-ons</h3>
              <ul className="mt-2 list-disc pl-5 text-sm">
                {service.addOns.map((item) => (
                  <li key={item.title}>
                    {item.title} - Rs. {item.price.toLocaleString()}
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </section>

        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <Card>
            <h2 className="mb-3 text-xl font-semibold">Enquiry Form</h2>
            <div className="mb-4 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3">
              <p className="text-xs font-bold uppercase text-rose-700">Offer applied</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Special price starts at {formatPrice(specialPrice)}
              </p>
            </div>
            <EnquiryForm defaultDecorationType={service.title} />
          </Card>
        </aside>
      </main>

      {isViewerOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/95 p-3 sm:p-6">
          <button
            type="button"
            onClick={() => setIsViewerOpen(false)}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900"
            aria-label="Close image viewer"
          >
            <X size={18} />
          </button>

          {galleryImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          ) : null}

          <div className="flex h-full items-center justify-center">
            <img
              src={activeImage}
              alt={service.title}
              className="max-h-full max-w-full object-contain"
              onError={(event) => {
                event.currentTarget.src = fallbackServiceImage;
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
