import express from "express";

import {
  customerLogin,
  customerSignup
} from "../controllers/customer.controllers";

const router = express.Router();

router.route("/signup").post(customerSignup);
router.route("/login").post(customerLogin);

export default router;
