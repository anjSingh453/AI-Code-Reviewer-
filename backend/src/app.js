const express = require("express");
const aiRoute = require("./routes/aiRoute");
const cors = require("cors");

const app = express();

app.get("/" , (req , res)=>{
    res.send("Hello world");
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/ai" , aiRoute);

module.exports =  app;