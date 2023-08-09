import express from "express";

import {
  getProductByID,
  getProductsOfAllStores
} from "../controllers/product.controllers";

const router = express.Router();

router.route("/").get(getProductsOfAllStores);

router.route("/:product_id").get(getProductByID);

export default router;
