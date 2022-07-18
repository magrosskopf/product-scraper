const SerpApi = require('google-search-results-nodejs');
const util = require('util');
const {log} = require("debug");
// https://serpapi.com/search-api

class Serp {
    constructor() {
        this.apiKey = "178f65ac674096f41b500e9b93a800893ab0f4c8d7682578f21817426bbf93b5";
        this.search = new SerpApi.GoogleSearch("178f65ac674096f41b500e9b93a800893ab0f4c8d7682578f21817426bbf93b5");
    }


    async getResultsForSearchTerms(searchTerms) {
        let serpData = []
        for (const searchTerm of searchTerms) {
            let googleContent = await this.getResults(searchTerm);
            googleContent = this.addSearchTermAndDate(googleContent,searchTerm)
            serpData.push(googleContent)
        }
        return serpData[0].organic_results;
    }

    async getResults(term) {
        const params = {
            q: term,
            hl: "de",
            gl: "de",
            num: 100
        };

        // https://stackabuse.com/converting-callbacks-to-promises-in-node-js/
        function getJson(parameter, resolve, reject) {
            try {
                console.log("i will try it ")
                new SerpApi.GoogleSearch("178f65ac674096f41b500e9b93a800893ab0f4c8d7682578f21817426bbf93b5").json(parameter, resolve)
            } catch (data) {
                console.log("d",data)
            }
        }

        const blockFn = util.promisify(getJson)
        let res
        await blockFn[util.promisify.custom](params).then(data => {
            res = data
        }).catch(e => {
          //  console.log("e",e)
            res = e
        })
        return res
    }

    addSearchTermAndDate(googleContent,searchTerm) {
        googleContent.organic_results.forEach(content => {
                content.searchTerm = searchTerm
                content.lookupDate = Date.now();
            })
        return googleContent;
    }
}

module.exports = Serp;
