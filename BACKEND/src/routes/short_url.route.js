import express from "express"
import {createShortUrl, getUserUrlsController, getNoController } from "../controller/short_url.controller.js"
const router=express.Router();

router.post("/",createShortUrl)
router.get("/my-urls", getUserUrlsController)
router.get("/no", getNoController)

export default router;