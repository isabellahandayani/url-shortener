import { Router } from "express";

import { get, create } from "../controllers/url.controller";

const router = Router();

router.get("/:id", get);
router.post("/", create);

export default router;
