'use strict'
const cheerio = require('cheerio');
const database = require('../database/database')
const puppeteerWrapper = require("./PuppeteerWrapper/puppeteerWrapper");
const helpers = require("./helpers/helpers")
const browser = new puppeteerWrapper();


const db = new database();

const serpApi = require("./SerpApi/serp")
const serp = new serpApi();

exports.start = async function() {
    console.log("-----Start-----")
    await browser.launch()
    const searchTerms = helpers.getSearchTerms();
    const crawledData = await crawlAndSave(searchTerms);
    await db.connect();
    await db.saveData(crawledData);
}

exports.getData = async function(terms) {
    await browser.launch()
    const crawledData = await crawlAndSave(terms);
    return crawledData;
}




async function crawlAndSave (searchTerms) {
    let serpData = await serp.getResultsForSearchTerms(searchTerms)
    serpData = await addWebsiteData(serpData)
    console.log(serpData)
    return serpData;
}


 async function addWebsiteData(serpData) {
    for (const product of serpData) {
        const $ = cheerio.load(await browser.getWebsiteContent(product.link));
        await $("script").each(async index=> {
            let scriptElement = await getStructuredData($("script").eq(index));
            if (!scriptElement) return
            let jsonScriptElement = JSON.parse(scriptElement)
            if(jsonScriptElement.aggregateRating) product.aggregateRating = jsonScriptElement.aggregateRating
            if(jsonScriptElement.offers) product.offers = jsonScriptElement.offers
            if(jsonScriptElement.sku) product.sku = jsonScriptElement.sku
            product.lookupDate = Date.now()
            if(jsonScriptElement.review) product.review = jsonScriptElement.review

        });
    }
    return serpData
}




async function getStructuredData(el) {
        if (!isStructuredData(el)) return
        let tempJson = JSON.parse(el.html());
        if (tempJson['@graph']){
            tempJson['@graph'].forEach(obj => {
                if (obj["@type"].toLowerCase() == "product") {
                    console.log(obj["@type"])
                    return tempJson = obj;
                }
            })
        }
        if (!isProduct(tempJson)) return
        // tempJson = await transformJson(tempJson);
        // console.log("data", JSON.stringify(tempJson));
        return JSON.stringify(tempJson);
}





function transformJson(data, url) {
    data.correctUrl = url;
    data.baseUrl = new URL(url).origin
    return data
}


function isStructuredData(that) {
    return that.attr("type") === "application/ld+json"
}

function isProduct(data){
    if (data["@type"] == undefined || data["@type"].length == 1) return false
    return data["@type"].toLowerCase() == "product"
}






/*
exports.crawl = async function (searchTerm, res, pages) {
    let counter = 0
    browser = await puppeteer.launch(options);

    let googleContent = await getWebsiteContent(`https://www.google.de/search?q=${searchTerm}`);
    let anchors = getAnchors(googleContent);
    let structuredData = []
    for (const url1 of anchors) {
        let websiteContent = await getWebsiteContent(url1);
        const $ = cheerio.load(websiteContent);
        $("script").each(async function () {
            if (isStructuredData($(this))) {
                let tempJson = JSON.parse($(this).html());
                if (isProduct(tempJson)) {
                    tempJson = await transformJson(tempJson, url1);
                    structuredData.push(JSON.stringify(tempJson));
                    if (counter == 2) {
                        return res.send(structuredData)
                    }
                    console.log(counter);
                    counter++
                }
            }
        });

    }
};
*/
