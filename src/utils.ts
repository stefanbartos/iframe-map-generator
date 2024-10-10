import fs from 'node:fs';
import { OUTPUT_FILENAME_PATH, OUTPUT_FOLDER } from './constants.js';

export const writeOutput = (output: string) => {
  if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER);
  }
  fs.writeFileSync(OUTPUT_FILENAME_PATH, output);
};
