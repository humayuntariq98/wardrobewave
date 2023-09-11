const express = require('express')
const {Category} = require('../models')
const {Product} = require('../models')

// EXPORT Controller Action
module.exports = {
	index,
	create,
	show,
  delete: destroy,
	update
}

async function index(req,res,next) {
	try {
    // get all product
    res.json(await Category.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};


async function create(req,res,next) {
  try {
    // create new procuct
    res.json(await Category.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// Category SHOW ACTION
async function show(req,res,next) {
    try {
       // update one Category
        const individualCategory = await Category.findById(req.params.id);
        const categoryProducts = await Product.find({categories : req.params.id})
        res.json({category : individualCategory,
                  products : categoryProducts
        })
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
};

// Category DESTROY ACTION
async function destroy(req,res,next) {
  try {
    // delete people by ID
    res.json(await Category.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// Category UPDATE ACTION
async function update(req,res,next) {
  try {
    // update Category by ID, provide the form data, and return the updated document.
    res.json(
      await Category.findByIdAndUpdate(req.params.id, req.body, {new:true})
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

