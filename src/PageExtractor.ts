import { JSDOM } from "jsdom";
import { TagByNameExtractor } from './extractors/TagByNameExtractor';

import { DocumentExtractor } from "./DocumentExtractor";
import type { PageContent } from "./PageContent";
import type { Resource } from "./tags";

abstract class AbstractPageExtractor {
    constructor(private readonly plugins: DocumentExtractor<Resource>[]) { }
    async executePlugins(document: JSDOM): Promise<PageContent> {
        const url = document.window.location.href;
        const title = document.window.document.title;
        let resources: Resource[] = [];
        for (const plugin of this.plugins) {
            const result = await plugin.execute(document);
            if (result) resources.push(...result);
        }
        return { title, url, resources };
    }
}

export default class PageExtractor extends AbstractPageExtractor {
    constructor(...tags: string[]) {
        super(tags.map(tag => new TagByNameExtractor(tag)));
    }
}