const fs = require('fs');
const path = require('path');

// Функция для добавления поля difficulty ко всем объектам оружия
function fixWeaponsDifficulty() {
  const weaponsPath = path.join(__dirname, 'src', 'data', 'weapons.ts');
  let content = fs.readFileSync(weaponsPath, 'utf8');
  
  // Находим все объекты оружия и добавляем поле difficulty
  const lines = content.split('\n');
  let inWeaponObject = false;
  let hasDifficulty = false;
  let braceDepth = 0;
  
  const fixedLines = lines.map((line, index) => {
    // Отслеживаем вложенность фигурных скобок
    const openBraces = (line.match(/{/g) || []).length;
    const closeBraces = (line.match(/}/g) || []).length;
    braceDepth += openBraces - closeBraces;
    
    // Начало объекта оружия
    if (line.includes('slug:') && !inWeaponObject) {
      inWeaponObject = true;
      hasDifficulty = false;
    }
    
    // Проверяем наличие поля difficulty
    if (inWeaponObject && line.includes('difficulty:')) {
      hasDifficulty = true;
    }
    
    // Добавляем поле difficulty после pvp, если его нет
    if (inWeaponObject && 
        line.includes('pvp:') && 
        !hasDifficulty && 
        braceDepth > 0) {
      
      // Находим значение pvp
      const pvpMatch = line.match(/pvp:\s*(\d+)/);
      if (pvpMatch) {
        const pvpValue = parseInt(pvpMatch[1]);
        // Вычисляем difficulty на основе pvp (обратная логика)
        let difficultyValue;
        if (pvpValue >= 8) difficultyValue = 3;
        else if (pvpValue >= 6) difficultyValue = 2;
        else if (pvpValue >= 4) difficultyValue = 1;
        else difficultyValue = 0;
        
        // Вставляем поле difficulty после pvp
        const indentation = line.match(/^(\s*)/)[1];
        return line + `\n${indentation}difficulty: ${difficultyValue},`;
      }
    }
    
    // Конец объекта оружия
    if (inWeaponObject && braceDepth === 0 && line.includes('}')) {
      inWeaponObject = false;
    }
    
    return line;
  });
  
  // Записываем исправленный файл
  const fixedContent = fixedLines.join('\n');
  fs.writeFileSync(weaponsPath, fixedContent, 'utf8');
  
  console.log('✅ Файл weapons.ts исправлен - добавлено поле difficulty ко всем объектам');
}

// Запуск исправления
try {
  fixWeaponsDifficulty();
} catch (error) {
  console.error('❌ Ошибка при исправлении файла:', error);
}
