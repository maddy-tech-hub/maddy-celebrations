import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export const NotFoundPage = () => (
  <main className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
    <h1 className="text-4xl font-bold text-slate-900">404</h1>
    <p className="mt-3 text-slate-600">Page not found.</p>
    <Link to="/" className="mt-5">
      <Button>Back Home</Button>
    </Link>
  </main>
);
