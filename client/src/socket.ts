import { io } from "socket.io-client";

const URL =
  import.meta.env.MODE === "production"
    ? undefined
    : import.meta.env.BACKEND_URL;

export const socket = io(URL, {
  autoConnect: false,
});
