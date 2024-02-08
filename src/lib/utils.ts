import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setUserToLocalStorage(user: {
  username: string;
  email: string;
}) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function removeUserFromLocalStorage() {
  localStorage.removeItem("user");
}

export function isUserLoggedIn() {
  return !!getUserFromLocalStorage();
}

export function getUsersFromLocalStorage() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

export function setUsersToLocalStorage(user: {
  username: string;
  email: string;
}) {
  const users = getUsersFromLocalStorage();
  localStorage.setItem("users", JSON.stringify([...users, user]));
}

export function userExists(data: { username: string; email: string }) {
  const users = getUsersFromLocalStorage();
  return users.some(
    (user: { username: string; email: string }) =>
      user.username === data.username && user.email === data.email
  );
}

export function usernameOrEmailExists(data: {
  username: string;
  email: string;
}) {
  const users = getUsersFromLocalStorage();
  return users.some(
    (user: { username: string; email: string }) =>
      user.username === data.username || user.email === data.email
  );
}
