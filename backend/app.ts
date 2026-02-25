import express from "express";
import dashboardRoute from "@/src/routes/dashboard"
import cors from "cors"
import dotev from "dotenv"
dotev.config()
const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use("/api", dashboardRoute);

export default app;