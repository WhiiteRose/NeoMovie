import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get("/", tokenMiddleware.auth, reviewController.getReviewsOfUser);

router.post(
  "/",
  tokenMiddleware.auth,
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId minimum 1 characters"),
  body("content")
    .exists()
    .withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("content minimum 1 characters"),
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType must be movie or tv"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  requestHandler.validate,
  reviewController.create
);

router.delete("/:reviewId", tokenMiddleware.auth, reviewController.remove);

export default router;
