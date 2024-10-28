import { program } from 'commander'
import { PageTree } from './pagetree.ts'
import { LinkTree } from './linktree.ts'
import { LinkTreeExplorer } from './explorer.ts'

const pageTree = new PageTree()

program
    .name('pagetree')
    .version('0.0.1')
    .description('A CLI tool to explore hyperlinks from a webpage')

program.command('load')
    .description('Download a linktree of webpage to a specified depth')
    .option('-d, --depth <number>', 'The depth of the linktree')
    .argument('<url>', 'The URL of the webpage from which a linktree will be made')
    .action(async (options: { depth: number }, url: string) => {
        const linkTree = new LinkTree(url)
        await linkTree.load(options.depth)
    })

// TODO: <<IMPLEMENTATION>>: store the linktrees on the file system or database?
program.command('purge')
    .description('Purge a linktree. Completely removes the linktree from cache')
    .argument('<url>', 'The URL of the webpage which will be purged')
    .action(async (url: string) => {
        const 
    })

program.command('prune')
    .description('Prune a linktree. Removes the links of depth d from the linktree cache')
    .option('-d, --depth <number>', 'The depth of the resulting linktree', '1')
    .argument('<url>', 'The URL of the webpage which will be pruned')

program.command('explore')
    .description('Explore a webpage interactively using the terminal')
    .option('-d, --depth <number>', 'The depth of the linktree to pre-load', '1')
    .argument('<url>', 'The URL of the webpage')
    .action(async (options: { depth: number }, url: string) => {
        const pageTree = new PageTree(url)
        const linkTree = await pageTree.load(options.depth)
        const explorer = new LinkTreeExplorer(linkTree)
        await explorer.run()
    })

program.command('gui-explore')
    .description('Explore a webpage interactively using the GUI')
    .option('-d, --depth <number>', 'The depth of the linktree', '1')
    .argument('<url>', 'The URL of the webpage')
    .action(async (options: { depth: number }, url: string) => {
        throw new Error("Function not implemented.");
    })


program.parse()



const options = program.opts()
