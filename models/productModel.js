const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    
    name: {
        type: String,
        required: [true, "Please enter the product name"]
    },

    price: {
        type: Number,
        required: [true, "Please enter a price for the product"]
    },

    quantity: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
