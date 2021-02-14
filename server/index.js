import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import Memes from "./routes/memeRoutes.js";
import path from "path";

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use("/memes", Memes);

// for prodcution as it will make available out frontend as static files so we can run
// frontend on heroku without uploading it elsewhere
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  // it will make available frontend as static files
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")),
  );
} else {
  // base url that lets us see if our api is warking fine
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
