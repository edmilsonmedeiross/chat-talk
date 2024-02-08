import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username precisa ter no mínimo 2 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
});
