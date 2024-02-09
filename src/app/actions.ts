"use server";

import { cookies } from "next/headers";
import CryptoJS from "crypto-js";

interface SessionData {
  name: string;
  value: string;
}

function encrypt(data: SessionData) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), "secret key").toString();
}

export async function decrypt(encryptedData: string) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, "secret key");
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Erro ao descriptografar:", error);
    return null;
  }
}

export async function handleLogin(sessionData: SessionData) {
  const encryptedSessionData = encrypt(sessionData);
  cookies().set("session", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
}

export async function getSessionData() {
  try {
    const encryptedSessionData = cookies().get("session")?.value;
    if (!encryptedSessionData) return;
    return decrypt(encryptedSessionData);
  } catch (error) {
    console.error("Erro ao obter a sessão:", error);
    return null;
  }
}
