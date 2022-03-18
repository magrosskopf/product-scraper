const serpApi = require("../scraper/SerpApi/serp")
const {strict: assert} = require("assert");
const serp = new serpApi();
const data = require("../dev/serpOrganicResults")


describe("SerpApi", () => {
    describe("addSearchTermAndDate", () => {
        it("should add current date", () => {
           let res = serp.addSearchTermAndDate(data.serpData, "test");
           assert.notEqual(res.organic_results[0].lookupDate, null)
           assert.strictEqual(res.organic_results[0].searchTerm, "test")
        })
    })
})