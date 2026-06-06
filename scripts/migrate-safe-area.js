const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('SafeAreaView') && content.match(/import\s+\{[^}]*SafeAreaView[^}]*\}\s+from\s+['"]react-native['"]/)) {
    // Check if SafeAreaView is the ONLY import
    if (content.match(/import\s+\{\s*SafeAreaView\s*\}\s+from\s+['"]react-native['"];?/)) {
      content = content.replace(/import\s+\{\s*SafeAreaView\s*\}\s+from\s+['"]react-native['"];?\n?/, '');
    } else {
      // Remove SafeAreaView from the list
      content = content.replace(/,\s*SafeAreaView\b/g, '');
      content = content.replace(/\bSafeAreaView\s*,\s*/g, '');
      content = content.replace(/\{\s*SafeAreaView\s*\}/g, '{}'); // fallback just in case
    }
    
    // Check if import { SafeAreaView } from 'react-native-safe-area-context' already exists
    if (!content.includes("'react-native-safe-area-context'") && !content.includes('"react-native-safe-area-context"')) {
      const newImport = `import { SafeAreaView } from 'react-native-safe-area-context';\n`;
      // insert at top
      content = newImport + content;
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
