import { LinkTree } from "./linktree";

export class PageTree {
    workDir: string;

    constructor(workDir: string) {
        this.workDir = workDir
    }

    async load(url: string, depth: number, fresh: boolean = false) : Promise<LinkTree> {
        const linkTree = new LinkTree(url).load(depth)
        throw new Error('Method not implemented.');
    }

    async purge(url: string) : Promise<LinkTree> {
        throw new Error('Method not implemented.');
    }
}

