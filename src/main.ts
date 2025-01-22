import Commander from "commander";
import PageExtractor from "./PageExtractor";
import { PageFetcher } from "./PageFetcher";

const program = new Commander.Command();

const url = Commander.createArgument("<url|file...>", "remote URL or local file to extract remote resources from");

// const fetch = Commander.createOption("-f, --fetch", "download and parse all remote resources from a web page");
// const extract = Commander.createOption("-e, --extract", "extract all remote resources from the web page");

(async () => {
  const package_json = (await import("../package.json")).default;

  const program_name = package_json.name;
  const program_version = package_json.version;
  const program_description = package_json.description;


  await program
    .name(program_name)
    .version(program_version, "-v, --version")
    .description(program_description)
    .addArgument(url)
    .action(async (urls: string[]) => {
      console.log("Extracting resources from:", urls.join(", "))
      const extractor = new PageExtractor('a', 'img', 'script')
      const pageFetcher = new PageFetcher()
      const pages = await Promise.all(urls.map(u => pageFetcher.fetchPage(u)))
      const resources = await Promise.all(pages.map(p => extractor.executePlugins(p)))
      resources.forEach(({ url, title, resources }) => {
        console.log(`Resource from ${url}`)
        console.log(`\tTitle: ${title}`)
        console.log(`Resources:`)
        resources.forEach(({ innerHTML }) => {
          console.log(`${innerHTML}`)
        })
      });
      // const pagePrinter = new PageContentPrinter()
      // pagePrinter.printResources(resources)
    })
    .parseAsync(process.argv);
})();
