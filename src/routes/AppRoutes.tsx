import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "../components/ui/Loader";

const HomePage = lazy(() => import("../pages/HomePage/HomePage").then((m) => ({ default: m.HomePage })));
const ServiceDetailsPage = lazy(() =>
  import("../pages/ServiceDetailsPage/ServiceDetailsPage").then((m) => ({ default: m.ServiceDetailsPage })),
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

export const AppRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/:slug" element={<ServiceDetailsPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </Suspense>
);
