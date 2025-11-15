# 📥 Agpeya App - Download & Setup Guide

## Download Instructies

### Optie A: Export vanuit Figma Make (Makkelijkst)

1. Klik op het **menu** (☰) in Figma Make
2. Kies **"Export"** of **"Download"**
3. Download de .zip file
4. Unzip naar een folder: `agpeya-app`
5. Klaar! Ga naar "Setup op je Computer" hieronder

---

### Optie B: Handmatig Downloaden

Als er geen export optie is, kopieer deze bestanden handmatig:

**Belangrijkste bestanden:**
- `index.html`
- `App.tsx`
- Hele `components/` folder
- Hele `data/` folder
- Hele `styles/` folder
- Hele `public/` folder
- `package.json` (zie hieronder)
- `tsconfig.json` (zie hieronder)
- `vite.config.ts` (zie hieronder)

---

## Setup op je Computer

### Vereisten

Installeer eerst:
- **Node.js**: Download van [nodejs.org](https://nodejs.org) (LTS versie)
- **Code Editor**: [VS Code](https://code.visualstudio.com) (aanbevolen)

### Stap 1: Maak benodigde config bestanden

Als deze bestanden ontbreken, maak ze aan:

#### `package.json`

```json
{
  "name": "agpeya-app",
  "version": "1.0.0",
  "description": "Koptisch-Orthodox Gebedenboek - Agpeya",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "latest",
    "recharts": "latest",
    "sonner": "^2.0.3",
    "qrcode.react": "latest",
    "html2canvas": "latest"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.4.5",
    "vite": "^5.2.11",
    "tailwindcss": "^4.0.0"
  }
}
```

#### `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
```

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### Stap 2: Installeer Dependencies

Open terminal/command prompt in de project folder:

```bash
cd agpeya-app
npm install
```

Dit downloadt alle benodigde packages (~5 minuten).

### Stap 3: Start Development Server

```bash
npm run dev
```

Open browser naar: `http://localhost:5173`

✅ **Je app draait nu lokaal!**

---

## Build voor Productie

### Maak de "dist" folder

```bash
npm run build
```

Dit maakt een `dist/` folder met de geoptimaliseerde app.

### Test de Build

```bash
npm run preview
```

Open browser naar: `http://localhost:4173`

---

## Deploy naar Netlify

### Optie 1: Drag & Drop (Makkelijkst)

1. Ga naar [netlify.com/drop](https://app.netlify.com/drop)
2. Maak gratis account
3. **Sleep de hele `dist` folder** naar de website
4. Klaar! Je krijgt een URL

### Optie 2: Via GitHub (Automatisch)

1. Maak GitHub repository
2. Push je code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Agpeya App"
   git remote add origin [JOUW-REPO-URL]
   git push -u origin main
   ```

3. Koppel aan Netlify:
   - Ga naar [netlify.com](https://netlify.com)
   - "Add new site" → "Import from Git"
   - Selecteer je repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy!

4. **Elke git push = automatisch deployment!** 🚀

---

## Problemen Oplossen

### "npm: command not found"
→ Installeer Node.js van [nodejs.org](https://nodejs.org)

### "Module not found" errors
→ Run `npm install` opnieuw

### Figma assets werken niet (figma:asset/...)
→ Download de afbeeldingen handmatig:
   - In Figma Make: rechterklik op afbeelding → "Save image as"
   - Plaats in `/public/` folder
   - Update imports in code naar `/icon.png` enz.

### Build errors
→ Check of alle bestanden aanwezig zijn
→ Check of `tsconfig.json` en `vite.config.ts` bestaan

### Port 5173 already in use
→ Stop andere Vite processen of gebruik: `npm run dev -- --port 3000`

---

## Structuur Checklist

Zorg dat je deze structuur hebt:

```
agpeya-app/
├── index.html                    ✅
├── App.tsx                       ✅
├── package.json                  ✅
├── tsconfig.json                 ✅
├── vite.config.ts               ✅
├── components/                   ✅
│   ├── HourCard.tsx
│   ├── PrayerReader.tsx
│   ├── CopticCalendar.tsx
│   ├── InstallPrompt.tsx
│   ├── PWATools.tsx
│   └── ui/                       ✅
│       └── [shadcn components]
├── data/                         ✅
│   ├── prayers-new.ts
│   └── prayers/
│       ├── voorhangsel.ts
│       ├── prime.ts
│       ├── terce.ts
│       ├── sext.ts
│       ├── none.ts
│       ├── vespers.ts
│       ├── compline.ts
│       └── agpeya.ts
├── styles/                       ✅
│   └── globals.css
└── public/                       ✅
    ├── icon.svg
    ├── manifest.json
    └── service-worker.js
```

---

## Eigen Domein Koppelen (Optioneel)

### Koop een domein

- [TransIP](https://transip.nl) - Nederlandse provider (~€10/jaar voor .nl)
- [Namecheap](https://namecheap.com) - Internationaal

### Koppel aan Netlify

1. Netlify Dashboard → Domain Settings
2. "Add custom domain" → voer in: `agpeya.nl`
3. Volg de DNS instructies
4. Update DNS bij je provider:
   - A record → `75.2.60.5`
   - Of CNAME → `jouw-site.netlify.app`
5. Wacht 24u voor DNS propagatie
6. **SSL certificaat = automatisch actief!** 🔒

---

## Updates Deployen

### Via GitHub (automatisch):
```bash
git add .
git commit -m "Update gebeden"
git push
```
→ Netlify deploy automatisch binnen 1 minuut!

### Via Netlify Drop:
1. Run `npm run build`
2. Sleep nieuwe `dist` folder naar Netlify
3. Klaar!

---

## 🎉 Klaar!

Je Agpeya app draait nu lokaal én is klaar voor deployment!

**Hulp nodig?**
- Netlify docs: [docs.netlify.com](https://docs.netlify.com)
- Vite docs: [vitejs.dev](https://vitejs.dev)

**✟ In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.**
