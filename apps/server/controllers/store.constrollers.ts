import { Request, Response } from "express";

import { OwnerModel } from "../models/owner.models";
import { StoreModel } from "../models/store.models";
import { store_zod_schema } from "../types/store.validation";

export async function getAllStores(req: Request, res: Response) {
  const stores = await StoreModel.find({});
  if (stores) {
    return res.status(200).json({ message: "Success", stores: stores });
  } else {
    return res.status(404).json({ message: "No stores found" });
  }
}

export async function getStoreByID(req: Request, res: Response) {
  const store = await StoreModel.findById(req.params.id);
  if (store) {
    return res.status(200).json({ message: "Success", store: store });
  } else {
    return res.status(404).json({ message: "No store found" });
  }
}

export async function createStore(req: Request, res: Response) {
  if (req.headers["user_role"] == "owner") {
    const owner = await OwnerModel.findById(req.headers["user_id"]);

    if (owner) {
      const valid = store_zod_schema.safeParse({ ...req.body, products: [] });

      if (valid.success) {
        const new_store = new StoreModel(valid.data);
        await new_store.save();

        owner.stores.push(new_store._id);
        await owner.save();

        res.status(200).json({ message: "Success", store: new_store });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid store input", errors: valid.error });
      }
    } else {
      return res.status(404).json({ message: "Owner not found" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Only owners are allowed to create stores" });
  }
}

export async function deleteStore(req: Request, res: Response) {
  const owner = await OwnerModel.findById(req.headers["owner_id"]);

  if (owner) {
    const storeId = owner.stores.find(
      (store) => store.toString() == req.params["store_id"]
    );

    if (storeId) {
      const store = await StoreModel.findByIdAndDelete(storeId);

      if (store) {
        return res.status(200).json({ message: "Success" });
      } else {
        return res.status(404).json({ message: "Store not found" });
      }
    } else {
      return res.status(404).json({ message: "Store not found for owner" });
    }
  }
}
