import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const rootDir = process.cwd();
const distDir = join(rootDir, "dist");
const publicEntries = ["index.html", "study.html", "home.css", "styles.css", "src"];

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

for (const entry of publicEntries) {
  await cp(join(rootDir, entry), join(distDir, entry), { recursive: true });
}

await writeFile(join(distDir, ".nojekyll"), "");

console.log(`Static site exported to ${distDir}`);
