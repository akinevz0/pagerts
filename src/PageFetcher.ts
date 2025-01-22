import { JSDOM } from 'jsdom';
export class PageFetcher {
    async fetchPage(url: string): Promise<JSDOM> {
        return JSDOM.fromURL(url);
    }
}