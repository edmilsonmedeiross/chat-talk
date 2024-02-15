"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { formSchema } from "./validation";

function RegisterPannel() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      repeatEmail: "",
    },
  });

  const { setError } = form;
  const pathName = usePathname();

  const { onSubmit } = useFormSubmit({
    formSchema,
    router,
    setError,
    pathName,
  });

  return (
    <Form {...form}>
      <div className="flex flex-col w-full items-center h-screen justify-evenly">
        <h1>
          <span className="font-extrabold text-4xl">
            <span className="text-green-500">Chat</span>
            <span>-</span>
            <span className="text-purple-500">Talk</span>
          </span>
        </h1>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Cadastrar
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  Este será o nome mostrado no seu perfil.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>
                  Este email será usado para entrar na sua conta.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>Digite novamente seu email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit">Cadastrar</Button>
            <Button type="button" onClick={() => router.push("/login")}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}

export default RegisterPannel;
