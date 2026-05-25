import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { carouselSlides } from "../../../data/carousel";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "100%" : "-100%",
  }),
  center: {
    x: "0%",
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? "-100%" : "100%",
  }),
};

export const HeroSection = () => {
  const [[activeIndex, direction], setCarouselState] = useState<[number, number]>([0, 1]);
  const activeSlide = useMemo(() => carouselSlides[activeIndex], [activeIndex]);

  const totalSlides = carouselSlides.length;
  const goNext = () => {
    setCarouselState(([current]) => [(current + 1) % totalSlides, 1]);
  };
  const goPrev = () => {
    setCarouselState(([current]) => [(current === 0 ? totalSlides - 1 : current - 1), -1]);
  };
  const goTo = (index: number) => {
    if (index === activeIndex) return;
    setCarouselState([index, index > activeIndex ? 1 : -1]);
  };

  useEffect(() => {
    carouselSlides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCarouselState(([current]) => [(current + 1) % totalSlides, 1]);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [totalSlides]);

  return (
    <section className="mx-auto max-w-[1320px] px-4 sm:px-6">
      <div className="relative aspect-[18/5] w-full overflow-hidden rounded-3xl bg-slate-900">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.img
            key={activeSlide.id}
            custom={direction}
            variants={slideVariants}
            src={activeSlide.image}
            alt={activeSlide.title}
            className="absolute inset-0 h-full w-full object-cover"
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { duration: 0.45, ease: "easeInOut" } }}
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow hover:bg-white sm:left-3"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow hover:bg-white sm:right-3"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute right-3 top-3 z-10 rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold text-white">
          {activeIndex + 1}/{carouselSlides.length}
        </div>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
          {carouselSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition ${index === activeIndex ? "w-7 bg-white" : "w-2 bg-white/55"}`}
              aria-label={`Go to ${slide.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
