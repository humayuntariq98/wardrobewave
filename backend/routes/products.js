const express = require ('express')
const router = express.Router()
const productCtrl = require('../controllers/products')

// PEOPLE INDEX ROUTE
router.get("/", productCtrl.index);

// PEOPLE CREATE ROUTE
router.post("/", productCtrl.create);

// PEOPLE SHOW ROUTE
router.get("/:id", productCtrl.show);

// PEOPLE DELETE ROUTE
router.delete("/:id", productCtrl.delete);

// PEOPLE UPDATE ROUTE
router.put("/:id", productCtrl.update);

module.exports = router