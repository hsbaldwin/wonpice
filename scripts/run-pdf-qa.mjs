import { mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';

// Bundle our TSX as ESM while leaving dependencies external. React PDF's current
// pure-ESM packages cannot be loaded through the tsx CommonJS CLI in this project.
await mkdir('tmp/pdfs', { recursive: true });
const outfile = path.resolve('tmp/pdfs/qa.mjs');
await build({
  entryPoints: ['scripts/qa-pdf.tsx'],
  platform: 'node',
  format: 'esm',
  bundle: true,
  packages: 'external',
  outfile,
});
await import(pathToFileURL(outfile).href);
