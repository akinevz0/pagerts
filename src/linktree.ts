import fetch from 'node-fetch'

export class LinkTree {
    url: URL;
    constructor(url: string) {
        this.url = validateUrl(url)
    }
    async load(depth: number) {
        throw new Error('Method not implemented.');
    }

    async prune(depth: number) {
        throw new Error('Method not implemented.');
    }
}

function validateUrl(url: string): URL {
    throw new Error("Function not implemented.");
}