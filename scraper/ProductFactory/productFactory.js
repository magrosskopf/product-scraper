exports.dataToProducts = function(crawledData) {
    let products = [];
    console.log(crawledData[0])
    crawledData.forEach(rawProduct => {
        rawProduct = JSON.parse(rawProduct)

        products.push(rawProduct)
    })
    return products
}