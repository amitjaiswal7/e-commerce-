import { z } from "zod";

export const card_validation = z.object({

  productId: z
    .string()
    .min(1, "Product ID is required"),

  quantity: z.coerce
    .number()
    .int()
    .min(1)
    .max(99)
    .default(1),

});