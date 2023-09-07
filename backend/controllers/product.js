const express = require("express");
const { Product } = require("../models");

// EXPORT Controller Action
module.exports = {
  index,
  create,
  show,
  delete: destroy,
  update,
};

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// PRODUCT INDEX ACTION
async function index(req, res, next) {
  try {
    // get all product
    res.json(await Product.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
}

// PRODUCT CREATE ACTION
async function create(req, res, next) {
  try {
    // create new procuct
    res.json(await Product.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
}

// PRODUCT SHOW ACTION
async function show(req, res, next) {
  try {
    // update one product
    res.json(await Product.findById(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
}

// Product DESTROY ACTION
async function destroy(req, res, next) {
  try {
    // delete people by ID
    res.json(await Product.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
}

// product UPDATE ACTION
async function update(req, res, next) {
  try {
    // update product by ID, provide the form data, and return the updated document.
    res.json(
      await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
}
