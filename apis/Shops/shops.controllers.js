const Shop = require("../../db/models/shop");
const Product = require("../../db/models/Product");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findById(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    req.body.shop = req.params.shopId;
    const newProduct = await Product.create(req.body);
    await Shop.findByIdAndUpdate(req.shop, {
      $push: { products: newProduct._id },
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.ShopCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newshop = await Shop.create(req.body);
    return res.status(201).json(newshop);
  } catch (error) {
    next(error);
  }
};

exports.ShopListFetch = async (req, res, next) => {
  try {
    const shops = await Shop.find().populate("products");
    return res.json(shops);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};
