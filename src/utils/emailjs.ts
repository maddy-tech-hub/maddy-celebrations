import emailjs from "@emailjs/browser";

export interface EnquiryEmailPayload {
  [key: string]: string;
  name: string;
  mobileNumber: string;
  email: string;
  eventDate: string;
  city: string;
  eventAddress: string;
  decorationType: string;
  additionalNotes: string;
  inquiryId: string;
  submittedAt: string;
  servicePageUrl: string;
  emailSubjectAdmin: string;
  emailSubjectCustomer: string;
}

export const sendEnquiryEmail = async (payload: EnquiryEmailPayload) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS config missing. Add service, template, and public key.");
  }

  return emailjs.send(serviceId, templateId, payload, { publicKey });
};
