"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import CreateRoom from "../CreateRoom";
import { getRoomsToLocalStorage } from "@/lib/utils";
import { FaLock } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ConfirmationModal from "../ConfirmationModal";

interface Props {
  rooms: any[];
}

function RoonsList({ rooms }: Props) {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomsToRender, setRooms] = useState<any[]>(
    getRoomsToLocalStorage(rooms)
  );

  const handleRoomClick = (room) => {
    if (room.isPrivate) {
      setSelectedRoom(room);
    } else {
      router.push(`/room/${room.id}`);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-screen max-w-72">
      <h2>Salas</h2>
      <nav className="flex flex-col gap-3 w-screen max-w-72">
        {roomsToRender.map((room) => (
          <>
            <Button
              key={room.id}
              onClick={() => handleRoomClick(room)}
              className="flex gap-3 items-center justify-center"
            >
              {room.name} {room.isPrivate && <FaLock />}
            </Button>
          </>
        ))}
      </nav>
      {selectedRoom && (
        <ConfirmationModal
          isOpen={Boolean(selectedRoom)}
          onClose={() => setSelectedRoom(null)}
          room={selectedRoom}
        />
      )}
      <CreateRoom setRooms={setRooms} roomsToRender={roomsToRender} />
    </div>
  );
}

export default RoonsList;
