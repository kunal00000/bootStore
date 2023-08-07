import mongoose from "mongoose";

const product_db_schema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  price: Number,
  quantity: Number
});

export const ProductModel = mongoose.model("product", product_db_schema);
