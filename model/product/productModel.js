const mongoose = require("mongoose");
const Product = mongoose.model('Product',{
    name: mongoose.Schema.Types.String,
    brand: mongoose.Schema.Types.String,
    image: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    sku: mongoose.Schema.Types.String,
    gtin13: mongoose.Schema.Types.String,
    offers: mongoose.Schema.Types.Mixed,
    aggregateRating: {
        bestRating: mongoose.Schema.Types.String,
        worstRating: mongoose.Schema.Types.String,
        ratingValue: mongoose.Schema.Types.String,
        reviewCount: mongoose.Schema.Types.String,
        ratingCount: mongoose.Schema.Types.String
    },
    review: mongoose.Schema.Types.Array
});

module.exports = Product;