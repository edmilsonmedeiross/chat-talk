"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { setRoomsToLocalStorage } from "@/lib/utils";
import {
  CreateRoomContextType,
  useCreateRommContext,
} from "@/contexts/CreateRoomContext";

type DataProps = {
  roomName: string;
  isPrivate: "private" | "public";
  password?: string | number;
};

type RoomProps = {
  id: string;
  name: string;
  isPrivate: "private" | "public";
  password?: string | number;
};

function CreateRoom({ setRooms, roomsToRender }: any) {
  const { setIsCreating } = useCreateRommContext() as CreateRoomContextType;
  const formSchema = z
    .object({
      roomName: z
        .string()
        .min(3, "Nome da precisa ter no mínimo 3 caracteres."),
      isPrivate: z.union([z.literal("private"), z.literal("public")]),
      password: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.isPrivate === "public") {
          return true;
        }
        return data.password && data.password.length >= 6;
      },
      {
        message: "Utilize no mínimo 6 caracteres",
        path: ["password"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      isPrivate: "public",
      password: "",
    },
  });

  function onSubmit(data: DataProps) {
    const newRoom: RoomProps = {
      id: String(roomsToRender.length + 1),
      name: data.roomName,
      isPrivate: data.isPrivate,
    };

    if (data.isPrivate === "private") {
      newRoom.password = data.password;
    }

    console.log(newRoom);

    setRooms([...roomsToRender, newRoom]);
    setRoomsToLocalStorage([...roomsToRender, newRoom]);
    form.reset();
    setIsCreating(false);
  }

  const { watch } = form;

  return (
    <Card className="absolute top-1/3 left-1/3 flex flex-col gap-2 z-50 max-md:top-1/3 max-md:left-auto max-md:w-full">
      <CardHeader>
        <CardTitle>Criar nova sala</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="roomName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da sala</FormLabel>
                  <FormControl>
                    <Input placeholder="nome da sala" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nome que será mostrado na lista de salas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Privacidade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="top-1/3 left-auto">
                      <SelectTrigger>
                        <SelectValue></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="private">Privada</SelectItem>
                      <SelectItem value="public">Publica</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {watch("isPrivate") === "private" && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel>Senha da sala</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="senha da sala"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A senha será necessária para entrar na sala.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex gap-2 mt-3">
              <Button type="submit">Criar sala</Button>
              <Button variant="link" onClick={() => setIsCreating(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateRoom;
