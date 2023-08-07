import mongoose from "mongoose";

const store_db_schema = new mongoose.Schema({
  name: String,
  description: String,
  logoUrl: String,
  address: String,
  contactEmail: String,
  contactPhone: String,
  products: [{ type: mongoose.SchemaTypes.ObjectId, ref: "product" }]
});

export const StoreModel = mongoose.model("store", store_db_schema);
