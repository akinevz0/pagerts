import puppeteer, { type Browser, type Page } from "puppeteer";

export default class Downloader {
    browser: Browser;
    async initialise() {
        if (!this.browser)
            this.browser = await puppeteer.launch({ headless: true, })
    }
    async get(url: URL): Promise<Page> {
        const page = await this.browser.newPage()
        await page.goto(url.href)
        return page
    }

}