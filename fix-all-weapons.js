const fs = require('fs');
const path = require('path');

// Read weapons.ts
const weaponsPath = path.join(__dirname, 'src/data/weapons.ts');
let weaponsContent = fs.readFileSync(weaponsPath, 'utf8');

// Add difficulty property to all rating objects
weaponsContent = weaponsContent.replace(
  /"rating":\s*\{([^}]+)\}/g,
  (match, ratingContent) => {
    // Check if difficulty already exists
    if (ratingContent.includes('"difficulty"')) {
      return `"rating":{${ratingContent}}`;
    }
    
    // Add difficulty before closing brace
    const fixedContent = ratingContent.replace(/(\s*"pvp":\s*[0-9]+)\s*/g, '$1,\n      "difficulty": 5');
    return `"rating":{${fixedContent}}`;
  }
);

// Write back to file
fs.writeFileSync(weaponsPath, weaponsContent);
console.log('✅ Fixed TypeScript errors in weapons.ts - added difficulty property to all weapons');
