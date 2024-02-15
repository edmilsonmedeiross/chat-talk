"use client";
import {
  InfoChatContextType,
  useInfoChatContext,
} from "@/contexts/InfoChatContext";
import { IoSettingsOutline, IoClose } from "react-icons/io5";
import { RoomsContextType, useRoomsContext } from "@/contexts/RoomsContext";

function InfoRoom({ roomId }: { roomId: string }) {
  const { isUpdate, setIsUpdate } = useInfoChatContext() as InfoChatContextType;
  const { rooms } = useRoomsContext() as RoomsContextType;

  const room = rooms.find((room) => room.id === roomId);

  return (
    <div className="flex items-center gap-3 mb-8">
      <h1 className="text-3xl">{room?.name}</h1>
      <div className="absolute top-40 right-72 cursor-pointer text-2xl m-2 max-md:top-40 max-md:right-2">
        {isUpdate ? (
          <IoClose
            onClick={() => {
              setIsUpdate(false);
            }}
          />
        ) : (
          <IoSettingsOutline
            onClick={() => {
              setIsUpdate(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default InfoRoom;
