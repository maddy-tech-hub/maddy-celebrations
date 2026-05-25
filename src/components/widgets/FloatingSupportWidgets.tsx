import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, PhoneCall } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";

const callbackSchema = z.object({
  name: z.string().min(2, "Name is required"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Enter valid 10 digit number"),
  preferredTime: z.string().min(2, "Preferred time is required"),
});

type CallbackFormData = z.infer<typeof callbackSchema>;

export const FloatingSupportWidgets = () => {
  const [open, setOpen] = useState(false);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE || "919000090000";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Maddy Celebrations, I need decoration service details.")}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackSchema),
  });

  const onSubmit = (data: CallbackFormData) => {
    console.log("Callback Request Payload:", data);
    setOpen(false);
    reset();
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:bottom-5 sm:right-6">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/35 transition hover:bg-emerald-700 sm:px-4"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-600/35 transition hover:bg-rose-700 sm:px-4"
        >
          <PhoneCall size={18} />
          Request Callback
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-xl font-semibold text-slate-900">Request Callback</h3>
        <p className="mt-1 text-sm text-slate-600">We will call you shortly to collect event details.</p>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input placeholder="Name" {...register("name")} />
            {errors.name ? <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p> : null}
          </div>
          <div>
            <Input placeholder="Mobile Number" {...register("mobileNumber")} />
            {errors.mobileNumber ? <p className="mt-1 text-xs text-rose-600">{errors.mobileNumber.message}</p> : null}
          </div>
          <div>
            <Input placeholder="Preferred Time (example: 6 PM - 8 PM)" {...register("preferredTime")} />
            {errors.preferredTime ? <p className="mt-1 text-xs text-rose-600">{errors.preferredTime.message}</p> : null}
          </div>
          <Button type="submit" className="w-full">
            Send Request
          </Button>
        </form>
      </Modal>
    </>
  );
};
