const express = require("express");
const router = express.Router();
const reportRepository = require("./report.repository");

const {
  checkJwt,
  checkScopes,
} = require("../middleware/authorizationMiddleware");

router.get("/", checkJwt, checkScopes, async (req, res, next) => {
  try {
    const categoryReport = await reportRepository.getCategoryReport();
    const discountReport = await reportRepository.getDiscountReport();

    const response = {
      categoryReport,
      discountReport,
    };

    return res.json(response);
  } catch (err) {
    if (err.name === "AuthenticationError") {
      return res.status(401).json({ error: "Unauthenticated" });
    } else if (err.name === "AuthorizationError") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    next(err);
  }
});

module.exports = router;
