# 📱 Agpeya App - PWABuilder iOS Deployment Guide

**Geen Mac? Geen probleem!** PWABuilder kan je PWA omzetten naar een iOS app zonder Mac of Xcode.

---

## ✅ VOORDELEN VAN PWABUILDER

- ✅ **Geen Mac nodig** - werkt op Windows, Mac, Linux
- ✅ **Geen Xcode nodig** - alles online
- ✅ **Sneller** - minder stappen dan Capacitor
- ✅ **Gratis** - geen extra kosten
- ✅ **Microsoft ondersteuning** - professionele tool

---

## ⚠️ NADELEN VAN PWABUILDER

- ⚠️ **Beta feature** - iOS packaging is nog experimenteel
- ⚠️ **Minder controle** - automatische conversie
- ⚠️ **Vereist goede PWA** - je PWA moet perfect werken
- ⚠️ **Beperkte customization** - minder native features

---

## 📋 VEREISTEN

### 1. Je PWA moet live zijn
- [ ] Agpeya app gehost op Netlify (of andere hosting)
- [ ] HTTPS URL (verplicht voor PWA!)
- [ ] Bijvoorbeeld: `https://agpeya.netlify.app`

### 2. PWA Checklist
- [ ] `manifest.json` aanwezig in `/public/` ✅ (je hebt deze!)
- [ ] `service-worker.js` aanwezig ✅ (je hebt deze!)
- [ ] HTTPS enabled ✅ (Netlify doet dit automatisch)
- [ ] App werkt offline ✅
- [ ] Icons correct ingesteld ✅

