import RegisterPannel from "@/components/RegisterPannel";
import React from "react";
import { getSessionData } from "../actions";
import { redirect } from "next/navigation";

async function Register() {
  const session = await getSessionData();

  if (session) {
    return redirect("/");
  }

  return <RegisterPannel />;
}

export default Register;
