import mongoose from "mongoose";

const owner_db_schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

export const OwnerModel = mongoose.model("owner", owner_db_schema);
