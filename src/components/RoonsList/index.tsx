"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import CreateRoom from "../CreateRoom";
import { FaLock } from "react-icons/fa";
import ConfirmationModal from "../ConfirmationModal";
import { RoomsContextType, useRoomsContext } from "@/contexts/RoomsContext";
import {
  CreateRoomContextType,
  useCreateRommContext,
} from "@/contexts/CreateRoomContext";
import { MobileContextType, useMobileContext } from "@/contexts/MobileContext";
import { IoClose } from "react-icons/io5";

type Room = {
  id: string;
  name: string;
  isPrivate: "private" | "public";
  password?: string;
};

function RoonsList() {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { rooms, setRooms } = useRoomsContext() as RoomsContextType;
  const { isMobile, setIsMobile } = useMobileContext() as MobileContextType;
  const { isCreating, setIsCreating } =
    useCreateRommContext() as CreateRoomContextType;

  const handleRoomClick = (room: Room) => {
    if (room.isPrivate === "private") {
      setSelectedRoom(room);
    } else {
      router.push(`/room/${room.id}`);
      setIsMobile(false);
    }
  };

  return (
    <>
      <aside className="flex flex-col items-center justify-between p-4 gap-3 w-full max-w-72 h-full bg-[#619ee2] max-md:hidden">
        <h2 className="m-4 font-semibold">Salas</h2>
        <nav className="flex flex-col gap-3 w-full max-w-72">
          {rooms?.map((room) => (
            <Button
              variant={"default"}
              key={room.id}
              onClick={() => handleRoomClick(room)}
              className="flex gap-3 items-center justify-center bg-green-800"
            >
              {room.name} {room.isPrivate === "private" && <FaLock />}
            </Button>
          ))}
        </nav>
        {selectedRoom && (
          <ConfirmationModal
            isOpen={Boolean(selectedRoom)}
            onClose={() => setSelectedRoom(null)}
            room={selectedRoom}
          />
        )}
        <Button variant={"default"} onClick={() => setIsCreating(!isCreating)}>
          Nova Sala
        </Button>
      </aside>
      {isCreating && <CreateRoom setRooms={setRooms} roomsToRender={rooms} />}
      {isMobile && (
        <aside className="absolute flex flex-col items-center justify-center gap-3 w-full h-screen bg-[#619ee2]">
          <nav className="flex flex-col gap-3 w-full max-w-72">
            {rooms?.map((room) => (
              <Button
                variant={"default"}
                key={room.id}
                onClick={() => handleRoomClick(room)}
                className="flex gap-3 items-center justify-center bg-green-800"
              >
                {room.name} {room.isPrivate === "private" && <FaLock />}
              </Button>
            ))}
          </nav>
          {selectedRoom && (
            <ConfirmationModal
              isOpen={Boolean(selectedRoom)}
              onClose={() => setSelectedRoom(null)}
              room={selectedRoom}
            />
          )}
          <div className="absolute bottom-4 flex gap-4">
            <Button
              variant={"default"}
              onClick={() => setIsCreating(!isCreating)}
            >
              Nova Sala
            </Button>
            <Button
              className="font-semibold text-base"
              variant={"link"}
              onClick={() => {
                router.push("/");
                setIsCreating(!isCreating);
              }}
            >
              Home
            </Button>
          </div>
          <IoClose
            onClick={() => {
              setIsMobile(false);
            }}
            className="text-2xl absolute top-4 right-4"
          />
        </aside>
      )}
    </>
  );
}

export default RoonsList;
