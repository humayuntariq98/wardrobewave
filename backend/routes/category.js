const express = require ('express')
const router = express.Router()
const categoryCtrl = require('../controllers/category')

// PEOPLE INDEX ROUTE
router.get("/", categoryCtrl.index);

// category CREATE ROUTE
router.post("/", categoryCtrl.create);

// category SHOW ROUTE
router.get("/:id", categoryCtrl.show);

// category DELETE ROUTE
router.delete("/:id", categoryCtrl.delete);

// category UPDATE ROUTE
router.put("/:id", categoryCtrl.update);

module.exports = router