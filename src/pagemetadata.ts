import { createHash } from "crypto";


export class PageMetadata {
    hash: string;
    lastModified: Date;

    currentHash(): string {
        const currentHash = createHash('sha256')
            .update(this.title + this.path + this.url)
            .digest('hex');
        return currentHash;
    }
    broken(): boolean {
        return this.currentHash() !== this.hash;
    }
    title: string;
    path: string;
    url: string;
    constructor(title: string, path: string, hash: string, url: string) {
        this.title = title;
        this.path = path;
        this.hash = hash;
        this.url = url;
    }
}
