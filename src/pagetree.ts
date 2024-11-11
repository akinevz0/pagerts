import puppeteer, { type Browser, type Page } from "puppeteer";
import { LinkTree } from "./linktree";
import { cwd } from "node:process";
import { join } from "node:path";
import { mkdir, readFile, rmdir, stat, writeFile } from "node:fs/promises";
import type { PageMetadata } from "./pagemetadata";
import { hashedPath } from "./hashedpath";
import Downloader from "./downloader";

export const PAGETREE_OFF_DIR = 'pagetree'

/**
 * A class that represents a Tree of hyperlinks belonging to a webpage
 */
export class PageTree {
    /**
     * the URL of the webpage from which a linktree will be made
     */
    url: URL;

    /**
     * root directory to where the linktree will be stored
     */
    workDir: string;

    /**
     * instance of puppeteer's browser for this session
     */
    downloader: Downloader;

    /**
     * the directory where the linktrees will be stored
     */
    linksDir: string;

    constructor(url: string, workDir: string = cwd()) {
        this.url = new URL(url)
        this.workDir = workDir
        this.linksDir = join(workDir, PAGETREE_OFF_DIR)
        this.downloader = new Downloader()
    }

    async load(fresh: boolean = false, depth: number = 1): Promise<LinkTree> {
        await this.downloader.initialise()
        const metadata = this.metadata(depth)
        const path = hashedPath(this.url)
        if (fresh || (await metadata)?.broken() ) {
            const fresh = await this.downloader.get(this.url);
            // TODO: implement caching
            return LinkTree.fromPage(fresh, depth, this)
        }
        const data = await readFile(path, 'utf8')
        const json = JSON.parse(data)
        return new LinkTree(json, depth)
    }

    async isLocal() {
        const path = hashedPath(this.url)
        // check if path exists
        const stats = await stat(path)
        return stats.isDirectory()
    }



    async metadata(depth?: number): Promise<PageMetadata> {

    }

    async purge(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async prune(depth: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

