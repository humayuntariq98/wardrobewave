const express = require ('express')
const router = express.Router()
const cartCtrl = require('../controllers/cart')

// cart CREATE ROUTE


router.get("/", cartCtrl.getCart);
router.post("/", cartCtrl.createOrUpdate);
router.delete('/::id',cartCtrl.destroy);

router.post('/:id/updateQuantity', cartCtrl.updateCartItemQuantity);


module.exports = router
