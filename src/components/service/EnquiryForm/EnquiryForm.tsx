import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

export const EnquiryForm: React.FC<{ defaultDecorationType: string; onSubmitEnquiry?: (payload: FormData) => void }> = ({
  defaultDecorationType,
  onSubmitEnquiry,
}) => {
  const [submitFeedback, setSubmitFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { decorationType: defaultDecorationType, city: cities[0] },
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      additionalNotes: data.additionalNotes?.trim() || "No additional notes provided",
      inquiryId: `MC-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      servicePageUrl: window.location.href,
      emailSubjectAdmin: `New Decoration Inquiry - ${data.decorationType}`,
      emailSubjectCustomer: "We Received Your Inquiry - Maddy Celebrations",
    };

    console.log("Enquiry Payload:", payload);
    onSubmitEnquiry?.(data);

    try {
      await sendEnquiryEmail(payload);
      setSubmitFeedback({ type: "success", message: "Enquiry submitted successfully. Our team will contact you soon." });
      reset({ decorationType: defaultDecorationType, city: cities[0] });
    } catch (error) {
      console.error("Email submit failed:", error);
      setSubmitFeedback({
        type: "error",
        message: "Unable to send enquiry now. Please verify EmailJS config and try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input placeholder="Name" {...register("name")} />
      <Input placeholder="Mobile Number" {...register("mobileNumber")} />
      <Input placeholder="Email" {...register("email")} />
      <Input type="date" {...register("eventDate")} />
      <Select {...register("city")}>{cities.map((city) => <option key={city}>{city}</option>)}</Select>
      <Input placeholder="Event Address" {...register("eventAddress")} />
      <Input placeholder="Decoration Type" {...register("decorationType")} />
      <Input placeholder="Additional Notes" {...register("additionalNotes")} />
      {Object.keys(errors).length > 0 ? <p className="text-xs text-rose-600">Please fill all fields correctly.</p> : null}
      {submitFeedback ? (
        <p className={`text-xs ${submitFeedback.type === "success" ? "text-emerald-700" : "text-rose-700"}`}>
          {submitFeedback.message}
        </p>
      ) : null}
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
      </Button>
    </form>
  );
};
