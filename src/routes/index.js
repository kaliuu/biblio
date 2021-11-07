const express = require("express");
const router = express.Router();
const redir = require("../app")
router.get("/", (req, res) => {
  res.render("index", {
    txt: "lorem ipsum sit amet HOME",
    title: "Home",
    active: { Home: true },
  });
});

router.get("/reserva", (req, res) => {
  res.render("reserva", {
    title: "Sistema de reserves",
    active: { reserva: true },
  });
});


module.exports = router;
