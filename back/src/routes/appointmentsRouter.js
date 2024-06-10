const { Router } = require("express");
const router = Router();

const { storeAppoitment } = require("../controller/appointmentsController");

router.post("/store/appointment", storeAppoitment);

module.exports = router;