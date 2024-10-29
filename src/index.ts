import { program } from 'commander'
import { PageTree } from './pagetree.ts'
import { LinkTree } from './linktree.ts'
import { LinkTreeExplorer } from './explorer.ts'

const pageTree = new PageTree(process.cwd())

program
    .name('pagetree')
    .version('0.0.1')
    .description('A CLI tool to explore hyperlinks from a webpage')

program.command('load')
    .description('download a linktree of a webpage')
    .option('-d, --depth <number>', 'the depth of the linktree to preload')
    .option('-f, --fresh', 'force a fresh download of the linktree')
    .argument('<url>', 'the URL of the webpage from which a linktree will be made')
    .action(async (options: { depth: number, fresh: boolean }, url: string) => {
        const linkTree = await pageTree.load(url)
        await linkTree.load(options.depth)
    })

// TODO: <<IMPLEMENTATION>>: store the linktrees on the file system or database?
program.command('purge')
    .description('purge a linktree. Completely removes the linktree from cache')
    .argument('<url>', 'the URL of the webpage which will be purged')
    .action(async (url: string) => {
        await pageTree.purge(url)
    })

program.command('prune')
    .description('prune a linktree. Removes the links of specified depth from the linktree cache')
    .option('-d, --depth <number>', 'the depth of the resulting linktree', '1')
    .argument('<url>', 'the URL of the webpage which will be pruned')
    .action(async (options: { depth: number }, url: string) => {
        const linkTree = await pageTree.load(url)
        await linkTree.prune(options.depth)
    })

program.command('explore')
    .description('explore a webpage interactively using the terminal')
    .option('-d, --depth <number>', 'the depth of the linktree to pre-load', '1')
    .option('-f, --fresh', 'force a fresh download of the linktree')
    .argument('<url>', 'the URL of the webpage')
    .action(async (options: { depth: number }, url: string) => {
        const linkTree = await pageTree.load(url, options.depth)
        const explorer = new LinkTreeExplorer(linkTree)
        await explorer.run()
    })

program.command('gui-explore')
    .description('explore a webpage interactively using the GUI')
    .option('-d, --depth <number>', 'the depth of the linktree', '1')
    .option('-f, --fresh', 'force a fresh download of the linktree')
    .argument('<url>', 'the URL of the webpage')
    .action(async (options: { depth: number }, url: string) => {
        throw new Error("Function not implemented.");
    })


program.parse()