### 3. Apple Developer Account
- [ ] Apple Developer Account ($99/jaar)
- [ ] Ingelogd op [developer.apple.com](https://developer.apple.com)

---

## 🚀 STAP-VOOR-STAP INSTRUCTIES

### **STAP 1: Deploy je PWA naar Netlify**

Als je dit nog niet hebt gedaan:

```bash
# In je project folder
npm run build

# Upload de dist/ folder naar Netlify via:
# 1. Drag & drop op netlify.com/drop
# OF
# 2. GitHub + Netlify auto-deploy
```

**Resultaat:** Je hebt een URL zoals `https://agpeya.netlify.app`

---

### **STAP 2: Test je PWA**

1. Open je PWA URL in Chrome/Edge
2. Druk **F12** (DevTools)
3. Ga naar **Application** tab
4. Check **Manifest** - moet je app info tonen
5. Check **Service Workers** - moet "activated and running" zijn
6. Test offline: DevTools → Network tab → "Offline" checkbox

**Alles groen? Perfect! ✅**

---

### **STAP 3: Ga naar PWABuilder**

1. Open [pwabuilder.com](https://www.pwabuilder.com/)
2. Voer je URL in: `https://agpeya.netlify.app`
3. Klik **"Start"**

PWABuilder scant je PWA en geeft een score!

---

### **STAP 4: Review de Scan Results**

PWABuilder toont:

**Manifest Quality:**
- ✅ Name, icons, theme color ← Moet allemaal groen zijn
- ⚠️ Waarschuwingen? Fix ze in `manifest.json`

**Service Worker:**
- ✅ Offline support ← Moet groen zijn
- ⚠️ Rood? Check `service-worker.js`

**Security:**
- ✅ HTTPS ← Netlify doet dit automatisch

**Score:** Streef naar **>80** voor beste resultaten!

---

### **STAP 5: Package voor iOS**

1. Klik op de **"Package for Stores"** knop
2. Scroll naar **iOS** sectie
3. Klik **"Generate Package"**

**PWABuilder maakt nu:**
- Een `.zip` bestand met je iOS app
- Klaar voor App Store upload
- Inclusief XCode project files

---

### **STAP 6: Download het Package**

1. Wacht tot packaging compleet is (~2-5 minuten)
2. Download de `.zip` file
3. Pak deze uit op je computer

**Je hebt nu:**
```
agpeya-ios-package/
├── README.md                  (instructies)
├── agpeya.xcodeproj/         (Xcode project)
├── App/
│   ├── Assets/
│   ├── Info.plist
│   └── [app files]
└── [certificaten en profiles]
```

---

### **STAP 7: Upload naar App Store**

**Nu heb je 2 opties:**

#### **Optie A: Je hebt toegang tot een Mac**

1. Kopieer het package naar een Mac
2. Open `agpeya.xcodeproj` in Xcode
3. Volg **CAPACITOR-SETUP.md** vanaf "Xcode Configuratie"
4. Archive en upload naar App Store

#### **Optie B: Geen Mac beschikbaar**

PWABuilder biedt een **Cloud Build Service** (experimenteel):

1. Blijf op pwabuilder.com
2. Klik **"Build in Cloud"** (indien beschikbaar)
3. Upload je certificaten (zie hieronder)
4. PWABuilder build en upload automatisch!

**Of:** Vraag iemand met een Mac om je te helpen!

---

## 🔐 APP SIGNING & CERTIFICATEN

Voor iOS apps heb je nodig:

### **1. App ID maken**

1. Ga naar [developer.apple.com/account](https://developer.apple.com/account)
2. **Certificates, IDs & Profiles**
3. **Identifiers** → **+** (nieuw)
4. Kies **App IDs**
5. **Bundle ID:** `nl.bisdom.agpeya` (of jouw keuze)
6. **Description:** Agpeya - Koptisch Gebedenboek
7. Capabilities: Standaard (geen speciale rechten nodig)
8. **Register**

### **2. Certificaten maken**

**Development Certificate:**
1. **Certificates** → **+**
2. Kies **iOS App Development**
3. Volg de wizard (CSR uploaden)
4. Download `.cer` bestand
5. Dubbelklik om te installeren

**Distribution Certificate:**
1. **Certificates** → **+**
2. Kies **App Store and Ad Hoc**
3. Volg de wizard
4. Download `.cer` bestand
5. Dubbelklik om te installeren

### **3. Provisioning Profiles**

**Development Profile:**
1. **Profiles** → **+**
2. Kies **iOS App Development**
3. Selecteer je App ID
4. Selecteer je certificaat
5. Selecteer devices (voor testen)
6. Download `.mobileprovision`

**Distribution Profile:**
1. **Profiles** → **+**
2. Kies **App Store**
3. Selecteer je App ID
4. Selecteer je distribution certificaat
5. Download `.mobileprovision`

---

## 📱 APP STORE CONNECT SETUP

Volg dezelfde stappen als in **IOS-DEPLOYMENT-CHECKLIST.md**:

### Quick Version:

1. Ga naar [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. **My Apps** → **+** → **New App**
3. Vul in:
   - Name: `Agpeya - Koptisch Gebedenboek`
   - Platform: iOS
   - Bundle ID: `nl.bisdom.agpeya`
   - SKU: `agpeya-nl-001`
4. Upload screenshots (zie APP-STORE-ASSETS.md)
5. Vul beschrijving in (zie APP-STORE-ASSETS.md)
6. Wacht tot build geüpload is
7. Submit for Review!

---

## 🛠️ MANIFEST.JSON - OPTIMALISATIE VOOR PWABUILDER

Je manifest is al klaar! Hier is wat het bevat:

```json
{
  "name": "Agpeya - Koptisch Gebedenboek",
  "short_name": "Agpeya",
  "description": "Het Koptisch-Orthodoxe gebedenboek...",
  "start_url": "/",
  "display": "standalone",        // ← Full-screen app
  "background_color": "#fffbeb",  // ← Splash screen kleur
  "theme_color": "#92400e",       // ← Browser bar kleur
  "icons": [
    // SVG icon (schaalt perfect!)
  ],
  "shortcuts": [
    // Quick actions naar specifieke gebeden
  ]
}
```

**Wat PWABuilder checkt:**

✅ **Required fields:**
- `name` ✅
- `short_name` ✅
- `start_url` ✅
- `display` ✅
- `icons` ✅

✅ **Recommended:**
- `description` ✅
- `theme_color` ✅
- `background_color` ✅
- `orientation` ✅

✅ **Optional maar cool:**
- `shortcuts` ✅ (jump naar specifieke gebeden!)
- `categories` ✅ (App Store categorieën)

---

## 🎨 ICONS VOOR PWABUILDER

Je huidige setup:

**Icon.svg** - Perfect! SVG schaalt naar alle sizes.

**Voor beste resultaten, voeg ook PNG's toe:**

### Optie 1: Genereer PNG's

Gebruik [realfavicongenerator.net](https://realfavicongenerator.net/):

1. Upload je `icon.svg`
2. Generate alle sizes
3. Download package
4. Plaats in `/public/`:
   - `icon-192.png`
   - `icon-512.png`
   - `apple-touch-icon.png`

### Optie 2: Gebruik alleen SVG

Je huidige setup werkt! Moderne browsers ondersteunen SVG icons.

Update manifest als je PNG's toevoegt:

```json
"icons": [
  {
    "src": "/icon.svg",
    "sizes": "any",
    "type": "image/svg+xml"
  },
  {
    "src": "/icon-192.png",
    "sizes": "192x192",
    "type": "image/png"
  },
  {
    "src": "/icon-512.png",
    "sizes": "512x512",
    "type": "image/png"
  },
  {
    "src": "/apple-touch-icon.png",
    "sizes": "180x180",
    "type": "image/png",
    "purpose": "any"
  }
]
```

---

## 🔍 PWA SCORE VERBETEREN

PWABuilder geeft een score. Zo verbeter je hem:

### Manifest Score (30 punten)

✅ **Naam & Beschrijving** (5 pts) - ✅ Je hebt dit!
✅ **Icons** (10 pts) - ✅ SVG icon aanwezig
✅ **Display mode** (5 pts) - ✅ `standalone` ingesteld
✅ **Theme color** (5 pts) - ✅ Amber theme
✅ **Start URL** (5 pts) - ✅ `/` ingesteld

### Service Worker Score (40 punten)

✅ **Offline support** (20 pts) - ✅ Je hebt service-worker.js
✅ **Caching strategy** (10 pts) - Check je service worker
✅ **Background sync** (10 pts) - Optioneel voor gebedsapp

### Security Score (20 punten)

✅ **HTTPS** (20 pts) - ✅ Netlify gebruikt HTTPS

### Performance Score (10 punten)

✅ **Load time** (<3s) - Test op [PageSpeed Insights](https://pagespeed.web.dev/)
✅ **Lighthouse score** (>90) - Run in Chrome DevTools

**Streef naar: 85+ voor beste iOS conversie!**

---

## 📱 PWABUILDER ADVANCED OPTIES

Bij het genereren van je iOS package kun je kiezen:

### **App Configuration**

- **Bundle ID:** `nl.bisdom.agpeya` (uniek!)
- **App Name:** Agpeya
- **Display Name:** Agpeya - Koptisch Gebedenboek
- **Version:** 1.0.0

### **Features**

- ✅ **Push Notifications:** NEE (niet nodig voor gebedsapp)
- ✅ **Location Services:** NEE
- ✅ **Camera:** NEE
- ✅ **Offline Mode:** JA ✅

### **Icons & Splash**

- Upload eigen icons (of gebruik die van manifest)
- Splash screen: Automatisch gegenereerd van manifest

---

## 🐛 TROUBLESHOOTING

### "PWABuilder can't find your manifest"

**Fix:**
- Check dat `manifest.json` in `/public/` staat
- Check dat `index.html` de link bevat:
  ```html
  <link rel="manifest" href="/manifest.json">
  ```
- Deploy naar Netlify en test opnieuw

### "Service Worker not detected"

**Fix:**
- Check dat `service-worker.js` in `/public/` staat
- Check dat service worker registered is in je code
- Open DevTools → Application → Service Workers
- Moet "activated and running" zijn

### "Low PWA Score"

**Fix:**
- Run Lighthouse in Chrome DevTools
- Fix de gemelde issues
- Re-deploy en test opnieuw

### "Icons missing or wrong size"

**Fix:**
- Genereer PNG icons: 192x192 en 512x512
- Update `manifest.json` met alle icon sizes
- Test met Chrome DevTools → Application → Manifest

### "iOS package build failed"

**Fix:**
- Check je manifest heeft alle verplichte velden
- Check je service worker werkt
- Try opnieuw na 10 minuten (server issues)
- Contact PWABuilder support

---

## 🆚 PWABUILDER VS CAPACITOR

| Feature | PWABuilder | Capacitor |
|---------|------------|-----------|
| **Mac vereist** | ❌ Nee | ✅ Ja |
| **Xcode vereist** | ❌ Nee | ✅ Ja |
| **Setup tijd** | 30 min | 3-4 uur |
| **Controle** | ⭐⭐⭐ Matig | ⭐⭐⭐⭐⭐ Volledig |
| **Native features** | ⭐⭐ Beperkt | ⭐⭐⭐⭐⭐ Volledig |
| **Kosten** | €0 + $99 Apple | €0 + $99 Apple |
| **Moeilijkheid** | ⭐⭐ Makkelijk | ⭐⭐⭐⭐ Gematigd |
| **Updates** | ⭐⭐⭐ Automatisch | ⭐⭐⭐⭐ Handmatig |
| **PWA vereist** | ✅ Ja | ❌ Nee |

**Mijn advies:**

- **Geen Mac?** → PWABuilder ✅
- **Simpele app?** → PWABuilder ✅
- **Veel native features nodig?** → Capacitor ✅
- **Volledige controle?** → Capacitor ✅

Voor Agpeya: **PWABuilder is perfect!** Het is een contentapp zonder complexe native features.

---

## 📊 TIJDSLIJN PWABUILDER

| Stap | Tijd |
|------|------|
| PWA deployen naar Netlify | 30 min |
| PWABuilder scan & package | 10 min |
| iOS package download | 5 min |
| Certificaten setup | 1 uur (eerste keer) |
| App Store Connect setup | 1 uur |
| Upload & submission | 30 min |
| **Totaal** | **~3 uur** |
| Apple review wachttijd | 1-3 dagen |

**Veel sneller dan Capacitor! (6-8 uur)**

---

## ✅ PWABUILDER CHECKLIST

### Pre-Build
- [ ] PWA live op Netlify
- [ ] HTTPS actief
- [ ] `manifest.json` compleet
- [ ] `service-worker.js` actief
- [ ] Icons aanwezig (SVG of PNG)
- [ ] Support & Privacy URL's live

### PWABuilder
- [ ] PWA gescand op pwabuilder.com
- [ ] Score > 80
- [ ] iOS package gegenereerd
- [ ] Package gedownload

### Apple Setup
- [ ] Apple Developer account actief
- [ ] Bundle ID geregistreerd
- [ ] Certificaten aangemaakt
- [ ] App Store Connect app gemaakt

### Assets
- [ ] Screenshots gemaakt (zie APP-STORE-ASSETS.md)
- [ ] Beschrijving geschreven
- [ ] Icons 1024x1024 klaar

### Upload
- [ ] Build geüpload (via Mac of cloud)
- [ ] Metadata compleet
- [ ] Submitted for review

---

## 🆘 HULP & RESOURCES

**PWABuilder:**
- Website: [pwabuilder.com](https://www.pwabuilder.com/)
- Docs: [docs.pwabuilder.com](https://docs.pwabuilder.com/)
- GitHub: [github.com/pwa-builder](https://github.com/pwa-builder)
- Discord: PWABuilder Community

**PWA Tools:**
- Test PWA: [web.dev/measure](https://web.dev/measure/)
- Lighthouse: Chrome DevTools
- Manifest validator: [manifest-validator.appspot.com](https://manifest-validator.appspot.com/)

**Apple:**
- Developer: [developer.apple.com](https://developer.apple.com)
- App Store Connect: [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

---

## 🎯 QUICK START (5 STAPPEN)

**Voor degenen die snel willen:**

1. **Deploy PWA:**
   ```bash
   npm run build
   # Upload dist/ naar Netlify
   ```

2. **PWABuilder:**
   - Ga naar [pwabuilder.com](https://pwabuilder.com)
   - Voer URL in → Scan
   - Package for iOS → Download

3. **Apple Setup:**
   - [developer.apple.com](https://developer.apple.com) → Bundle ID registreren
   - Certificaten maken

4. **App Store:**
   - [appstoreconnect.apple.com](https://appstoreconnect.apple.com) → New App
   - Screenshots + beschrijving toevoegen

5. **Upload:**
   - Build uploaden (Mac of cloud)
   - Submit for review
   - **KLAAR!** 🎉

---

## 💡 PRO TIPS

1. **Test je PWA eerst grondig:**
   - Werkt offline?
   - Alle gebeden laden?
   - Dark mode werkt?
   - Geen console errors?

2. **Optimaliseer voor mobiel:**
   - Lighthouse score > 90
   - Load time < 3 seconden
   - Touch targets > 48px

3. **Update strategy:**
   - PWA updates automatisch!
   - Geen nieuwe App Store submission nodig
   - Users krijgen altijd nieuwste versie

4. **Backup plan:**
   - Als PWABuilder niet werkt
   - Zoek iemand met Mac voor Capacitor
   - Of blijf bij PWA-only (ook prima!)

---

## 🎉 JE BENT KLAAR!

Met PWABuilder kun je **zonder Mac** je Agpeya app naar de iOS App Store krijgen!

**Volgende stap:**
1. Deploy je PWA naar Netlify (zie DOWNLOAD-GUIDE.md)
2. Ga naar [pwabuilder.com](https://pwabuilder.com)
3. Begin met scannen!

**Hulp nodig?** Check de andere guides:
- 📥 `DOWNLOAD-GUIDE.md` - Deploy naar Netlify
- 🎨 `APP-STORE-ASSETS.md` - Screenshots & beschrijving
- ✅ `IOS-DEPLOYMENT-CHECKLIST.md` - Volledige checklist

**✟ In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.**

Veel succes met je iOS app deployment! 🙏✨
