const express = require ('express')
const router = express.Router()
const productCtrl = require('../controllers/product')


router.get("/", productCtrl.index);

router.post("/", productCtrl.create);

router.get("/:id", productCtrl.show);

router.delete("/:id", productCtrl.delete);

router.put("/:id", productCtrl.update);

module.exports = router