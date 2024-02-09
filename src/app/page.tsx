import { getSessionData } from "./actions";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";

export default async function Home() {
  const sessionData = await getSessionData();
  if (!sessionData) {
    redirect("/login");
  }
  return (
    <div>
      <main></main>
      <SideBar />
    </div>
  );
}
