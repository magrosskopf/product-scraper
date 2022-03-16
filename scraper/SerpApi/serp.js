const SerpApi = require('google-search-results-nodejs');
const util = require('util');
// https://serpapi.com/search-api

class Serp {
    constructor() {
        this.apiKey = "178f65ac674096f41b500e9b93a800893ab0f4c8d7682578f21817426bbf93b5";
        this.search = new SerpApi.GoogleSearch("178f65ac674096f41b500e9b93a800893ab0f4c8d7682578f21817426bbf93b5");
    }

    async getResults(term) {
        console.log("i am in ")
        const params = {
            q: term,
            hl: "en",
            gl: "us"
        };

        // https://stackabuse.com/converting-callbacks-to-promises-in-node-js/
        const callback = function(data) {
            console.log(data);
            return data;
        };

        this.search.json(params, callback);

    }
}

module.exports = Serp;