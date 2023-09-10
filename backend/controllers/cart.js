//cart controller

const express = require("express");
const { Cart } = require("../models");
const { calculateTotalPriceOfCart } = require("../utils/utils");
module.exports = {
  getCart,
  createOrUpdate,
  updateCartItemQuantity,
  destroy,
};

async function getCart(req, res, next) {
  try {
    const userId = req.query.user;
    const cart = await Cart.findOne({ userId });
    res.json(cart);
  } catch (error) {
    console.log("error happened", error);
    //send error
    res.status(400).json(error);
  }
}

async function createOrUpdate(req, res, next) {
  try {
    const { userId, product } = req.body;
    const currentCart = await Cart.findOne({ userId });
    if (currentCart) {
      const isProductAlreadyInCart = currentCart.products.findIndex((p) =>
        p._id.equals(product._id)
      );
      if (isProductAlreadyInCart !== -1) {
        currentCart.products[isProductAlreadyInCart].quantity++;
      } else {
        currentCart.products.push({ ...product, quantity: 1 });
      }
      currentCart.totalAmount = calculateTotalPriceOfCart(currentCart);
      await Cart.findByIdAndUpdate(currentCart._id, currentCart, { new: true });
      res.json(currentCart);
    } else {
      const cartData = {
        products: [{ ...product, quantity: 1 }],
        userId,
        totalAmount: product.price,
      };
      const newCart = Cart.create(cartData);
      res.json(newCart);
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateCartItemQuantity(req, res, next) {
  try {
    const { userId, action, productId } = req.body;
    console.log("%ccart.js line:58 userId", "color: #007acc;", userId);
    console.log("%ccart.js line:59 action", "color: #007acc;", action);
    console.log("%ccart.js line:60 productId", "color: #007acc;", productId);

    const currentCart = await Cart.findOne({ userId });

    if (currentCart) {
      const productIndex = currentCart.products.findIndex((p) =>
        p._id.equals(productId)
      );
      if (productIndex !== -1) {
        if (action === "increment") {
          currentCart.products[productIndex].quantity++;
        } else if (action === "decrement") {
          currentCart.products[productIndex].quantity--;
          if (currentCart.products[productIndex].quantity <= 0) {
            // Remove the product if the quantity becomes zero or negative
            currentCart.products.splice(productIndex, 1);
          }
        }

        currentCart.totalAmount = calculateTotalPriceOfCart(currentCart);
        await Cart.findByIdAndUpdate(currentCart._id, currentCart, {
          new: true,
        });
        res.json(currentCart);
      } else {
        res.status(404).json({ message: "Product not found in the cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function destroy(req, res, next) {
  try {
    const userId = req.params.userId;
    console.log("user id to delete cart", req.params.id);
    const cartres = await Cart.findOneAndDelete({ userId: req.params.id });
    console.log("cart deleted", cartres);
    res.status(200).json();
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
}
