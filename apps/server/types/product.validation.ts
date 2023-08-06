import z from "zod";

export const product_zod_schema = z
  .object({
    _id: z.string().uuid().optional(),
    name: z.string().min(1).max(60),
    description: z.string().min(1).max(200),
    imageUrl: z.string().url(),
    price: z.number().positive(),
    quantity: z.number().int().positive()
  })
  .strict();

export type Product = z.infer<typeof product_zod_schema>;
