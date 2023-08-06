import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

import { JWT_SECRET } from "../config";
import { CustomerModel } from "../models/customer.models";
import { customer_zod_schema } from "../types/customer.validation";

export async function customerSignup(req: Request, res: Response) {
  const customerExist = await CustomerModel.findOne({ email: req.body.email });

  if (customerExist) {
    res.status(400).json({ message: "Email already exists" });
  } else {
    // validate customer input
    const valid = customer_zod_schema.safeParse(req.body);
    if (!valid.success) {
      return res
        .status(400)
        .json({ message: "Invalid customer data", error: valid.error });
    }

    // create new customer in database
    const new_customer = new CustomerModel(valid.data);
    await new_customer.save();

    // create authentication token
    const token = jwt.sign(
      { name: new_customer.name, email: new_customer.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // return customer data and token
    return res.status(201).json({
      message: "Customer created successfully",
      data: new_customer,
      token: token
    });
  }
}

export async function customerLogin(req: Request, res: Response) {
  const customer = await CustomerModel.findOne({
    email: req.headers["email"],
    password: req.headers["password"]
  });

  // customer found successfully
  if (customer) {
    const token = jwt.sign(
      { name: customer.name, email: customer.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // return customer data and token
    return res
      .status(200)
      .json({ message: "Customer found", data: customer, token: token });
  } else {
    return res.status(404).json({ message: "Customer not found" });
  }
}
