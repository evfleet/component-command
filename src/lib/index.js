import path from 'path';
import fs from 'fs-extra';

export function createConfig() {
  const currentDir = process.cwd();

  return fs.writeJson(`${currentDir}/component.json`, {
    test: true,
    somethingElse: 1
  }, {
    spaces: 2
  })
}