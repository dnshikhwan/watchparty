import http from "http";
import { logger } from "../helpers/log.helper";
import { Server } from "socket.io";

let io: Server;

export const socketInit = (server: http.Server) => {
  logger.info("Initializing Socket.io");

  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("send_message", (data) => {
      // broadcast to all connected users
      io.emit("receive_message", data.message);
    });
  });

  logger.info("Socket.io initialized");
};

export const getSocket = () => {
  if (!io) {
    return logger.error("Error getting io instance");
  }
  return io;
};
