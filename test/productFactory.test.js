const assert = require("assert").strict;
const productFactory = require("../scraper/ProductFactory/productFactory")
const Product = require("../model/product/productModel")

describe("Product Factory", () => {
    const data = require("../dev/sampleProductData.json")

    let products = productFactory.dataToProducts(data.data);
    describe("dataToProducts(crawledData)", () => {
        it("should return 2 element", () => {
            assert.strictEqual(products.length, 2)
        })
        it("should have a name on each product", () => {
            assert.strictEqual(products[0].name, "GLYNT REVITAL Farbglanz &amp; seidiger Griff Set")
            assert.strictEqual(products[1].name, "GLYNT REVITAL Regain Milk 450ml")
        })
    })
})