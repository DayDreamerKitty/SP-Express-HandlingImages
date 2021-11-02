const express = require("express");
const {
  categoryList,
  fetchCategory,
  categoryCreate,
} = require("./category.controller");

const router = express.Router();

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    next({ status: 404, message: "Category Not Found!" });
  }
});

router.get("/", categoryList);

module.exports = router;
