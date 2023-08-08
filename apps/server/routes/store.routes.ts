import express from "express";

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

export default router;
