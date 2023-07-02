import { existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync } from 'fs';
import { join } from 'path';

const deleteFolderRecursive = function (directoryPath) {
if (existsSync(directoryPath)) {
    readdirSync(directoryPath).forEach((file, _) => {
      const curPath = join(directoryPath, file);
      if (lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        unlinkSync(curPath);
      }
    });
    rmdirSync(directoryPath);
  }
};

deleteFolderRecursive("./build");