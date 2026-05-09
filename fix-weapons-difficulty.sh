#!/bin/bash

# Fix TypeScript difficulty property in weapons.ts
echo "Fixing TypeScript errors in weapons.ts..."

# Backup original file
cp src/data/weapons.ts src/data/weapons.ts.backup

# Add difficulty property to all rating objects
sed -i 's/"pvp": [0-9]*/&\n      "difficulty": 5/g' src/data/weapons.ts

echo "TypeScript errors fixed in weapons.ts"
