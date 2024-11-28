import puppeteer, { type Browser, type Page } from "puppeteer";

export default class Downloader {
    browser: Browser;
    async initialise() {
        if (!this.browser)
            this.browser = await puppeteer.launch({ headless: true, })
    }

    async page(url:URL): Promise<Page> {
        await this.initialise()
        const page = await this.browser.newPage()
        const response = await page.goto(url.href)
        if (response && response.status() !== 200)
            throw new Error(`Failed to download page at ${url.href}`)
        return page
    }
    async download(url: URL, depth: number, fresh: boolean): Promise<Page> {
        const page = await this.browser.newPage()
        await page.goto(url.href)
        return page
    }

}