//cart controller

const express = require('express');
const { Cart } = require('../models');
const { calculateTotalPriceOfCart} = require( '../utils/utils')
module.exports = {
  getCart,
  createOrUpdate,
  destroy
};

async function getCart(req, res, next) {
  try {
    const userId = req.query.user
    const cart =await Cart.findOne({userId}) 
    res.json(cart);
  } catch (error) {
    console.log("error happened",error)
    //send error
    res.status(400).json(error);
  }
}

async function createOrUpdate(req, res, next) {
  try {
    const {userId, product} = req.body;
    const currentCart = await Cart.findOne({userId})
    if(currentCart){
      const isProductAlreadyInCart = currentCart.products.findIndex(p=>p._id === product._id)
      if(isProductAlreadyInCart!==-1){
        currentCart.products[isProductAlreadyInCart].quantity++;
      } else{
        currentCart.products.push({...product, quantity:1})
      }
      currentCart.totalAmount = calculateTotalPriceOfCart(currentCart);
      await Cart.findByIdAndUpdate(currentCart._id, currentCart, {new: true})
      res.json(currentCart)
    }
    else{

      const cartData = {products:[{...product, quantity:1}], userId, totalAmount: product.price}
      const newCart = Cart.create(cartData)
      res.json(newCart)
    }
    
}
catch(error) {
  console.log(error)
}
}


async function destroy(req,res,next){
  try{
    const userId = req.params.userId;
    console.log('user id to delete cart',req.params.id);
    const cartres = await Cart.findOneAndDelete({userId:req.params.id});
    console.log('cart deleted',cartres);
    res.status(200).json()
  }
  catch(error){
    console.log('error',error);
    res.status(500).json(error)
  }
}