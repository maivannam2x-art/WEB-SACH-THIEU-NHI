import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const output = new URL('./dist/', import.meta.url);
// Publish only the public website. Account configuration never enters dist.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'styles.css', 'script.js', 'assets']) {
  await cp(new URL(name, import.meta.url), new URL(name, output), { recursive: true });
}
console.log(`Built Cánh Giấy: ${fileURLToPath(output)}`);
