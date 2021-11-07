const express = require("express");
const upload = require("../../middleware/multer");
const {
  ShopListFetch,
  ShopCreate,
  fetchShop,
  productCreate,
} = require("./shops.controllers");
const passport = require("passport");

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({ status: 404, message: "Shop Not Found!" });
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ShopCreate
);

router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
);

router.get("/", ShopListFetch);

module.exports = router;
