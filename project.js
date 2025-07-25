const express = require('express');
const mongoose = require('mongoose');
const path = require('path');          
const hbs = require('hbs');            

const Product = require('./models/productModel');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3033;
const MONGO_URL = "mongodb://localhost:27017/project";


hbs.registerHelper('eq', (a, b) => a === b);


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/products', productRoutes);


mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log("Server is running on port " + PORT);
        });
    })
    .catch((error) => console.log(error));
