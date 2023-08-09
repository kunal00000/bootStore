import { Request, Response } from "express";

import { OwnerModel } from "../models/owner.models";
import { ProductModel } from "../models/product.models";
import { StoreModel } from "../models/store.models";
import { product_zod_schema } from "../types/product.validation";

export async function getProductsOfAllStores(req: Request, res: Response) {
  const products = await ProductModel.find({});

  if (products) {
    return res.status(200).json({ message: "Success", products: products });
  } else {
    return res.status(404).json({ message: "No products found" });
  }
}

export async function getProductsOfStore(req: Request, res: Response) {
  const store = await StoreModel.findOne({
    _id: req.params["store_id"]
  }).populate("products");

  if (!store) {
    return res.status(404).json({ message: "products not found" });
  } else {
    return res.status(200).json({
      message: "Success",
      products: store.products,
      store_id: store._id
    });
  }
}

export async function getProductByID(req: Request, res: Response) {
  const product = await ProductModel.findById(req.params["product_id"]);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  } else {
    return res.status(200).json({ message: "Success", product: product });
  }
}

export async function createProduct(req: Request, res: Response) {
  const owner = await OwnerModel.findById(req.headers["user_id"]).populate(
    "stores"
  );

  if (owner) {
    const storeId = owner.stores.find(
      (store) => store._id.toString() == req.params["store_id"]
    );

    if (storeId) {
      const store = await StoreModel.findById(storeId);

      if (store) {
        const valid = product_zod_schema.safeParse(req.body);

        if (valid.success) {
          const new_product = new ProductModel(req.body);
          await new_product.save();

          store.products.push(new_product._id);
          await store.save();

          return res
            .status(201)
            .json({ message: "Success", product: new_product });
        } else {
          return res
            .status(400)
            .json({ message: "Invalid product data", error: valid.error });
        }
      } else {
        return res.status(404).json({ message: "Store not found" });
      }
    } else {
      return res.status(404).json({ message: "Store not found for owner" });
    }
  } else {
    return res.status(404).json({ message: "Owner not found" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const owner = await OwnerModel.findById(req.headers["user_id"]);

  if (owner) {
    const storeId = owner.stores.find(
      (store) => store._id.toString() == req.params["store_id"]
    );

    if (storeId) {
      const store = await StoreModel.findById(storeId);

      if (store) {
        const productIdx = store.products.findIndex(
          (product) => product._id.toString() == req.params["product_id"]
        );

        if (productIdx != -1) {
          const product = await ProductModel.findByIdAndDelete(
            req.params["product_id"]
          );

          store.products.splice(productIdx, 1);
          await store.save();

          if (product) {
            return res.status(200).json({ message: "Success" });
          } else {
            return res.status(404).json({ message: "Product not deleted" });
          }
        } else {
          return res
            .status(404)
            .json({ message: "Product not found in store" });
        }
      } else {
        return res.status(404).json({ message: "Store not found" });
      }
    } else {
      return res.status(404).json({ message: "Store not found for Owner" });
    }
  } else {
    return res.status(404).json({ message: "Owner not found" });
  }
}
