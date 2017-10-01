import path from 'path';
import fs from 'fs-extra';
import program from 'commander';

import configTemplate from 'templates/config';

const currentDir = process.cwd();

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
        await fs.writeJson(configFile, configTemplate, { spaces: 2 })
      }
    } catch (error) {
      console.log(error);
    }
  });

program
  .command('create [components...]')
  // .alias('c')
  .option('-f, --folder', 'create a folder with an index.js exporting component')
  .action(async function(components) {
    try {
      const config = await fs.readJson(`${currentDir}/config.json`);

      console.log(config);

    } catch (error) {
      console.log('error', error);
    }

    /*
    fs.readJson(`${currentDir}/config.json`).then((config) => {
      console.log(config);
    }).catch((error) => {
      console.log(error);
    })

    if (!this.folder) {


      console.log('no folders');

    } else {
      console.log('create the folders');
    }



    console.log(components)
    */
  });

program.parse(process.argv);



