import express from "express";

import {
  createProduct,
  deleteProduct
} from "../controllers/product.controllers";
import {
  createStore,
  deleteStore,
  getAllStores,
  getStoreByID
} from "../controllers/store.constrollers";
import { authenticate } from "../middlewares/auth.midlewares";

const router = express.Router();

router.route("/").get(getAllStores).post(authenticate, createStore);

router
  .route("/:store_id")
  .get(authenticate, getStoreByID)
  .delete(authenticate, deleteStore);

router.route("/:store_id/product").post(authenticate, createProduct);
router
  .route("/:store_id/product/:product_id")
  .delete(authenticate, deleteProduct);

export default router;
