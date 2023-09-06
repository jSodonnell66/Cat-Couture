const express = require("express");
const Joi = require("joi");
const router = express.Router();
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");
const { getProducts, getTotalProducts } = require("./product.repository");

const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

router.get(
  "/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      let { limit, page } = req.query;

      if (!limit) {
        limit = 10;
      }

      if (!page) {
        page = 1;
      }

      const products = await getProducts(limit, page);
      const totalItems = await getTotalProducts();

      const responseResults = {
        products,
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
        totalItems: parseInt(totalItems),
        totalPages: Math.ceil(totalItems / limit),
      };

      return res.status(200).json(responseResults);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
);

module.exports = router;
