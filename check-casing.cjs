const fs = require('fs');
const path = require('path');

function checkDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            checkDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const importRegex = /import.*?from\s+['"]([^'"]+)['"]/g;
            let match;
            while ((match = importRegex.exec(content)) !== null) {
                const importPath = match[1];
                if (importPath.startsWith('.')) {
                    // It's a relative path
                    const absoluteImportPath = path.resolve(path.dirname(fullPath), importPath);
                    // Check if file exists with exact casing
                    try {
                        let resolvedPath = absoluteImportPath;
                        if (fs.existsSync(absoluteImportPath + '.jsx')) resolvedPath += '.jsx';
                        else if (fs.existsSync(absoluteImportPath + '.js')) resolvedPath += '.js';
                        else if (fs.existsSync(absoluteImportPath + '.webp')) resolvedPath += '.webp';
                        else if (fs.existsSync(absoluteImportPath + '.jpg')) resolvedPath += '.jpg';
                        else if (fs.existsSync(absoluteImportPath + '.png')) resolvedPath += '.png';
                        else if (fs.existsSync(absoluteImportPath + '.css')) resolvedPath += '.css';
                        else if (fs.existsSync(absoluteImportPath + '/index.js')) resolvedPath += '/index.js';
                        else if (fs.existsSync(absoluteImportPath + '/index.jsx')) resolvedPath += '/index.jsx';
                        
                        if (!fs.existsSync(resolvedPath)) {
                             console.error(`Missing file: ${resolvedPath} imported in ${fullPath}`);
                             continue;
                        }

                        // Check exact casing by comparing to fs.readdirSync
                        const dirname = path.dirname(resolvedPath);
                        const basename = path.basename(resolvedPath);
                        const actualFiles = fs.readdirSync(dirname);
                        if (!actualFiles.includes(basename)) {
                            console.error(`CASE MISMATCH: imported '${basename}' but found in dir [${actualFiles.join(', ')}]. File: ${fullPath}`);
                        }
                    } catch (e) {
                        console.error(`Error resolving ${importPath} in ${fullPath}`);
                    }
                }
            }
        }
    }
}

checkDirectory(path.join(__dirname, 'src'));
console.log('Check complete.');
