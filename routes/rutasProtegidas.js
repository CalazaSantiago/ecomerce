const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

router.get("/perfil", verifyToken, (req, res) => {
  res.json({ msg: "Entraste a la ruta protegida", user: req.user });
});

module.exports = router;
