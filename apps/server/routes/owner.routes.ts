import express from "express";

import { ownerLogin, ownerSignup } from "../controllers/owner.controllers";

const router = express.Router();

router.route("/signup").post(ownerSignup);
router.route("/login").post(ownerLogin);

export default router;
