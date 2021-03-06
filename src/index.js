import path from 'path';
import fs from 'fs-extra';
import program from 'commander';

import { entryTemplate, fileTemplate } from 'templates';

program
  .command('init')
  .option('-y --yes', 'say yes to all options with defaults')
  .action(async function() {
    try {
      const configFile = './component.json';
      const exists = await fs.pathExists(configFile);

      if (exists) {
        console.info('exists');
      } else {
        await fs.writeJson(configFile, templates.config, { spaces: 2 })
      }
    } catch (error) {
      console.log(error);
    }
  });

program
  .command('generate [components...]')
  // .alias('c')
  .option('-b, --base <base>', 'base folder to append to all components')
  .action(async function(components, options) {
    try {
      components.map(async (componentPath) => {
        const baseURL = this.base ? `${this.base}/` : '';
        const { folderPath, componentName } = splitString(componentPath);

        await Promise.all([
          fs.outputFile(`${baseURL}${componentPath}/index.js`, entryTemplate.replace(/%n/g, componentName)),
          fs.outputFile(`${baseURL}${componentPath}/${componentName}.js`, fileTemplate.replace(/%n/g, componentName))
        ])
      });
    } catch (error) {
      console.log('error', error);
    }
  });

program.parse(process.argv);

function splitString(component) {
  if (component.includes('/')) {
    return {
      folderPath: component.substring(0, component.lastIndexOf('/') + 1),
      componentName: component.substring(component.lastIndexOf('/') + 1)
    }
  } else {
    return {
      componentName: component
    }
  }
}



