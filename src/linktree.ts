import type { Page } from "puppeteer";
import type { TreeLike } from "./treelike";
import { TreeLikeReader } from "./reader";

export type LinkMetadata = {
    url: URL,
}

export class LinkTree<T = LinkMetadata> implements TreeLike<T> {
    contents(): string {
        return new TreeLikeReader(this).contents()
    }

    children: LinkTree<T>[];
    metadata: T;

    constructor(metadata: T) {
        this.metadata = metadata
    }
}

