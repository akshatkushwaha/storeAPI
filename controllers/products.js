const Products = require("../models/products");
const asyncWrapper = require("../middleware/async");

const getAllProducts = asyncWrapper(async (req, res) => {
  const page = Number(req.query.page) || 1;
  delete req.query.page;

  const limit = Number(req.query.limit) || 15;
  delete req.query.limit;

  let sortQuery = req.query.sort || "name";
  sortQuery = sortQuery.split(",").join(" ");
  delete req.query.sort;

  let fields = req.query.showFields || "name,ram,cpu_make,cpu_model,storage_type,storage,price";
  fields = fields.split(",").join(" ");
  delete req.query.showFields;

  if (req.query.ram) {
    req.query.ram = { $gte: Number(req.query.ram) };
  }

  if (req.query.minPrice || req.query.maxPrice) {
    const minPrice = req.query.minPrice || 0;
    const maxPrice = req.query.maxPrice || Number.MAX_SAFE_INTEGER;
    delete req.query.minPrice;
    delete req.query.maxPrice;
    req.query.price = { $gte: minPrice, $lte: maxPrice };
  }

  if (req.query.name) {
    req.query.name = { $regex: req.query.name, $options: "i" };
  }

  const products = await Products.find(req.query)
    .sort(sortQuery)
    .select(fields)
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(200).json({ itemCount: products.length, Page: page, products });
});

module.exports = {
  getAllProducts,
};
