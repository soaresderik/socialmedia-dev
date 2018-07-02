const express = require("express");
const router = express.Router();

// @route GET api/profile/test
// @desc  Rota de teste
// @access Publica
router.get("/test", (req, res) => res.json({ msg: "profile Works" }));

module.exports = router;
