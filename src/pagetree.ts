import Downloader from "./downloader";
import { LinkTree, type LinkMetadata } from "./linktree";
import type { Page } from "puppeteer";

export type PageMetadata = LinkMetadata & {
    title: string,
}

export const createMetadata = async (page: Page): Promise<PageMetadata> => {
    return {
        url: new URL(page.url()),
        title: await page.title(),
    }
}

/**
 * A class that represents a Tree of hyperlinks belonging to a webpage
 */
export class PageTree extends LinkTree<PageMetadata, PageTree> {

    /**
     * page object of the webpage
     * source of the links 
     */
    page: Page;

    /**
     * instance of puppeteer's browser for this session
     */
    downloader: Downloader;

    constructor(metadata: PageMetadata, downloader: Downloader = new Downloader()) {
        super(metadata)
        this.downloader = downloader
    }

    async load(fresh: boolean = false): Promise<LoadedPageTree> {
        if (!fresh && this.children)
            return new LoadedPageTree(this.metadata, this.children)
        this.page = await this.downloader.page(this.metadata.url)
        const links = extractLinks(this.page)
        
    }

}

export class LoadedPageTree extends LinkTree<PageMetadata> {
    constructor(metadata: PageMetadata, children: LinkTree<PageMetadata>[]) {
        super(metadata)
        this.children = children
    }
}

async function extractLinks(page: Page): Promise<HTMLAnchorElement[]> {
    const linkSelector = "a[href]"
    const isAnchor = (element: Element): element is HTMLAnchorElement => element instanceof HTMLAnchorElement && typeof element.href === 'string' && element.href.length > 0
    const links = page.evaluate((selector) => {
        const elements = document.querySelectorAll(selector)
        return Array.from(elements)
            .filter(element => isAnchor(element))
    }, linkSelector)
    return links
}

