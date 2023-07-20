const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors"); 
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", //put the origin of req CRA-3000 Vite-5173
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`user connected : ${socket.id}`);

  socket.on("join_room", (room)=>{
    socket.join(room) 
    // console.log(`user with id : ${socket.id} joined room ${data}`);
  })

    // send the received msg to the room
  socket.on("send_message", (data)=>{
    socket.to(data.room).emit("receive_message", data)
  })

  // socket.on("disconnect", () => {
  //   console.log(`user disconnected : ${socket.id}`);
  // });
});

const port = 3001;

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
