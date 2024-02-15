"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MobileContextType, useMobileContext } from "@/contexts/MobileContext";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  room: {
    id: string;
    name: string;
    isPrivate: "private" | "public";
    password?: string;
  };
};

function ConfirmationModal({ isOpen, onClose, room }: ConfirmationModalProps) {
  const router = useRouter();
  const { isMobile, setIsMobile } = useMobileContext() as MobileContextType;

  const FormSchema = z.object({
    password: z.string().min(3, "Senha precisa ter no mínimo 3 caracteres."),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(
      FormSchema.refine(
        (data) => {
          if (room.isPrivate === "private") {
            return data.password === room.password;
          }
          return true;
        },
        { message: "Senha incorreta", path: ["password"] }
      )
    ),
  });

  const { watch, reset } = form;
  const onSubmit = () => {
    const password = watch("password");

    if (password === room.password) {
      router.push(`/room/${room.id}`);
      reset();
      onClose();
      setIsMobile(false);
    }
  };

  return isOpen ? (
    <Card className="absolute bottom-1/3 left-1/4 p-2 max-md:w-full max-md:top-auto max-md:left-auto max-md:max-w-80">
      <CardContent>
        <CardDescription className="m-3">
          Essa sala é privada, por favor, insira a senha para acessar.
        </CardDescription>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Entrar</Button>
          </Form>
        </form>
      </CardContent>
      <CardFooter>
        <button onClick={onClose}>Fechar</button>
      </CardFooter>
    </Card>
  ) : null;
}

export default ConfirmationModal;
