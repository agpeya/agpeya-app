# 📚 Agpeya App - Documentatie Index

## 📱 PWA & Deployment (NIEUW!)

### 🚀 Voor Developers:

| Bestand | Doel | Wanneer gebruiken |
|---------|------|-------------------|
| **[SNELSTART-PWA.md](SNELSTART-PWA.md)** | Snelle 5-minuten setup | Start hier! Eerste deployment |
| **[README-PWA.md](README-PWA.md)** | Complete PWA overzicht | Uitgebreide informatie over alles |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Deployment handleiding | Netlify, Vercel, GitHub Pages setup |
| **[PWA-SETUP.md](PWA-SETUP.md)** | Technische PWA details | Troubleshooting & advanced topics |

### 👥 Voor Eindgebruikers:

| Bestand | Doel | Wanneer delen |
|---------|------|---------------|
| **[INSTALLATIE-INSTRUCTIES.md](INSTALLATIE-INSTRUCTIES.md)** | Installatie handleiding | Stuur naar je gemeenschap |

---

## 📖 App Handleidingen

### Gebeden Beheren:

| Bestand | Doel |
|---------|------|
| **[HANDLEIDING-GEBEDEN-TOEVOEGEN.md](HANDLEIDING-GEBEDEN-TOEVOEGEN.md)** | Hoe gebeden toevoegen/bewerken |
| **[BESTAND_SPLITSEN_INSTRUCTIES.md](BESTAND_SPLITSEN_INSTRUCTIES.md)** | Grote gebedbestanden splitsen |
| **[VETGEDRUKTE-TEKSTEN.md](VETGEDRUKTE-TEKSTEN.md)** | Automatische vet-formatting |

### Technische Features:

| Bestand | Doel |
|---------|------|
| **[KOPTISCHE-LETTERTYPEN.md](KOPTISCHE-LETTERTYPEN.md)** | Koptische fonts gebruiken |
| **[VERSIE-CHANGELOG.md](VERSIE-CHANGELOG.md)** | Versie geschiedenis |
| **[PROJECT-OPSLAAN.md](PROJECT-OPSLAAN.md)** | Project backup instructies |

### Status & Info:

| Bestand | Doel |
|---------|------|
| **[PREVIEW-STATUS.md](PREVIEW-STATUS.md)** | Huidige status van de app |
| **[Attributions.md](Attributions.md)** | Credits en bronnen |
| **[guidelines/Guidelines.md](guidelines/Guidelines.md)** | Development guidelines |

---

## 🎯 Workflow Overzicht

### Eerste Keer Setup:

```
1. SNELSTART-PWA.md         → Lees dit eerst!
2. In-app PWA Tools         → Genereer icons
3. npm run build            → Build de app
4. Netlify deployment       → Deploy online
5. Test op telefoon         → Installeer en test
6. INSTALLATIE-INSTRUCTIES  → Deel met gebruikers
```

### Gebeden Toevoegen:

```
1. HANDLEIDING-GEBEDEN-TOEVOEGEN.md  → Lees instructies
2. Edit /data/prayers/[uur].ts       → Voeg gebeden toe
3. VETGEDRUKTE-TEKSTEN.md            → Formatting toevoegen
4. KOPTISCHE-LETTERTYPEN.md          → Koptisch gebruiken (optioneel)
5. Test in app                        → Verificeer alles klopt
6. Deploy update                      → Push naar productie
```

### Updates Deployen:

```
1. Maak je changes
2. npm run build
3. Upload nieuwe dist folder naar Netlify
   Of: git push (bij auto-deploy)
4. Gebruikers krijgen auto-update!
```

---

## 🔧 In-App Tools

### PWA Tools Pagina:

Open via hoofdscherm → **"PWA Tools"** knop

**Functies:**
- ✅ **App Icons Generator** - Download 192px & 512px icons
- ✅ **QR Code Generator** - Maak scanbare QR codes
- ✅ **Deployment Guide** - Stap-voor-stap instructies
- ✅ **Live Demo** - Test tools in de browser

---

## 📱 PWA Features

### Wat werkt nu:

| Feature | Status | Details |
|---------|--------|---------|
| 📴 Offline Mode | ✅ | Service Worker + Cache |
| 🏠 Installeerbaar | ✅ | iOS & Android |
| 🔔 Install Prompt | ✅ | Auto na 3 sec (Android) |
| ⚡ Fast Loading | ✅ | Service Worker caching |
| 🌙 Dark Mode | ✅ | Opgeslagen in LocalStorage |
| 🎨 App Icons | ⚠️ | Toevoegen via PWA Tools |
| 📊 QR Code | ⚠️ | Genereren via PWA Tools |
| 🔒 HTTPS | ✅ | Auto via hosting |

---

## 📁 Project Structuur

