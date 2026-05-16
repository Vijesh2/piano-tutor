import { copyFile, mkdir, readdir } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

const distDir = join(process.cwd(), "dist");

async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await findHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

const htmlFiles = await findHtmlFiles(distDir);

for (const file of htmlFiles) {
  const routePath = relative(distDir, file);

  if (routePath === "index.html" || routePath.endsWith("/index.html")) {
    continue;
  }

  const withoutExtension = routePath.slice(0, -".html".length);
  const cleanUrlIndex = join(distDir, withoutExtension, "index.html");

  await mkdir(dirname(cleanUrlIndex), { recursive: true });
  await copyFile(file, cleanUrlIndex);
}
