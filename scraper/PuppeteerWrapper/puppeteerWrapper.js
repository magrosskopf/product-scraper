
const puppeteer = require("puppeteer");

class puppeteerWrapper {
    constructor() {
        this.options = {
            executablePath: '/usr/bin/chromium-browser',
            args: ['--no-sandbox']
        }
    }

    async getWebsiteContent(url) {
        const page = await this.browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        const content = await page.content();
        await page.close()
        return content;
    }

    async launch() {
        this.browser = await puppeteer.launch(this.options);
    }

}

module.exports = puppeteerWrapper