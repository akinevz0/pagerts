import type { TreeLike<T> } from "./pagetree";

export class LinkTreeExplorer {
    async run() {
        throw new Error('Method not implemented.');
    }
    linkTree: TreeLike<T>;
    constructor(linkTree: TreeLike<T>) {
        this.linkTree = linkTree
    }
}