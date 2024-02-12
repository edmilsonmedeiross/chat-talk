"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { setRoomsToLocalStorage } from "@/lib/utils";

function CreateRoom({ setRooms, roomsToRender }: any) {
  const formSchema = z.object({
    roomName: z.string().min(3, "Nome da precisa ter no mínimo 3 caracteres."),
    isPrivate: z.boolean(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      isPrivate: false,
    },
  });

  function onSubmit(data: any) {
    const newRoom = {
      id: roomsToRender.length + 1,
      name: data.roomName,
      isPrivate: data.isPrivate,
      messages: [],
    };
    setRooms([...roomsToRender, newRoom]);
    setRoomsToLocalStorage([...roomsToRender, newRoom]);

    form.reset();
  }

  const { register } = form;

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"default"}>Nova sala</Button>
      </PopoverTrigger>
      <PopoverContent>
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
                <FormItem>
                  <FormLabel htmlFor="isPrivate">Sala privada</FormLabel>
                  <FormControl>
                    <input
                      id="isPrivate"
                      type="checkbox"
                      {...register("isPrivate")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Criar sala</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

export default CreateRoom;
