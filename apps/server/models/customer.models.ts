import mongoose from "mongoose";

const customer_db_schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

export const Customer = mongoose.model("customer", customer_db_schema);
