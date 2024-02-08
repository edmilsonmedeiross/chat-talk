import { z } from "zod";

export const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username precisa ter no mínimo 2 caracteres.",
    }),
    email: z.string().email({
      message: "Email inválido.",
    }),
    repeatEmail: z.string().email({
      message: "Email inválido.",
    }),
  })
  .refine((data) => data.email === data.repeatEmail, {
    message: "Emails não são iguais",
    path: ["repeatEmail"],
  });
