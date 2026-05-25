import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cities } from "../../../data/cities";
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
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { decorationType: defaultDecorationType, city: cities[0] },
  });

  const onSubmit = (data: FormData) => {
    console.log("Enquiry Payload:", data);
    onSubmitEnquiry?.(data);
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
      {Object.keys(formState.errors).length > 0 ? <p className="text-xs text-rose-600">Please fill all fields correctly.</p> : null}
      <Button className="w-full" type="submit">Submit Enquiry</Button>
    </form>
  );
};
