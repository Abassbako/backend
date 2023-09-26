const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image:[{ 
        type: String,
        required: true
    }],
    categories: { type: Array },
    color: { type: String },
    price: {
        type: String,
        required: true
    }
}, { timestamps: true } );

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;