import z from "zod";

export const owner_zod_schema = z
  .object({
    _id: z.string().optional(),
    name: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(4).max(40),
    stores: z.array(z.string().uuid())
  })
  .strict();

export type Owner = z.infer<typeof owner_zod_schema>;
