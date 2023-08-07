import z from "zod";

import { product_zod_schema } from "./product.validation";

export const store_zod_schema = z
  .object({
    _id: z.string().uuid().optional(),
    name: z.string().min(1).max(60),
    description: z.string().min(1).max(200),
    logoUrl: z.string().url(),
    address: z.string().url(),
    contactEmail: z.string().email(),
    contactPhone: z.string().max(10),
    products: z.array(z.string().uuid())
  })
  .strict();

export type Store = z.infer<typeof store_zod_schema>;
