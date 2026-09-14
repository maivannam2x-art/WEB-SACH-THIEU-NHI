import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const output = new URL('./dist/', import.meta.url);
const projectDirectory = dirname(fileURLToPath(import.meta.url));
if (resolve(fileURLToPath(output)) !== resolve(projectDirectory, 'dist')) {
  throw new Error('Build output must stay inside the project dist directory.');
}
// Publish only the public website. Account configuration never enters dist.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'styles.css', 'script.js', 'assets']) {
  await cp(new URL(name, import.meta.url), new URL(name, output), { recursive: true });
}
console.log(`Built Cánh Giấy: ${fileURLToPath(output)}`);
