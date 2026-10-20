import {z} from "zod";
export const user_validation = z.object({
  username: z.string().min(3, "Name should be more than 3 characters").max(30, "Name cannot exceed 30 characters"),

  email: z.email("Enter valid email"),
   number: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number cannot exceed 15 digits")
    .or(z.literal("")).optional(),

  city: z.string().min(2, "Enter valid city").max(150, "City cannot exceed 150 characters").or(z.literal("")).optional(),

  address: z.string().min(2, "Address must be at least 2 characters").max(600, "Address cannot exceed 600 characters")
    .or(z.literal("")).optional(),

  pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits").or(z.literal("")).optional(),
  image: z.instanceof(File).nullable().optional()
});

//  banner image ****************************************************************************************************************
export const bannerSchema = z.object({
  id: z.union([
    z.string(),
    z.number(),
  ]),

  contentType: z.string().min(1, "Content type is required"),

  image: z.string().min(1, "Banner image is required"),
});
export const bannerList = z.array(bannerSchema);


// Upperbar*****************************************************************************************************************************

export  const upperbar_validation = z.object({
  text: z.string()
})