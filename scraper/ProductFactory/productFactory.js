exports.dataToProducts = function(crawledData) {
    let products = [];
    console.log(crawledData[0])
    crawledData.forEach(rawProduct => {
        rawProduct = JSON.parse(rawProduct)
       /* let tempProduct = {
            name: rawProduct.name || "",
            brand: rawProduct.brand,
            image: rawProduct.image,
            description: rawProduct.description,
            sku: rawProduct.sku,
            gtin13: rawProduct.gtin13,
            offers: rawProduct.offers,
            aggregateRating: {
                bestRating: rawProduct.bestRating,
                worstRating: rawProduct.worstRating,
                ratingValue: rawProduct.ratingValue,
                reviewCount: rawProduct.reviewCount,
                ratingCount: rawProduct.ratingCount
            },
            review: rawProduct.review
        } */
        products.push(rawProduct)
    })
    return products
}