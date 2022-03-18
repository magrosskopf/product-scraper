const assert = require("assert").strict;
const helpers = require("../scraper/helpers/helpers")
const data = require("../dev/serpOrganicResults")

describe("Scraper Helpers", () => {
    describe("helpers.getSearchTerms()", () => {
        it("return an array with length 1", () => {
            let res = helpers.getSearchTerms()
            assert.strictEqual(res.length, 1)
            assert.strictEqual(Array.isArray(res), true)
        })
    })


})

