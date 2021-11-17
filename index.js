const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const websites = [];


(async () => {
    
    let googleContent = await getWebsiteContent('https://www.google.de/search?q=glynt+revital+regain+shot');
    let anchors = getAnchors(googleContent);
    let structuredData = []
    anchors.forEach(async url => {
        let websiteContent = await getWebsiteContent(url);
        const $ = cheerio.load(websiteContent);
        
        $("script").each(function() {
            console.log($(this))
            if ($(this).attr("type") == "application/ld+json") {
                let temp = $(this).html()
                let tempJson = JSON.parse(temp)
                if (tempJson["@type"].toLowerCase() == "product") {
                    structuredData.push(temp)
                }
                
            }
        })
        fs.writeFile("sd.json", structuredData, (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
              console.log("The written has the following contents:");
            }
          });
       // application/ld+json
    })
   

})();


async function getWebsiteContent(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });
    const content = await page.content();
    await browser.close();
    return content;
}

function getAnchors(content) {
    const $ = cheerio.load(content);
    let anchors = [];
     $('a.plantl').each(function() {
         let ref = $(this).attr("href");
         if (anchors.indexOf(ref) == -1) {
          anchors.push(ref)
         }
    })
    return anchors;
}