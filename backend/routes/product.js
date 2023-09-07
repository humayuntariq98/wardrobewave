const express = require ('express')
const router = express.Router()
const productCtrl = require('../controllers/product')

// PEOPLE INDEX ROUTE
router.get("/", productCtrl.index);

// product CREATE ROUTE
router.post("/", productCtrl.create);

// product SHOW ROUTE
router.get("/:id", productCtrl.show);

// product DELETE ROUTE
router.delete("/:id", productCtrl.delete);

// product UPDATE ROUTE
router.put("/:id", productCtrl.update);

module.exports = router