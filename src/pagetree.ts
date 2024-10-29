import type { LinkTree } from "./linktree";

export class PageTree {
    workDir: string;

    constructor(workDir: string) {
        this.workDir = workDir
    }

    async load(url: string, depth?: number) : Promise<LinkTree> {
        throw new Error('Method not implemented.');
    }

    async purge(url: string) : Promise<void> {
        throw new Error('Method not implemented.');
    }
}

