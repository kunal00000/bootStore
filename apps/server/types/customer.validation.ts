import z from "zod";

export const customer_zod_schema = z
  .object({
    _id: z.string().optional(),
    name: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(4).max(40)
  })
  .strict();

export type Customer = z.infer<typeof customer_zod_schema>;
