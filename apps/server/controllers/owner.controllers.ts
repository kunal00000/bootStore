import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import { OwnerModel } from "../models/owner.models";
import { owner_zod_schema } from "../types/owner.validation";

export async function ownerSignup(req: Request, res: Response) {
  const ownerExist = await OwnerModel.findOne({ email: req.body["email"] });

  // owner already exists
  if (ownerExist) {
    res.status(400).json({ message: "Email already exists" });
  } else {
    // validate owner input
    const valid = owner_zod_schema.safeParse({ ...req.body, stores: [] });
    if (!valid.success) {
      return res
        .status(400)
        .json({ message: "Invalid owner data", error: valid.error });
    }

    // create new owner in database
    const new_owner = new OwnerModel(valid.data);
    await new_owner.save();

    // create authentication token
    const token = jwt.sign(
      {
        id: new_owner._id,
        name: new_owner.name,
        role: "owner"
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // return owner data and token
    return res.status(201).json({
      message: "Success",
      data: new_owner,
      token: token
    });
  }
}

export async function ownerLogin(req: Request, res: Response) {
  const owner = await OwnerModel.findOne({
    email: req.headers["email"],
    password: req.headers["password"]
  });

  if (owner) {
    const token = jwt.sign(
      { id: owner._id, name: owner.name, role: "owner" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Success", data: owner, token: token });
  } else {
    return res.status(404).json({ message: "Invalid email or password" });
  }
}
