# 💾 Agpeya Project Opslaan op je Hardschrijf

## 📋 Overzicht

Deze handleiding legt uit hoe je het volledige Agpeya project kunt opslaan op je computer en lokaal kunt draaien.

---

## 🗂️ Projectstructuur

Je project bestaat uit de volgende bestanden en mappen:

```
agpeya-app/
├── App.tsx                              (Hoofdcomponent)
├── data/
│   ├── prayers.ts                       (Alle gebeden data)
│   └── formatting-config.ts             (Configuratie voor vette teksten)
├── components/
│   ├── HourCard.tsx                     (Uur kaart component)
│   ├── PrayerEditor.tsx                 (Bewerk functionaliteit)
│   ├── PrayerReader.tsx                 (Lees interface + formatting)
│   ├── figma/
│   │   └── ImageWithFallback.tsx        (Beschermd bestand)
│   └── ui/                              (ShadCN UI componenten)
│       └── [43 UI component bestanden]
├── styles/
│   └── globals.css                      (Styling)
├── HANDLEIDING-GEBEDEN-TOEVOEGEN.md    (Handleiding voor gebeden)
├── VETGEDRUKTE-TEKSTEN.md              (Handleiding voor formatting)
├── PROJECT-OPSLAAN.md                   (Deze handleiding)
└── package.json                         (Dependencies)
```

---

## 📥 Methode 1: Handmatig Kopiëren (Aanbevolen)

### Stap 1: Maak Lokale Projectstructuur

1. Maak een nieuwe map op je computer: `agpeya-app`
2. Maak binnen deze map de volgende submappen:
   - `src/`
   - `src/components/`
   - `src/components/ui/`
   - `src/components/figma/`
   - `src/data/`
   - `src/styles/`
   - `public/`

### Stap 2: Kopieer Alle Bestanden

Voor elk bestand in de huidige projectstructuur:

1. **Open het bestand** in de code editor
2. **Selecteer alle tekst** (Ctrl+A of Cmd+A)
3. **Kopieer** (Ctrl+C of Cmd+C)
4. **Maak een nieuw bestand** op je lokale computer met dezelfde naam
5. **Plak de inhoud** (Ctrl+V or Cmd+V)
6. **Sla op**

### Bestanden om te kopiëren:

**Root bestanden:**
- `App.tsx` → `src/App.tsx`
- `HANDLEIDING-GEBEDEN-TOEVOEGEN.md` → `docs/HANDLEIDING-GEBEDEN-TOEVOEGEN.md`
- `VETGEDRUKTE-TEKSTEN.md` → `docs/VETGEDRUKTE-TEKSTEN.md`
- Dit bestand → `docs/PROJECT-OPSLAAN.md`

**Data:**
- `data/prayers.ts` → `src/data/prayers.ts`
- `data/formatting-config.ts` → `src/data/formatting-config.ts` ⭐ BELANGRIJK!

**Componenten:**
- `components/HourCard.tsx` → `src/components/HourCard.tsx`
- `components/PrayerEditor.tsx` → `src/components/PrayerEditor.tsx`
- `components/PrayerReader.tsx` → `src/components/PrayerReader.tsx`
- `components/figma/ImageWithFallback.tsx` → `src/components/figma/ImageWithFallback.tsx`

**UI Componenten** (alle 43 bestanden in `components/ui/`):
- Kopieer elk bestand naar `src/components/ui/[bestandsnaam]`

**Styling:**
- `styles/globals.css` → `src/styles/globals.css`

---

## 🛠️ Methode 2: Lokaal Project Opzetten

### Stap 1: Installeer Benodigdheden

Zorg dat je het volgende hebt geïnstalleerd:
- **Node.js** (versie 18 of hoger): https://nodejs.org/
- **npm** of **pnpm** (komt met Node.js)

### Stap 2: Maak een nieuw Vite + React Project

Open je terminal en voer uit:

```bash
# Maak een nieuw React + TypeScript project met Vite
npm create vite@latest agpeya-app -- --template react-ts

# Ga naar de projectmap
cd agpeya-app

# Installeer dependencies
npm install
```

### Stap 3: Installeer Extra Dependencies

```bash
# Tailwind CSS en plugins
npm install -D tailwindcss postcss autoprefixer
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge

# ShadCN UI dependencies
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-label @radix-ui/react-separator
npm install @radix-ui/react-slot @radix-ui/react-switch
npm install @radix-ui/react-tabs @radix-ui/react-toast
npm install @radix-ui/react-scroll-area @radix-ui/react-select
npm install @radix-ui/react-popover @radix-ui/react-checkbox
npm install @radix-ui/react-tooltip

# Iconen
npm install lucide-react

# Toast notificaties
npm install sonner
```

