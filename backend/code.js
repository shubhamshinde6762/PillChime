const fs = require('fs');
const path = require('path');

// Function to read a file and return its content
const readFile = filePath => {
  return fs.readFileSync(filePath, 'utf8');
};

// Function to read all files in a directory recursively and return their combined contents with file paths
const readDirectory = dirPath => {
  let content = '';

  // Read all items in the directory
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile()) {
      // If it's a file, add its path and content
      content += `File: ${itemPath}\n`;
      content += readFile(itemPath) + '\n';
    } else if (stats.isDirectory()) {
      // If it's a directory, recurse into it
      content += readDirectory(itemPath);
    }
  });

  return content;
};

// Main function to combine contents of all the files
const main = () => {
  try {
    const indexContent = `FILE: index.js\n${readFile('index.js')}\n`;
    const configsContent = readDirectory('configs');
    const controllersContent = readDirectory('controllers');
    const middlewaresContent = readDirectory('middlewares');
    const modelsContent = readDirectory('models');
    const routesContent = readDirectory('routes');

    const combinedContent =
      indexContent +
      '\n' +
      configsContent +
      '\n' +
      controllersContent +
      '\n' +
      middlewaresContent +
      '\n' +
      modelsContent +
      '\n' +
      routesContent;

    fs.writeFileSync('code.txt', combinedContent, 'utf8');
    console.log('Contents written to code.txt');
  } catch (err) {
    console.error('Error:', err);
  }
};

// Execute the main function
main();
