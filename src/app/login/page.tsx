import LoginPannel from "@/components/LoginPannel";
import { getSessionData } from "../actions";
import { redirect } from "next/navigation";

async function Login() {
  const session = await getSessionData();

  if (session) {
    return redirect("/");
  }

  return <LoginPannel />;
}

export default Login;