```
/
├── /components/              # React componenten
│   ├── InstallPrompt.tsx    # PWA installatie prompt
│   ├── AppIconGenerator.tsx # Icon generator
│   ├── QRCodeGenerator.tsx  # QR code maker
│   ├── PWATools.tsx         # Tools pagina
│   ├── PrayerReader.tsx     # Gebeden lezer
│   ├── HourCard.tsx         # Uur kaartjes
│   └── /ui/                 # Shadcn componenten
│
├── /data/                    # Data bestanden
│   ├── /prayers/            # Gebed bestanden per uur
│   │   ├── prime.ts         # Eerste uur
│   │   ├── terce.ts         # Derde uur
│   │   ├── sext.ts          # Zesde uur
│   │   ├── none.ts          # Negende uur
│   │   ├── vespers.ts       # Elfde uur
│   │   ├── compline.ts      # Twaalfde uur
│   │   ├── midnight.ts      # Middernacht
│   │   ├── voorhangsel.ts   # Voorhangsel
│   │   └── gebeden.ts       # Diverse gebeden
│   ├── prayers-new.ts       # Hoofdbestand gebeden
│   └── formatting-config.ts # Vet-formatting config
│
├── /public/                  # Publieke bestanden
│   ├── manifest.json        # PWA manifest
│   ├── service-worker.js    # Service Worker
│   ├── icon-192.png         # ⚠️ Toevoegen!
│   └── icon-512.png         # ⚠️ Toevoegen!
│
├── /styles/                  # Styling
│   └── globals.css          # Globale CSS + Koptische fonts
│
├── index.html               # HTML met PWA meta tags
├── App.tsx                  # Hoofd app component
│
└── /📚 Documentatie/
    ├── SNELSTART-PWA.md             # Start hier!
    ├── README-PWA.md                # Uitgebreid overzicht
    ├── DEPLOYMENT.md                # Deployment guide
    ├── PWA-SETUP.md                 # Technische details
    ├── INSTALLATIE-INSTRUCTIES.md   # Voor gebruikers
    ├── HANDLEIDING-GEBEDEN-TOEVOEGEN.md
    ├── KOPTISCHE-LETTERTYPEN.md
    ├── VETGEDRUKTE-TEKSTEN.md
    └── DOCUMENTATIE-INDEX.md        # Dit bestand!
```

---

## 🎓 Leren & Troubleshooting

### Nieuw met PWA's?

Lees in deze volgorde:
1. **SNELSTART-PWA.md** - Basis begrip & snelle setup
2. **README-PWA.md** - Volledige functionaliteit
3. **PWA-SETUP.md** - Technische diepgang

### Problemen?

| Probleem | Oplossing Bestand | Sectie |
|----------|-------------------|--------|
| Icons werken niet | PWA-SETUP.md | Troubleshooting → Icons |
| Service Worker errors | PWA-SETUP.md | Troubleshooting → Service Worker |
| App installeert niet | PWA-SETUP.md | Troubleshooting → Install Prompt |
| QR code scant niet | PWA-SETUP.md | Troubleshooting → QR Code |
| Gebeden toevoegen | HANDLEIDING-GEBEDEN-TOEVOEGEN.md | Hele document |
| Koptisch toevoegen | KOPTISCHE-LETTERTYPEN.md | Gebruik sectie |
| Deployment faalt | DEPLOYMENT.md | Troubleshooting |

---

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start development server

# Building
npm run build            # Build voor productie
npm run preview          # Preview productie build

# Testing
npm run lint             # Check code quality
```

---

## 📞 Support

### Self-Service:

1. **Check documentatie** (dit index bestand)
2. **Bekijk troubleshooting** sectie in relevante doc
3. **Browser console** (F12) voor errors
4. **Test in incognito** mode

### Community:

- Deel met andere Koptische gemeenschappen
- Documenteer je eigen ervaringen
- Draag bij aan de handleidingen

---

## 🎯 Volgende Stappen

### Na Eerste Deployment:

- [ ] Test app op meerdere devices
- [ ] Verzamel feedback van gebruikers
- [ ] Voeg ontbrekende gebeden toe
- [ ] Maak promotie materiaal (posters, QR codes)
- [ ] Deel in gemeenschap (WhatsApp, Facebook)

### Future Features (Optioneel):

- [ ] Push notificaties voor gebedstijden
- [ ] Audio gebeden opnamen
- [ ] Gebedsgeschiedenis tracking
- [ ] Delen functionaliteit (Web Share API)
- [ ] Background sync voor updates
- [ ] Custom domain (bijv. agpeya.nl)
- [ ] Google Analytics

---

## 📈 Documentatie Updates

**Laatste update:** November 2025

**Toegevoegd:**
- ✅ PWA setup documentatie (volledig)
- ✅ In-app PWA Tools
- ✅ App Icon Generator
- ✅ QR Code Generator
- ✅ Deployment guides
- ✅ Installatie instructies

**Bestaand:**
- ✅ Gebeden handleidingen
- ✅ Koptische fonts setup
- ✅ Formatting configuratie
- ✅ Project guidelines

---

## 💡 Tips voor Succes

1. **Start simpel** → Gebruik SNELSTART-PWA.md
2. **Test grondig** → Op echte devices, niet alleen browser
3. **Deel breed** → WhatsApp, social media, kerk
4. **Verzamel feedback** → Verbeter op basis van gebruikers
5. **Update regelmatig** → Voeg nieuwe gebeden toe
6. **Backup je werk** → Gebruik git of PROJECT-OPSLAAN.md

---

## ✨ Belangrijkste Bestanden

**Moet lezen voor deployment:**
- 🥇 **SNELSTART-PWA.md** - Start hier!
- 🥈 **INSTALLATIE-INSTRUCTIES.md** - Deel met gebruikers
- 🥉 **README-PWA.md** - Voor meer details

**Moet lezen voor development:**
- 📖 **HANDLEIDING-GEBEDEN-TOEVOEGEN.md**
- 📖 **KOPTISCHE-LETTERTYPEN.md**
- 📖 **VETGEDRUKTE-TEKSTEN.md**

---

## 🙏 Conclusie

Deze documentatie dekt alles wat je nodig hebt om:

✅ Een **volledige PWA** te bouwen  
✅ De app te **deployen** naar gebruikers  
✅ **Gebeden** toe te voegen en te bewerken  
✅ **Koptische** teksten te gebruiken  
✅ **Problemen** op te lossen  
✅ De app te **delen** met je gemeenschap  

**Veel succes met je Agpeya app!** 🚀📱

---

**✟ In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.**
