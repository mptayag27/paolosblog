import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import blogPosts from "./routes/blogPosts.routes.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api/blogs", blogPosts);

//const DATABASE_URL= "mongodb+srv://mptayag:0IheWbvs9NGkAmDH@cluster0.hre9x.mongodb.net/?retryWrites=true&w=majority";
const DB_CONNECTION = "mongodb+srv://mptayag:0IheWbvs9NGkAmDH@cluster0.hre9x.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running at: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));
