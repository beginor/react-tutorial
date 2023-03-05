import { createOptions, buildOrWatch } from './scripts/esbuild-helper.mjs';

const options = createOptions(
  [
    './src/main.tsx'
  ],
  './dist/'
);
options.packages = '';
buildOrWatch(options);
