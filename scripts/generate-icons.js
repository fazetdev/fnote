const fs = require('fs')
const path = require('path')

// SVG content for 192x192
const svg192 = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="192" height="192" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
  <rect width="192" height="192" fill="#0f2e1f"/>
  <path d="M96 48L48 96V144H144V96L96 48Z" fill="#d4af37"/>
  <path d="M96 60L60 96V132H132V96L96 60Z" fill="#1f5a3d"/>
  <text x="96" y="112" font-family="Arial" font-size="22" fill="#d4af37" text-anchor="middle" dy=".3em">F</text>
</svg>`

// SVG content for 512x512  
const svg512 = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#0f2e1f"/>
  <path d="M256 128L128 256V384H384V256L256 128Z" fill="#d4af37"/>
  <path d="M256 160L160 256V352H352V256L256 160Z" fill="#1f5a3d"/>
  <text x="256" y="300" font-family="Arial" font-size="60" fill="#d4af37" text-anchor="middle" dy=".3em">F</text>
</svg>`

// Write SVG files
fs.writeFileSync(path.join(__dirname, '../public/icon-192.svg'), svg192)
fs.writeFileSync(path.join(__dirname, '../public/icon-512.svg'), svg512)

console.log('✅ Created SVG icons')
console.log('Note: For production, convert these to PNG using a tool like:')
console.log('1. convert (ImageMagick): convert public/icon-192.svg public/icon-192.png')
console.log('2. Or use an online converter')
console.log('3. Or install sharp: npm install sharp')
