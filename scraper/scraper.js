'use strict'
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const database = require('../database/database')
const productFactory = require("./ProductFactory/productFactory")
const puppeteerWrapper = require("./PuppeteerWrapper/puppeteerWrapper");

const browser = new puppeteerWrapper();
const db = new database();

exports.start = async function() {
    await browser.launch();
    const searchTerms = getSearchTerms();
    const crawledData = await crawlAndSave(searchTerms);
    const products = productFactory.dataToProducts(crawledData);
    await db.connect();
    await db.saveData(products);
}

async function crawlAndSave (searchTerms) {
    let structuredData = []
    for (const searchTerm of searchTerms) {
        let googleContent = await browser.getWebsiteContent(`https://www.google.de/search?q=${searchTerm}`);
        console.log("googleContent: ", googleContent.length)

        let anchors = getAnchors(googleContent);
        for (const url of anchors) {
            const $ = cheerio.load(await browser.getWebsiteContent(url));
            await $("script").each(async index=> {
                let scriptElement = await getStructuredData($("script").eq(index));
                if (!scriptElement) return
                structuredData.push(scriptElement);
            });
        }
    }
    return structuredData;
}



async function getStructuredData(el) {
        if (!isStructuredData(el)) return
        let tempJson = JSON.parse(el.html());
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




function getAnchors(content) {
    const $ = cheerio.load(content);
    let anchors = [];
     $('a').each(function() {
         let ref = $(this).attr("href");
         if (anchors.indexOf(ref) == -1 && ref) {
            if (ref.substring(0,4).toLowerCase() != "http") return
            anchors.push(ref)
         }
    })
    return anchors;
}

function getSearchTerms() {
    return [
        "glynt+revital+shot"
        /* "glynt+hydro+shot",
        "glynt+revital+shampoo",
        "glynt+hydro+shampoo"

         */
    ]
}

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

