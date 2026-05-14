const express = require("express");
const router = express.Router();
const { aircraftController } = require("../../controllers/index");

router.post("/create/aircraft", aircraftController.create);
router.get("/aircrafts", aircraftController.getAll);
router.get("/aircrafts/:id", aircraftController.getById);
router.put("/aircrafts/:id", aircraftController.update);
router.delete("/aircrafts/:id", aircraftController.delete);


module.exports = router;
