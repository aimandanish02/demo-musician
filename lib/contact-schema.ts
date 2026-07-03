import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(4000, "Message is too long"),
  turnstileToken: z.string().min(1, "Verification token missing"),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Name deliberately avoids "company"/"website"/"url" to dodge autofill false positives. */
export const HONEYPOT_FIELD = "subjectRef";
