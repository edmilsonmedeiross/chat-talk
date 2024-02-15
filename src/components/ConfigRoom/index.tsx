"use client";
import {
  InfoChatContextType,
  useInfoChatContext,
} from "@/contexts/InfoChatContext";
import { RoomsContextType, useRoomsContext } from "@/contexts/RoomsContext";
import { setRoomsToLocalStorage } from "@/lib/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type RoomProps = {
  id: string;
  name: string;
  isPrivate: "public" | "private";
  password?: string;
};

type DataProps = {
  roomName: string;
  roomType: "public" | "private";
  roomPassword: string;
};

function ConfigRoom({ id }: { id: string }) {
  const formSchema = z
    .object({
      roomName: z
        .string()
        .min(3, "Nome da precisa ter no mínimo 3 caracteres."),
      roomType: z.string().min(3, "Selecione um tipo de sala."),
      roomPassword: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.roomType === "public") {
          return true;
        }
        return data.roomPassword && data.roomPassword.length >= 6;
      },
      {
        message: "Utilize no mínimo 6 caracteres",
        path: ["roomPassword"],
      }
    );

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const { watch } = form;
  const isPrivate = watch("roomType") === "private";
  const { isUpdate, setIsUpdate } = useInfoChatContext() as InfoChatContextType;
  const { rooms, setRooms } = useRoomsContext() as RoomsContextType;

  function onSubmit() {
    const data = watch() as DataProps;
    const isPrivate = data.roomType;
    const newRoom: RoomProps = {
      id: id,
      name: data.roomName,
      isPrivate,
    };

    if (isPrivate) {
      newRoom.password = data.roomPassword;
    }

    const newRooms = rooms.map((room) => {
      if (room.id === id) {
        return newRoom;
      }
      return room;
    });

    setRoomsToLocalStorage(newRooms);
    setRooms(newRooms);
    setIsUpdate(false);
  }

  return (
    <>
      {isUpdate && (
        <Card className="absolute w-full max-w-md bottom-1/3 left-1/4 p-2 max-md:w-full max-sm:max-w-72 max-md:top-auto max-md:left-auto bg-gray-300">
          <CardContent>
            <CardDescription className="m-3 text-center">
              Configurações da Sala
            </CardDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name="roomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Sala</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomType"
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
                <div className="max-sm:w-full">
                  {isPrivate && (
                    <FormField
                      control={form.control}
                      name="roomPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha da Sala</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="flex mt-3">
                  <Button type="submit">Salvar</Button>
                  <Button variant={"link"} onClick={() => setIsUpdate(false)}>
                    Fechar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ConfigRoom;
