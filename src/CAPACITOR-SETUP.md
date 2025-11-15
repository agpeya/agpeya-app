# 📱 Agpeya App - Capacitor iOS Setup Guide

## Wat is Capacitor?

Capacitor is een tool van Ionic die je **PWA omzet naar een native iOS app** die je op de App Store kunt zetten.

---

## ✅ Vereisten (wat je nodig hebt)

### Hardware & Software:
- ✅ **Mac computer** (verplicht voor iOS apps!)
- ✅ **macOS** (bij voorkeur nieuwste versie)
- ✅ **Xcode** (gratis van App Store - ~15GB!)
- ✅ **Node.js** geïnstalleerd ([nodejs.org](https://nodejs.org))
- ✅ **Apple Developer Account** ($99/jaar)
  - Aanmelden: [developer.apple.com](https://developer.apple.com)

### Optioneel maar handig:
- ✅ **iPhone** voor testen (of gebruik simulator)
- ✅ **Code editor** (VS Code)

---

## 🚀 Stap-voor-Stap Setup

### **Stap 1: Download je Agpeya project**

Zie `DOWNLOAD-GUIDE.md` voor volledige instructies.

Zorg dat je deze structuur hebt:
```
agpeya-app/
├── index.html
├── App.tsx
├── components/
├── data/
├── styles/
├── public/
├── package.json
└── capacitor.config.json  ← Al aanwezig!
```

---

### **Stap 2: Installeer Capacitor**

Open **Terminal** in je project folder:

```bash
cd agpeya-app

# Installeer Capacitor CLI
npm install @capacitor/core @capacitor/cli

# Installeer iOS platform
npm install @capacitor/ios

# Installeer nuttige plugins
npm install @capacitor/splash-screen @capacitor/status-bar
```

---

### **Stap 3: Update package.json**

Voeg deze scripts toe aan je `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "cap:init": "cap init",
    "cap:add:ios": "cap add ios",
    "cap:sync": "cap sync",
    "cap:open:ios": "cap open ios",
    "ios:build": "npm run build && cap sync && cap open ios"
  }
}
```

---

### **Stap 4: Maak iOS platform**

```bash
# Maak de iOS app
npx cap add ios

# Dit maakt een nieuwe 'ios/' folder met Xcode project
```

Je krijgt nu:
```
agpeya-app/
├── [al je bestanden...]
└── ios/                    ← NIEUW! Xcode project
    └── App/
        └── App.xcworkspace
```

---

### **Stap 5: Build je web app**

```bash
# Maak de productie build
npm run build

# Kopieer naar iOS project
npx cap sync ios
```

Dit:
1. Maakt de `dist/` folder
2. Kopieert alles naar het iOS project
3. Installeert plugins

---

### **Stap 6: Open in Xcode**

```bash
# Open het Xcode project
npx cap open ios
```

**Xcode opent automatisch!** 🎉

---

## 🛠️ Configuratie in Xcode

### **Stap 1: Team & Bundle Identifier**

1. Klik op **"App"** in de linker sidebar (project navigator)
2. Selecteer **"App"** onder TARGETS
3. Ga naar **"Signing & Capabilities"** tab
4. Vink **"Automatically manage signing"** aan
5. Kies je **Team** (je Apple Developer account)
6. Verander **Bundle Identifier** naar iets unieks:
   - Bijvoorbeeld: `nl.koptischbisdom.agpeya`
   - Of: `com.jouwkerk.agpeya`

### **Stap 2: App Info Aanpassen**

Blijf in het project, ga naar **"General"** tab:

- **Display Name**: `Agpeya`
- **Version**: `1.0.0`
- **Build**: `1`
- **Deployment Target**: `iOS 14.0` (of nieuwer)

### **Stap 3: Icons Toevoegen**

1. In Xcode, ga naar `ios/App/App/Assets.xcassets/`
2. Klik op **"AppIcon"**
3. Sleep je iconen naar de juiste vakjes
   - Zie `APP-STORE-ASSETS.md` voor het maken van iconen!

### **Stap 4: Launch Screen (Splash)**

1. Open `ios/App/App/LaunchScreen.storyboard`
2. Pas de achtergrondkleur aan naar amber (#f59e0b)
3. Voeg eventueel je logo/kruis toe

---

## 📱 Testen op Simulator

### **Stap 1: Kies een simulator**

In Xcode top balk:
- Klik op het device menu (naast de play knop)
- Kies: **"iPhone 15 Pro"** (of een ander model)

### **Stap 2: Run de app**

- Klik op de **▶️ Play** knop (of Command+R)
- Simulator opent en je app start!

**Test alles:**
- ✅ Opent de app?
- ✅ Werken alle gebeden?
- ✅ Dark mode switch?
- ✅ Kalender?
- ✅ Installatie prompts zijn weg (niet nodig in native app)?

---

## 📲 Testen op Echte iPhone

### **Vereisten:**
- ✅ iPhone met USB kabel
- ✅ Xcode instellingen geconfigureerd

### **Stappen:**

1. **Sluit je iPhone aan** op je Mac
2. **Unlock** je iPhone en tik "Trust This Computer"
3. In Xcode: kies je iPhone in device menu
4. Klik **▶️ Play**
5. Eerste keer: Ga op iPhone naar:
   - Settings → General → VPN & Device Management
   - Tap je developer account
   - Tap "Trust"
6. Open de app op je iPhone!

---

## 🏪 App Store Klaar Maken

### **Stap 1: Archive maken**

1. In Xcode: **Product** → **Archive**
2. Wacht tot build compleet is (~5 minuten)
3. **Organizer** window opent

### **Stap 2: Upload naar App Store Connect**

1. Selecteer je archive
2. Klik **"Distribute App"**
3. Kies **"App Store Connect"**
4. Volg de wizard
5. Klik **"Upload"**

Upload duurt ~10-15 minuten.

### **Stap 3: App Store Connect Configuratie**

Ga naar [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

1. Klik **"My Apps"** → **"+"** → **"New App"**
2. Vul in:
   - **Platform**: iOS
   - **Name**: Agpeya - Koptisch Gebedenboek
   - **Primary Language**: Dutch
   - **Bundle ID**: `nl.koptischbisdom.agpeya`
   - **SKU**: `agpeya-nl-001`

3. **App Information** tab:
   - Zie `APP-STORE-ASSETS.md` voor screenshots!
   - Zie `APP-STORE-ASSETS.md` voor beschrijving!

4. **Pricing and Availability**:
   - Kies **"Free"**
   - Availability: **All countries**

5. **Prepare for Submission**:
   - Upload screenshots (zie assets guide)
   - Beschrijving invullen
   - Keywords: `koptisch,orthodox,gebed,agpeya,bisdom,liturgie`
   - Support URL: je kerk website
   - Privacy Policy URL: maak een simpele pagina

6. **Submit for Review**!

---

## 🔄 Updates Deployen

### Wanneer je gebeden update of bugs fixt:

```bash
# 1. Maak je changes in de code
# 2. Update version number in package.json en Xcode

# 3. Build & sync
npm run build
npx cap sync ios

# 4. Open Xcode
npx cap open ios

# 5. Verhoog Build number:
#    General tab → Build → verhoog met 1 (bijv. 1 → 2)

# 6. Archive & Upload
#    Product → Archive → Distribute
```

---

## ⚙️ Capacitor Config Uitleg

Het bestand `capacitor.config.json` is al klaar!

```json
{
  "appId": "nl.bisdom.agpeya",        // ← Pas dit aan!
  "appName": "Agpeya",
  "webDir": "dist",                    // Build output folder
  "backgroundColor": "#f59e0b",        // Amber kleur
  
  "ios": {
    "contentInset": "automatic",
    "backgroundColor": "#f59e0b"
  }
}
```

**Wat je moet aanpassen:**
- `appId`: Unieke identifier (reverse domain style)
  - Bijvoorbeeld: `nl.koptischbisdom.agpeya`
  - Of: `com.jouwkerk.agpeya`

---

## 🐛 Problemen Oplossen

### "Could not find Xcode"
→ Installeer Xcode van Mac App Store
→ Run: `sudo xcode-select --switch /Applications/Xcode.app`

### "No profiles for 'nl.bisdom.agpeya' were found"
→ Ga naar Xcode → Signing & Capabilities
→ Selecteer je Team
→ Klik "Try Again"

### "App crashes on launch"
→ Check Console in Xcode voor errors
→ Check of `npm run build` succesvol was
→ Run `npx cap sync ios` opnieuw

### "Icons not showing"
→ Maak alle icoon sizes (zie APP-STORE-ASSETS.md)
→ Clean build: Xcode → Product → Clean Build Folder
→ Rebuild

### Plugins werken niet
→ Run: `npx cap sync ios`
→ Rebuild de app

---

## 📋 Checklist voor App Store Submission

- [ ] Xcode project gebouwd zonder errors
- [ ] Getest op simulator
- [ ] Getest op echte iPhone
- [ ] Alle app icons toegevoegd (alle sizes)
- [ ] Screenshots gemaakt (zie APP-STORE-ASSETS.md)
- [ ] App beschrijving geschreven (Nederlands + Engels)
- [ ] Privacy Policy pagina gemaakt
- [ ] Support URL ingesteld
- [ ] Apple Developer account actief ($99 betaald)
- [ ] App info compleet in App Store Connect
- [ ] Archive succesvol geüpload
- [ ] Submitted for review!

---

## 💰 Kosten Overzicht

| Item | Prijs | Frequentie |
|------|-------|------------|
| Apple Developer Account | $99 | Per jaar |
| Domein (optioneel) | ~€10 | Per jaar |
| Hosting (Netlify) | €0 | Gratis! |
| **TOTAAL** | **$99/jaar** | |

De iOS app zelf is **gratis** voor gebruikers!

---

## 🎯 Tijdsinschatting

| Stap | Tijd |
|------|------|
| Capacitor setup | 30 min |
| Xcode configuratie | 30 min |
| Icons maken | 1 uur |
| Screenshots maken | 1 uur |
| App Store setup | 1 uur |
| Testing | 2 uur |
| Review wachttijd | 1-3 dagen |
| **TOTAAL** | **~6 uur + review** |

---

## 📱 Alternatief: PWABuilder (Makkelijker, Geen Mac Nodig!)

Als je **geen Mac** hebt, gebruik PWABuilder:

1. Ga naar [pwabuilder.com](https://pwabuilder.com)
2. Voer je PWA URL in (van Netlify)
3. Klik "Package for iOS"
4. Download `.zip` file
5. Volg hun instructies
6. Ze maken een iOS app voor je!

**Voordelen:**
- ✅ Geen Mac nodig
- ✅ Geen Xcode nodig
- ✅ Sneller
- ✅ Gratis

**Nadelen:**
- ⚠️ Minder controle
- ⚠️ Beta feature
- ⚠️ Sommige native features werken mogelijk niet

---

## 🆘 Hulp Nodig?

**Capacitor Docs:**
- [capacitorjs.com/docs](https://capacitorjs.com/docs)
- [capacitorjs.com/docs/ios](https://capacitorjs.com/docs/ios)

**App Store Review Guidelines:**
- [developer.apple.com/app-store/review/guidelines](https://developer.apple.com/app-store/review/guidelines/)

**Video Tutorials:**
- YouTube: "Capacitor iOS deployment tutorial"
- Ionic YouTube channel

---

## ✝️ Zegen

**In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.**

Moge deze app vele gelovigen helpen in hun dagelijks gebed! 🙏✨
