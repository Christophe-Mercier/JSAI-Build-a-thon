import fs from "fs";
import path from "path";

// Générateur d'images SVG pour les produits
function generateSVGImage(type, name, color) {
  let svgContent = '';
  
  switch(type) {
    case 'tent':
      svgContent = `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:#2e7d32;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="#f0f8f0"/>
          <polygon points="100,50 160,130 40,130" fill="url(#tentGrad)" stroke="#1b5e20" stroke-width="2"/>
          <polygon points="100,50 130,90 70,90" fill="#81c784" opacity="0.7"/>
          <rect x="90" y="120" width="20" height="15" fill="#5d4037"/>
          <circle cx="85" cy="140" r="3" fill="#424242"/>
          <circle cx="115" cy="140" r="3" fill="#424242"/>
          <line x1="70" y1="130" x2="65" y2="140" stroke="#424242" stroke-width="2"/>
          <line x1="130" y1="130" x2="135" y2="140" stroke="#424242" stroke-width="2"/>
          <text x="100" y="170" font-family="Arial" font-size="12" text-anchor="middle" fill="#2e7d32">${name}</text>
        </svg>`;
      break;
    
    case 'backpack':
      svgContent = `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="backpackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:#e65100;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="#fff3e0"/>
          <rect x="60" y="50" width="80" height="100" rx="10" fill="url(#backpackGrad)" stroke="#bf360c" stroke-width="2"/>
          <rect x="70" y="60" width="60" height="25" rx="5" fill="#ffcc02" opacity="0.8"/>
          <rect x="70" y="90" width="60" height="15" rx="3" fill="#455a64" opacity="0.6"/>
          <rect x="70" y="110" width="60" height="15" rx="3" fill="#455a64" opacity="0.6"/>
          <circle cx="75" cy="75" r="2" fill="#bf360c"/>
          <circle cx="125" cy="75" r="2" fill="#bf360c"/>
          <path d="M75,50 Q75,40 85,40 L115,40 Q125,40 125,50" stroke="${color}" stroke-width="3" fill="none"/>
          <rect x="50" y="70" width="8" height="40" rx="4" fill="#795548"/>
          <rect x="142" y="70" width="8" height="40" rx="4" fill="#795548"/>
          <text x="100" y="170" font-family="Arial" font-size="12" text-anchor="middle" fill="#e65100">${name}</text>
        </svg>`;
      break;
    
    case 'jacket':
      svgContent = `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1565c0;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="#e3f2fd"/>
          <path d="M70,60 Q70,50 100,50 Q130,50 130,60 L130,130 L70,130 Z" fill="url(#jacketGrad)" stroke="#0d47a1" stroke-width="2"/>
          <rect x="85" y="70" width="30" height="50" fill="#1976d2" opacity="0.7"/>
          <circle cx="110" cy="80" r="2" fill="#ffffff"/>
          <circle cx="110" cy="95" r="2" fill="#ffffff"/>
          <circle cx="110" cy="110" r="2" fill="#ffffff"/>
          <path d="M60,70 Q55,65 60,60 L70,65" fill="url(#jacketGrad)" stroke="#0d47a1" stroke-width="1"/>
          <path d="M140,70 Q145,65 140,60 L130,65" fill="url(#jacketGrad)" stroke="#0d47a1" stroke-width="1"/>
          <rect x="75" y="125" width="15" height="8" rx="2" fill="#424242"/>
          <rect x="110" y="125" width="15" height="8" rx="2" fill="#424242"/>
          <text x="100" y="160" font-family="Arial" font-size="12" text-anchor="middle" fill="#1565c0">${name}</text>
        </svg>`;
      break;
    
    case 'pants':
      svgContent = `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:#4e342e;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="#efebe9"/>
          <rect x="70" y="50" width="60" height="20" rx="3" fill="url(#pantsGrad)"/>
          <rect x="75" y="70" width="25" height="70" fill="url(#pantsGrad)" stroke="#3e2723" stroke-width="1"/>
          <rect x="100" y="70" width="25" height="70" fill="url(#pantsGrad)" stroke="#3e2723" stroke-width="1"/>
          <rect x="80" y="80" width="15" height="8" rx="2" fill="#616161" opacity="0.7"/>
          <rect x="105" y="80" width="15" height="8" rx="2" fill="#616161" opacity="0.7"/>
          <circle cx="85" cy="60" r="1.5" fill="#ffc107"/>
          <line x1="90" y1="57" x2="110" y2="57" stroke="#3e2723" stroke-width="1"/>
          <text x="100" y="170" font-family="Arial" font-size="12" text-anchor="middle" fill="#5d4037">${name}</text>
        </svg>`;
      break;
    
    case 'boots':
      svgContent = `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bootsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:#3e2723;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="#f3e5f5"/>
          <ellipse cx="100" cy="120" rx="40" ry="15" fill="url(#bootsGrad)"/>
          <rect x="80" y="70" width="40" height="50" rx="5" fill="url(#bootsGrad)" stroke="#2e2e2e" stroke-width="2"/>
          <rect x="85" y="75" width="30" height="8" rx="2" fill="#8d6e63" opacity="0.8"/>
          <rect x="85" y="90" width="30" height="8" rx="2" fill="#8d6e63" opacity="0.8"/>
          <rect x="85" y="105" width="30" height="8" rx="2" fill="#8d6e63" opacity="0.8"/>
          <circle cx="90" cy="79" r="1" fill="#424242"/>
          <circle cx="110" cy="79" r="1" fill="#424242"/>
          <circle cx="90" cy="94" r="1" fill="#424242"/>
          <circle cx="110" cy="94" r="1" fill="#424242"/>
          <circle cx="90" cy="109" r="1" fill="#424242"/>
          <circle cx="110" cy="109" r="1" fill="#424242"/>
          <path d="M80,120 Q75,125 80,130 L120,130 Q125,125 120,120" fill="#2e2e2e"/>
          <text x="100" y="160" font-family="Arial" font-size="12" text-anchor="middle" fill="#5d4037">${name}</text>
        </svg>`;
      break;
  }
  
  return svgContent;
}

// Générer toutes les images
const products = [
  { filename: "tent1.jpg", type: "tent", name: "TrailMaster X4", color: "#66bb6a" },
  { filename: "tent2.jpg", type: "tent", name: "Alpine Explorer", color: "#4caf50" },
  { filename: "tent3.jpg", type: "tent", name: "SkyView 2P", color: "#81c784" },
  { filename: "backpack1.jpg", type: "backpack", name: "Adventurer Pro", color: "#ff9800" },
  { filename: "backpack2.jpg", type: "backpack", name: "Summit Climber", color: "#f57c00" },
  { filename: "backpack3.jpg", type: "backpack", name: "TrailLite Day", color: "#ffb74d" },
  { filename: "jacket.jpg", type: "jacket", name: "Summit Trek", color: "#42a5f5" },
  { filename: "pants.jpg", type: "pants", name: "Trail Blaze", color: "#8d6e63" },
  { filename: "boots.jpg", type: "boots", name: "TrekStar", color: "#6d4c41" }
];

console.log("🎨 Génération des images SVG des produits...");

products.forEach(product => {
  const svgContent = generateSVGImage(product.type, product.name, product.color);
  const svgFilename = product.filename.replace('.jpg', '.svg');
  fs.writeFileSync(path.join(process.cwd(), svgFilename), svgContent);
  console.log(`✅ ${svgFilename} créé`);
});

console.log("🎉 Toutes les images ont été générées avec succès!");
