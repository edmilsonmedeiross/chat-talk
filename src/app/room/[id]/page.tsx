import { getSessionData } from "@/app/actions";
import ChatPannel from "@/components/ChatPannel";
import ConfigRoom from "@/components/ConfigRoom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfoRoom from "@/components/InfoRoom";
import SideBar from "@/components/SideBar";
import React from "react";

async function DetailPage({ params }: { params: { id: string } }) {
  const user = await getSessionData();
  const { id } = params;

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-15rem)] flex justify-between">
        <div className="w-full flex flex-col items-center justify-center">
          <h1></h1>
          <InfoRoom roomId={id} />
          <ConfigRoom id={id} />
          <ChatPannel user={user} />
        </div>
        <SideBar />
      </div>
      <Footer />
    </>
  );
}

export default DetailPage;
