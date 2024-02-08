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
import { useRouter, usePathname } from "next/navigation";
import { formSchema } from "./validation";
import { useFormSubmit } from "@/hooks/useFormSubmit";

function LoginPannel() {
  const router = useRouter();
  const pathName = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const { setError } = form;
  const { onSubmit } = useFormSubmit({
    formSchema,
    router,
    setError,
    pathName,
  });

  return (
    <Form {...form}>
      <div className="flex flex-col w-full items-center h-screen justify-evenly">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Login
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
                  Username utilizado no seu cadastro.
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
                  Email utilizado no seu cadastro.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit">Entrar</Button>
            <Button type="button" onClick={() => router.push("/register")}>
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}

export default LoginPannel;
