const express = require("express");
const router = express.Router();
const cartCtrl = require("../controllers/cart");

// cart CREATE ROUTE

router.get("/", cartCtrl.getCart);
router.post("/", cartCtrl.createOrUpdate);
//the two colons because the ID is userID which is a unique string. 
router.delete("/::id", cartCtrl.destroy);
//cart items quantity update route
router.post("/updateQuantity", cartCtrl.updateCartItemQuantity);

module.exports = router;
