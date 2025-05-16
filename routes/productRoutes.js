const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); 


router.get('/home', (req, res) => {
    res.send("Hello and welcome to the website");
});



router.get('/', async (req, res) => {
    try {
        let { search, lowStock, sortBy, order } = req.query;

        let query = {};
        if (search && search.trim()) {
            search = search.trim(); // Remove leading/trailing whitespace
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive
        }

        if (lowStock === 'true') {
            query.quantity = { $lt: 10 };
        }

        let sort = {};
        if (sortBy && order) {
            sort[sortBy] = order === 'asc' ? 1 : -1;
        }

        const products = await Product.find(query).sort(sort);

        res.render('products', {
            products,
            searchQuery: search || '',
            lowStockOnly: lowStock === 'true',
            sortBy,
            order
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
});




//Get Product by productId
// router.get('/:productId', async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const product = await Product.findOne({ productId: productId });

//         if (!product) {
//             return res.status(404).json({ message: `Product with ID ${productId} not found` });
//         }

//         res.status(200).json(product);
//     } catch (error) {
//         console.log(error.message);
//         res.status(400).json({ message: error.message });
//     }
// });

//form to add a product
router.get('/add',(req,res)=>{
    res.render('addProduct', { title: 'Add Product' });
})

//Create a Product through json
router.post('/', async (req, res) => {
   try {
        console.log("Received Data:", req.body);
        const product = await Product.create(req.body);;
        res.redirect('/products');
   } catch (error) {
        console.log(error.message);
        res.redirect('/products');


   }
});


//fetching the product to edit 
router.get('/edit/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOne({ productId: productId });

        if (!product) {
            return res.redirect('/products');
        }

        res.render('editProduct', { product });
    } catch (error) {
        console.log(error.message);
        res.redirect('/products');
    }
});

// Update/edit a  Product
router.post('/edit/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        await Product.findOneAndUpdate(
            { productId: productId },
            req.body,
            { new: true }
        );

        res.redirect('/products');
    } catch (error) {
        console.log(error.message);
        res.redirect('/products');
    }
});


// Delete Product by productId
router.post('/delete/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
      await Product.findOneAndDelete({ productId });
      res.redirect('/products');
    } catch (error) {
      console.log(error.message);
      res.status(500).render('error', { message: "Failed to delete product" });
    }
  });
  

module.exports = router;
