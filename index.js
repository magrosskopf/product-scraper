const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = require('url');
const fs = require('fs');
let browser = null;
const websites = [];
//https://www.google.de/search?q=glynt+revital+regain+shot&sxsrf=AOaemvIDeHj7mdgppZ8WpaEIOiRf1M8Sww:1639172637489&ei=HcqzYYHPHNvO7_UPs-GnaA&start=10&sa=N&ved=2ahUKEwjB0aD2mdr0AhVb57sIHbPwCQ0Q8NMDegQIARBO&biw=1920&bih=912

(async () => {
    browser = await puppeteer.launch();
    let googleContent = await getWebsiteContent('https://www.google.de/search?q=glynt+revital+regain+shot');
    let anchors = getAnchors(googleContent);
    let structuredData = []
    for (const url1 of anchors) {
        let websiteContent = await getWebsiteContent(url1);
        const $ = cheerio.load(websiteContent);
        $("script").each(async function () {
            if (isStructuredData($(this).attr("type"))) {
                let tempJson = JSON.parse($(this).html());
                if (isProduct(tempJson["@type"])) {
                    tempJson = await transformJson(tempJson, url1);
                    structuredData.push(JSON.stringify(tempJson));
                }
            }
        })
        fs.writeFile("sd.json", structuredData, (err) => {
           console.log("err", err);
        });
    }


})();

function transformJson(data, url) {
    data.correctUrl = url;
    data.baseUrl = new URL(url).origin
    return data
}

function isStructuredData(that) {
    return that == "application/ld+json"
}

function isProduct(data){
   return data.toLowerCase() == "product"
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
         if (!ref) return
         fs.appendFileSync("urls.json", ref, (err) => {
            console.log(err);
         });
         if (anchors.indexOf(ref) == -1 && ref) {
            if (ref.substring(0,4).toLowerCase() != "http") return
            anchors.push(ref)
         }
    })
    return anchors;
}
