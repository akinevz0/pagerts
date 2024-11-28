import { createHash } from "crypto";
import { join } from "path/posix";
import { cwd } from "process";
import { PAGETREE_DATA_DIR } from "./linktree";

type URLBlob = {
    host: string;
    path: string;
};
const urlBlob = (url: URL): URLBlob => {
    return {
        host: url.host,
        path: url.pathname
    };
};
/**
 * Hashes the URL as a locally stored document
 * @param url url to store on the filesystem
 * @param algorithm algorithm to hash with
 * @returns hashed path
 */
export const hashedPath = (url: URL, algorithm: string = 'sha256'): string => {
    const blob = urlBlob(url);
    let outputPath = join(cwd(), PAGETREE_DATA_DIR);
    for (const key in blob) {
        const hash = createHash(algorithm);
        hash.update(blob[key]);
        outputPath = join(outputPath, hash.digest('hex'));
    }
    return outputPath;
};