### Stap 4: Configureer Tailwind CSS

Maak `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### Stap 5: Configureer TypeScript

Update `tsconfig.json`:

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
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Stap 6: Kopieer Alle Project Bestanden

Kopieer alle bestanden zoals beschreven in **Methode 1, Stap 2**.

### Stap 7: Update Import Paths

In `src/App.tsx`, update de imports:

```typescript
import { HourCard } from './components/HourCard'
import { PrayerReader } from './components/PrayerReader'
import { PrayerEditor } from './components/PrayerEditor'
import { agpeyaHours } from './data/prayers'
import './styles/globals.css'
```

### Stap 8: Update Main Entry Point

Update `src/main.tsx`:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Stap 9: Start Development Server

```bash
npm run dev
```

Je app draait nu op `http://localhost:5173`

---

## 📦 Build voor Productie

Als je een statische versie wilt maken om te hosten:

```bash
# Build het project
npm run build

# Preview de build
npm run preview
```

De gebouwde bestanden staan in de `dist/` map.

---

## 🌐 Hosting Opties

### Optie 1: Netlify (Gratis)
1. Ga naar https://netlify.com
2. Drag & drop de `dist/` map
3. Je app is live!

### Optie 2: Vercel (Gratis)
1. Ga naar https://vercel.com
2. Importeer je GitHub repository of upload de `dist/` map
3. Deploy!

### Optie 3: GitHub Pages (Gratis)
1. Push je code naar GitHub
2. Ga naar Settings → Pages
3. Selecteer de branch en `/dist` folder
4. Save

---

## 📝 Belangrijke Bestanden om te Bewaren

### Minimale Backup:
- `src/data/prayers.ts` - **JE GEBEDEN DATA** (meest belangrijk!)
- `src/App.tsx`
- `src/components/` - alle custom componenten
- `src/styles/globals.css`

### Volledige Backup:
- Alle bestanden in het project

---

## 💡 Tips voor Lokaal Ontwikkelen

### Git Gebruiken (Aanbevolen)

```bash
# Initialiseer git repository
git init

# Voeg een .gitignore toe
echo "node_modules
dist
.env
.DS_Store" > .gitignore

# Eerste commit
git add .
git commit -m "Initiële commit - Agpeya app"

# Koppel aan GitHub (optioneel)
git remote add origin https://github.com/jouw-username/agpeya-app.git
git push -u origin main
```

### Regelmatige Backups

1. **Automatisch via Git:** commit regelmatig je wijzigingen
2. **Handmatig:** kopieer de hele projectmap naar een externe harde schijf
3. **Cloud backup:** gebruik Google Drive, Dropbox, OneDrive, etc.

### ⭐ Extra Belangrijk om te Bewaren

**Meest Kritieke Bestanden:**
1. `src/data/prayers.ts` - Je volledige gebeden database
2. `src/data/formatting-config.ts` - Configuratie voor vetgedrukte teksten
3. `src/styles/globals.css` - Aangepaste styling en Koptische lettertypen

Deze drie bestanden bevatten je unieke content en configuratie!

---

## 🔧 Troubleshooting

### "Module not found" errors:
```bash
npm install
```

### TypeScript errors met imports:
- Check of alle paths correct zijn (met `./` prefix)
- Check of bestandsnamen exact matchen (hoofdlettergevoelig!)

### Styling werkt niet:
- Check of `globals.css` correct geïmporteerd is in `main.tsx`
- Check of Tailwind CSS correct geconfigureerd is

### Koptische lettertypen werken niet lokaal:
Je moet de lettertypen toevoegen:
1. Download CS Avva Shenouda en CS New Athanasius fonts
2. Plaats ze in `public/fonts/`
3. Update `globals.css` met de juiste `@font-face` rules

---

## 📞 Volgende Stappen

Na het opslaan van je project:

1. ✅ Test of alles lokaal werkt
2. ✅ Maak regelmatig backups van `prayers.ts`
3. ✅ Commit je wijzigingen naar Git
4. ✅ Overweeg hosting voor productie gebruik
5. ✅ Voeg meer gebeden en functionaliteit toe

---

**Succes met het opslaan en verder ontwikkelen van je Agpeya app!** 🙏

Bij vragen of problemen, raadpleeg de documentatie of zoek hulp in de React/Vite community.
