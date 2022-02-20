const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = require('url');
const fs = require('fs');
let browser = null;
const websites = [];


exports.crawl = async function (searchTerm, res, pages) {
    let counter = 0
    browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser'
    });
    let googleContent = await getWebsiteContent(`https://www.google.de/search?q=${searchTerm}`);
    let anchors = getAnchors(googleContent);
    let structuredData = []
    anchors.forEach(async (url) => {
        let websiteContent = await getWebsiteContent(url);
        const $ = cheerio.load(websiteContent);
        $("script").each(async function () {
            if (isStructuredData($(this))) {
                let tempJson = JSON.parse($(this).html());
                if (isProduct(tempJson)) {
                    tempJson = await transformJson(tempJson, url);
                    structuredData.push(JSON.stringify(tempJson));
                    if (counter == 2) {
                        return res.send(structuredData)
                    }
                    console.log(counter);
                    counter++
                }
            }
        });
        
    })
};

exports.crawlAndSave = async function (searchTerm) {
    let counter = 0
    browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser'
    });
    let googleContent = await getWebsiteContent(`https://www.google.de/search?q=${searchTerm}`);
    let anchors = getAnchors(googleContent);
    let structuredData = []
    anchors.forEach(async (url) => {
        let websiteContent = await getWebsiteContent(url);
        const $ = cheerio.load(websiteContent);
        $("script").each(async function () {
            if (isStructuredData($(this))) {
                let tempJson = JSON.parse($(this).html());
                if (isProduct(tempJson)) {
                    tempJson = await transformJson(tempJson, url);
                    structuredData.push(JSON.stringify(tempJson));
                    if (counter == 2) {
                        // save to mongo
                    }
                    console.log(counter);
                    counter++
                }
            }
        });

    })
};

function transformJson(data, url) {
    data.correctUrl = url;
    data.baseUrl = new URL(url).origin
    return data
}


function isStructuredData(that) {
    return that.attr("type") == "application/ld+json"
}

function isProduct(data){
   return data["@type"].toLowerCase() == "product"
}


async function getWebsiteContent(url) {
    console.log("url", url);
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });
    const content = await page.content();
    await page.close()
    return content;
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

