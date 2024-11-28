import type { LinkTree } from "./linktree";


export type Reader<T> = (data: T) => string;

export class TreeLikeReader<T> {
    tree: LinkTree<T>;

    contents(): string {
        const repr = {
            node: this.nodeReader(this.tree),
            data: this.dataReader(this.tree.metadata)
        };
        return JSON.stringify(repr);
    }

    nodeReader: Reader<LinkTree<T>>;
    dataReader: Reader<T>;

    constructor(tree: LinkTree<T>) {
        this.tree = tree;
    }
}
