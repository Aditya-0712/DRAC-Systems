const express = require("express");
const app = express();
const BP = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDatabase = require("./utils/database");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const businessRoutes = require("./routes/businessRoutes");

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(BP.urlencoded({extended:true}));
app.use(BP.json());
app.use(cookieParser());
connectToDatabase();

app.use("/api/v1", userRoutes);
app.use("/api/v1", businessRoutes);

app.use((req, res) =>{
    res.status(404).send("Page does not exists");
})

app.listen(process.env.PORT, () =>{
    console.log(`Server running on port ${process.env.PORT}`)
})