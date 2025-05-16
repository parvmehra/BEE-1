const express = require('express');
const mongoose = require('mongoose');
const path = require('path');           // Add this if you want to set views folder manually
const hbs = require('hbs');             // Make sure hbs is required before using it

const Product = require('./models/productModel');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3033;
const MONGO_URL = "mongodb://localhost:27017/project";

// ✅ Register helper AFTER requiring hbs
hbs.registerHelper('eq', (a, b) => a === b);

// ✅ Configure view engine AFTER registering helpers
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); // Optional, just for clarity

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/products', productRoutes);

// Connect to MongoDB and start server
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log("Server is running on port " + PORT);
        });
    })
    .catch((error) => console.log(error));
