import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { PORT } from "./config";
import { connectDB } from "./db";
import customerRouter from "./routes/customer.routes";
import ownerRouter from "./routes/owner.routes";
import storeRouter from "./routes/store.routes";

const app = express();

// global middlewares
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// * routes
app.use("/api/customer", customerRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/store", storeRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
