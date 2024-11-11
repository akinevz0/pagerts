import type { Page } from "puppeteer";
import type { PageTree } from "./pagetree";

const MINIMUM_DEPTH = 1

const checkDepth = (depth: number): number => {
    if (depth < MINIMUM_DEPTH)
        throw new Error(`Depth of linktree is lesser than ${MINIMUM_DEPTH}`)
    return depth
}

export class LinkTree {
    static async fromPage(fresh: Page, depth: number, pagetree: PageTree): Promise<LinkTree> {
        const json = await fresh.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('a'))
            const links = elements.map(a => a.href)
            const children = links.reduce((acc, link) => {
                const [path, key, ...rest] = link.split('/')
                const value = rest.length > 0 ? rest.join('/') : ''
                /**
                 * Recursively builds an object representation of the link tree structure from the links on the page.
                 * The object has keys representing the path segments, and values that are either strings (for leaf nodes)
                 * or nested objects (for intermediate nodes).
                 * This code handles the case where a path segment already exists in the accumulator object, either
                 * by merging the existing value with the new one, or by creating a new nested object.
                 */
                if (acc[path]) {
                    if (acc[path][key]) {
                        acc[path][key] = {
                            ...acc[path][key],
                            [value]: {}
                        }
                    } else {
                        acc[path][key] = {
                            [value]: {}
                        }
                    }
                } else {
                    acc[path] = {
                        [key]: {
                            [value]: {}
                        }
                    }
                }
                return acc
            }, {})
            return children
        })
        return new LinkTree(json, depth)
    }
    json: HyperlinkTree;
    depth: number;

    constructor(json: HyperlinkTree, depth: number = MINIMUM_DEPTH) {
        this.depth = checkDepth(depth)
        this.json = json
    }

}

type HyperlinkTree = {
    [key: string]: HyperlinkTree | string
}
