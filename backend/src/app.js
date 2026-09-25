const express = require('express');
const cookieParser = require("cookie-parser");
const authrouter = require('./routes/auth.routes');
const interviewRouter = require("./routes/interview.routes")
const cors = require("cors")



const app = express();
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))


//routes 
app.use("/api/auth", authrouter);
app.use("/api/interview", interviewRouter);





module.exports = app;