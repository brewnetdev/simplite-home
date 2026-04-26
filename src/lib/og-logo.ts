import { readFileSync } from 'fs';
import path from 'path';

const logoBuffer = readFileSync(
  path.join(process.cwd(), 'public/assets/simplite-logo-small.png')
);

export const SIMPLITE_LOGO_DATA_URL = `data:image/png;base64,${logoBuffer.toString('base64')}`;
export const SIMPLITE_LOGO_WIDTH = 400;
export const SIMPLITE_LOGO_HEIGHT = 200;
