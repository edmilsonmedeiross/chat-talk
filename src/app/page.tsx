import { getSessionData } from "./actions";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import UserInfo from "@/components/UserInfo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function Home() {
  const sessionData = await getSessionData();

  if (!sessionData) {
    redirect("/login");
  }

  return (
    <div>
      <Header />
      <div className="flex justify-between w-full h-[calc(100vh-15rem)]">
        <main className="flex flex-grow">
          <UserInfo />
        </main>
        <SideBar />
      </div>
      <Footer />
    </div>
  );
}
