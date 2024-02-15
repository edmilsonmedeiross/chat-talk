import { InfoChatProvider } from "../contexts/InfoChatContext";
import { RoomsProvider } from "@/contexts/RoomsContext";
import { CreateRoomProvider } from "@/contexts/CreateRoomContext";
import { MobileProvider } from "@/contexts/MobileContext";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MobileProvider>
      <CreateRoomProvider>
        <RoomsProvider>
          <InfoChatProvider>{children}</InfoChatProvider>
        </RoomsProvider>
      </CreateRoomProvider>
    </MobileProvider>
  );
}
