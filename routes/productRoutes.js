const express = require('express');
const router = express.Router();
let productList = require('../products');   // keep let so we can modify the array

//POST - create product(logic: last index+1)
router.post('/', (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !price ) {
      return res.status(400).json({ message: "name and price is required" });
    }

    const newId = (productList.at(-1)?.id || 0) + 1;
    // productList.length

    const newProduct = { 
        id: newId, 
        name,
        price, image };

    productList.push(newProduct);

    res.status(201).json({message:"Product added successfully",
        new_product :newProduct});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET all products: read
router.get('/', (req, res) => {
  try {
    res.status(200).json({ products: productList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET -by ID
router.get('/:id', (req, res) => {
  try {
    const pId = parseInt(req.params.id);
    const data = productList.find(p => p.id === pId);

    if (!data) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ product: data });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH update a product
router.patch('/:id', (req, res) => {
  try {
    const pId = parseInt(req.params.id);
    const data = productList.find(p => p.id === pId);

    if (!data) {
      return res.status(404).json({ message: "product not found" });
    }

    const { name, price, image } = req.body;

    if (name !== undefined) data.name = name;
    if (price !== undefined) data.price = price;
    if (image !== undefined) data.image = image;

    res.status(200).json({ product: data });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE product
router.delete('/:id', (req, res) => {
  try {
    const pId = parseInt(req.params.id);
    const exists = productList.some(p => p.id === pId);

    if (!exists) {
      return res.status(404).json({ message: "product not found" });
    }

    productList = productList.filter(p => p.id !== pId);

    res.status(200).json({ message: "product deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
