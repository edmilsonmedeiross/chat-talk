"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import CreateRoom from "../CreateRoom";
import { getRoomsToLocalStorage } from "@/lib/utils";
import { FaLock } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ConfirmationModal from "../ConfirmationModal";

interface Props {
  rooms: any[];
  setRooms: (rooms: any[]) => void;
}

function RoonsList({ rooms, setRooms }: Props) {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomClick = (room) => {
    if (room.isPrivate) {
      setSelectedRoom(room);
    } else {
      router.push(`/room/${room.id}`);
    }
  };

  return (
    <aside className="flex flex-col items-center justify-between p-4 gap-3 w-full max-w-72 h-full bg-[#619ee2]">
      <h2 className="m-4 font-semibold">Salas</h2>
      <nav className="flex flex-col gap-3 w-full max-w-72">
        {rooms?.map((room) => (
          <Button
            variant={"default"}
            key={room.id}
            onClick={() => handleRoomClick(room)}
            className="flex gap-3 items-center justify-center bg-green-800"
          >
            {room.name} {room.isPrivate && <FaLock />}
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

      <CreateRoom setRooms={setRooms} roomsToRender={rooms} />
    </aside>
  );
}

export default RoonsList;
