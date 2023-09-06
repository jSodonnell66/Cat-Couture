const db = require("../db");

const getProducts = async (limit, page) => {
  const offset = limit * (page - 1);
  try {
    const result = await db.query(
      `SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      pc.name AS "categoryName",
      pi.name AS "imageName",
      pi.description AS "imageDescription",
      dt.type AS "discountType",
      pd.value AS "discountValue"
  FROM
      product AS p
  LEFT JOIN
      product_category AS pc ON p.product_category_id = pc.id
  LEFT JOIN
      product_image AS pi ON p.product_image_id = pi.id
  LEFT JOIN
      product_discount AS pd ON p.id = pd.product_id
  LEFT JOIN
      discount_type AS dt ON pd.discount_type_id = dt.id
  ORDER BY
      dt.type DESC NULLS LAST,
      p.id ASC NULLS LAST
      LIMIT $1 OFFSET $2;
    `,
      [limit, offset]
    );
    return result.rows;
  } catch (error) {
    throw Error(error);
  }
};

const getTotalProducts = async () => {
  try {
    const result = await db.query(`SELECT COUNT(id) FROM product`);
    const amount = result.rows[0].count;
    return parseInt(amount);
  } catch (error) {
    throw Error(error);
  }
};

const productRepository = {
  getProducts,
  getTotalProducts,
};

module.exports = productRepository;
