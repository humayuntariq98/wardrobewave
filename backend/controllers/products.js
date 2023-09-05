
const express = require('express')
const {Product} = require('../models')

// EXPORT Controller Action
module.exports = {
	index,
	create,
	show,
  update,
  delete: destroy
}

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// PRODUCT INDEX ACTION
async function index(req,res,next) {
	try {
    // get all products
    res.json(await Product.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// PRODUCT CREATE ACTION
async function create(req,res,next) {
  try {
    // create new procuct
    res.json(await Product.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// PRODUCT SHOW ACTION
async function show(req,res,next) {
    try {
       // update one product
        res.json(await Product.findById(req.params.id));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
};

// PEOPLE DESTROY ACTION
async function destroy(req,res,next) {
  try {
    // delete people by ID
    res.json(await Product.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

async function update(req,res,next) {
  try {
    // update people by ID, provide the form data, and return the updated document.
    res.json(
      await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};
// async function update(req,res,next) {
//     const {productId} = req.params
//     const updatedData = req.body
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData,{new: true})
//         if(!updatedProduct){
//             return res.status(404).json({message:"product not found"})
//         }
//         res.json(updatedProduct)
//       } catch (error) {
//         //send error
//         res.status(400).json(error);
//       }
// };

// ... the remaining people controller actions will go below 

// PEOPLE DESTROY ACTION 

// PEOPLE UPDATE ACTION

