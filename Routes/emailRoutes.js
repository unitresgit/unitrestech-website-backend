const express = require("express");
const router = express.Router();

const { sendEmail } = require("../Controllers/emailControllers");

router.post("/sendEmail", sendEmail);

module.exports = router;
