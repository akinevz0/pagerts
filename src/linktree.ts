const MINIMUM_DEPTH = 1

export class LinkTree {
    url: URL;
    depth: number;
    constructor(url: string, depth: number = MINIMUM_DEPTH) {
        if (depth < MINIMUM_DEPTH)
            throw new Error(`Depth of linktree is lesser than ${MINIMUM_DEPTH}`)
        this.depth = depth
        this.url = validateUrl(url)
    }
    /**
     * 
     * @param depth to pre-traverse
     * @returns a promise to a LoadedLinkTree
     */
    async load(depth: number): Promise<LoadedLinkTree> {
        if (depth < MINIMUM_DEPTH)
            return Promise.reject(`Depth is lesser than ${MINIMUM_DEPTH}`)
        const loaded = new LoadedLinkTree(this.url, depth)
        return Promise.resolve(loaded)
    }

    async prune(depth: number): Promise<LinkTree> {
        throw new Error('Method not implemented.');
    }

    host(): string {
        return this.url.host
    }

    page(): string {
        return this.url.pathname
    }

    header(): string {
        return this.host() + "/" + this.page()
    }
}

function validateUrl(url: string): URL {
    return new URL(url)
}

export class LoadedLinkTree {
    depth: number;
    url: URL;
    constructor(url: URL, depth: number) {
        this.url = url
        this.depth = depth
    }
    contents() {
        throw new Error('Method not implemented.');
    }
}
