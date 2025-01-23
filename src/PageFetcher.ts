import { JSDOM } from 'jsdom';
export class PageFetcher {
    async fetchPage(url: string): Promise<JSDOM> {
        try {
            return JSDOM.fromURL(url);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}