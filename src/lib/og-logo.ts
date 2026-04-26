import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const SIMPLITE_LOGO_WIDTH = 400;
export const SIMPLITE_LOGO_HEIGHT = 200;

let cached: ArrayBuffer | null = null;

export async function getSimpliteLogo(): Promise<ArrayBuffer> {
  if (cached) return cached;
  const buf = await readFile(
    path.join(process.cwd(), 'public', 'assets', 'simplite-logo-small.png'),
  );
  cached = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  return cached;
}
