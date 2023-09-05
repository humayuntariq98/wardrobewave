const express = require ('express')
const router = express.Router()


// PEOPLE INDEX ROUTE
router.get("/", (req, res) => {
	res.status(200).json({message: "products index route"})
});

// PEOPLE CREATE ROUTE
router.post("/", (req, res) =>  {
	console.log(req.body)
	res.status(200).json({message: "products create route"})
});

// PEOPLE SHOW ROUTE
router.get("/:id", (req, res) => {
	res.status(200).json({message: "product show route: " + req.params.id })
});

// PEOPLE DELETE ROUTE
router.delete("/:id", (req, res) => {
	res.status(200).json({message: "product delete route: " + req.params.id })
});

// PEOPLE UPDATE ROUTE
router.put("/:id", (req, res) => {
	console.log(req.body)
	res.status(200).json({message: "product update route: " + req.params.id })
});

module.exports = router