import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import FileRoute from "./routes/files.js"
import Showroute from "./routes/Showroute.js"
import DownloadRoute from "./routes/Download.js"
import helmet from "helmet";
import cors from "cors";
import path, { dirname } from "path"
import { fileURLToPath } from "url";

// appsetup
const app = express();

// configs
dotenv.config();
connectDB();



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

const PORT =process.env.PORT || 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Set the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "./public")));

// routes
app.use('/asscets', express.static(path.join(__dirname, './asscets')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use("/api/files",FileRoute);
app.use("/files",Showroute)
app.use("/files/download",DownloadRoute);


app.use(express.static(path.join(__dirname,"../frontend/dist")))



app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist","index.html"))
})

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
});
