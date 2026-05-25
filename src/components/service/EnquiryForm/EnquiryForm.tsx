import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cities } from "../../../data/cities";
import { sendEnquiryEmail } from "../../../utils/emailjs";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";

const schema = z.object({
  name: z.string().min(2),
  mobileNumber: z.string().regex(/^\d{10}$/),
  email: z.string().email(),
  eventDate: z.string().min(1),
  city: z.string().min(1),
  eventAddress: z.string().min(8),
  decorationType: z.string().min(2),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const getSubmittedAtInIst = () =>
  `${new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Kolkata",
  }).format(new Date())} IST`;

export const EnquiryForm: React.FC<{ defaultDecorationType: string; onSubmitEnquiry?: (payload: FormData) => void }> = ({
  defaultDecorationType,
  onSubmitEnquiry,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { decorationType: defaultDecorationType, city: cities[0] },
  });

  useEffect(() => {
    if (!showSuccess) return undefined;

    const timer = window.setTimeout(() => {
      setShowSuccess(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [showSuccess]);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    const payload = {
      ...data,
      additionalNotes: data.additionalNotes?.trim() || "No additional notes provided",
      inquiryId: `SG-${Date.now()}`,
      submittedAt: getSubmittedAtInIst(),
      servicePageUrl: window.location.href,
      emailSubjectAdmin: `New Decoration Inquiry - ${data.decorationType}`,
      emailSubjectCustomer: "We Received Your Inquiry - Seven Gala",
    };

    console.log("Enquiry Payload:", payload);
    onSubmitEnquiry?.(data);

    try {
      await sendEnquiryEmail(payload);
      reset({ decorationType: defaultDecorationType, city: cities[0] });
      setShowSuccess(true);
    } catch (error) {
      console.error("Email submit failed:", error);
      setSubmitError("Unable to send enquiry now. Please verify EmailJS config and try again.");
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-7 text-center shadow-sm"
      >
        <motion.div
          initial={{ scale: 0.6, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-emerald-600 shadow-lg shadow-emerald-600/15"
        >
          <CheckCircle2 size={54} strokeWidth={1.8} />
        </motion.div>
        <h3 className="mt-5 text-xl font-bold text-slate-950">Thank you for your enquiry</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
          We received your celebration details. Our team will review your request and contact you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {submitError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {submitError}
        </div>
      ) : null}
      <Input placeholder="Name" {...register("name")} />
      <Input placeholder="Mobile Number" {...register("mobileNumber")} />
      <Input placeholder="Email" {...register("email")} />
      <Input type="date" {...register("eventDate")} />
      <Select {...register("city")}>{cities.map((city) => <option key={city}>{city}</option>)}</Select>
      <Input placeholder="Event Address" {...register("eventAddress")} />
      <Input placeholder="Decoration Type" {...register("decorationType")} />
      <Input placeholder="Additional Notes" {...register("additionalNotes")} />
      {Object.keys(errors).length > 0 ? <p className="text-xs text-rose-600">Please fill all fields correctly.</p> : null}
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
      </Button>
    </form>
  );
};
