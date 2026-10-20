import { z } from "zod";

export const user_detail_update_validation_beckend = z.object({
  name: z.string()
    .min(3, "Name should be at least 3 characters")
    .max(30, "Name cannot exceed 30 characters")
    .optional(),

  email: z.email("Enter a valid email").optional(),

  number: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .or(z.literal(""))
    .optional(),

  city: z.string()
    .min(2, "Enter a valid city")
    .max(150, "City cannot exceed 150 characters")
    .or(z.literal(""))
    .optional(),

  address: z.string()
    .min(2, "Address must be at least 2 characters")
    .max(600, "Address cannot exceed 600 characters")
    .or(z.literal(""))
    .optional(),

  pincode: z.string()
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .or(z.literal(""))
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "Provide at least one field to update" }
);