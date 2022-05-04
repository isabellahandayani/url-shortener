import { Router } from "express";

import { get, create, validate } from "../controllers/url.controller";

const router = Router();

router.post("/", create);
router.post("/validate", validate);
router.get("/:id", get);

export default router;
