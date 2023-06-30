import fs from 'node:fs/promises';

// __dirname is not working with ES modules
const dirname = process.cwd();

fs.readdir(dirname)
  .then(files => {
    console.dir({ dirname, files });
    return Promise.all(
      files.map(async (fileName) => {
        const stats = await fs.stat(fileName);
        return {
          Name: fileName,
          Size: stats.size,
          Date: stats.mtime,
        };
      }),
    );
  })
  .then(result => console.table(result));