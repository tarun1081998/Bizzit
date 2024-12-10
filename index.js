const express = require("express");
require("dotenv").config()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");

const PORT = process.env.PORT
const app = express()
app.use(bodyParser.json())
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to mongodb ")
})
.catch((err)=>{
    console.log("error connecting to mongo: "+err)
})

//socket setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow the playground's domain
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: false
    },
    transports: ['websocket', 'polling']
});
require('./src/sockets/chat.socket')(io);

app.get("/",(req,res)=>{
    res.send("hello")
})

//auth routes
const authRoutes = require("./src/routes/auth.routes")
app.use("/api/auth", authRoutes)

//user routes
const userRoutes = require("./src/routes/user.routes")
app.use("/api/users", userRoutes)

//service provider routes
const serviceProviderRoutes = require("./src/routes/serviceProvider.routes")
app.use("/api/service-provider", serviceProviderRoutes)

//chat routes
const chatRoutes = require("./src/routes/chat.route")
app.use("/api/chat", chatRoutes)

server.listen(PORT, ()=>{
    console.log("server is listening to "+PORT)
})