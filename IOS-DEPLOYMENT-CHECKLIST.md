# ✅ iOS App Store Deployment Checklist - Agpeya App

Gebruik deze checklist om stap-voor-stap je Agpeya app naar de App Store te deployen.

---

## 📋 PRE-DEPLOYMENT (Voorbereiding)

### Vereisten Checken
- [ ] **Mac computer** beschikbaar
- [ ] **macOS** up-to-date (nieuwste versie aanbevolen)
- [ ] **Xcode** geïnstalleerd (download van Mac App Store - ~15GB)
- [ ] **Node.js** geïnstalleerd (check: `node --version`)
- [ ] **Apple Developer Account** actief ($99/jaar - [developer.apple.com](https://developer.apple.com))
- [ ] **Agpeya project** gedownload van Figma Make

### Project Setup
- [ ] Project structuur compleet (zie DOWNLOAD-GUIDE.md)
- [ ] `npm install` succesvol uitgevoerd
- [ ] `npm run build` werkt zonder errors
- [ ] App draait lokaal (`npm run dev`)

---

## 🔧 CAPACITOR SETUP

### Installatie
- [ ] Capacitor geïnstalleerd: `npm install @capacitor/core @capacitor/cli`
- [ ] iOS platform geïnstalleerd: `npm install @capacitor/ios`
- [ ] Plugins geïnstalleerd: `npm install @capacitor/splash-screen @capacitor/status-bar`

### Configuratie
- [ ] `capacitor.config.json` aangepast:
  - [ ] `appId` ingesteld (bijv. `nl.bisdom.agpeya`)
  - [ ] `appName` correct (`Agpeya`)
  - [ ] `webDir` is `dist`

### iOS Project Maken
- [ ] iOS platform toegevoegd: `npx cap add ios`
- [ ] Build gemaakt: `npm run build`
- [ ] Gesynchroniseerd: `npx cap sync ios`
- [ ] Xcode geopend: `npx cap open ios`

---

## 🎨 APP ASSETS

### App Icons
- [ ] Icon gegenereerd via [appicon.co](https://www.appicon.co/)
- [ ] Alle sizes beschikbaar (20x20 t/m 1024x1024)
- [ ] Icons toegevoegd in Xcode (`Assets.xcassets/AppIcon`)
- [ ] 1024x1024 icon klaar voor App Store

**Benodigde sizes:**
- [ ] 1024x1024 (App Store)
- [ ] 180x180 (iPhone)
- [ ] 167x167 (iPad Pro)
- [ ] 152x152 (iPad)
- [ ] 120x120 (iPhone)
- [ ] 87x87 (iPhone notifications)
- [ ] 80x80 (iPad spotlight)
- [ ] 76x76 (iPad)
- [ ] 60x60 (iPhone spotlight)
- [ ] 58x58 (iPhone settings)
- [ ] 40x40 (iPad spotlight)
- [ ] 29x29 (Settings)
- [ ] 20x20 (iPad notifications)

### Screenshots
**iPhone 6.7" (1290x2796) - Minimaal 3:**
- [ ] Screenshot 1: Home screen met alle gebeden
- [ ] Screenshot 2: Gebedenlezer open
- [ ] Screenshot 3: Dark mode
- [ ] Screenshot 4: Kalender (optioneel)
- [ ] Screenshot 5: Gebed tekst close-up (optioneel)

**iPhone 6.5" (1284x2778):**
- [ ] Zelfde screenshots als 6.7" (vereist!)

**iPad (optioneel als je iPad support hebt):**
- [ ] 12.9" iPad Pro screenshots (2048x2732)

### Video (Optioneel)
- [ ] 30-seconde app preview video gemaakt
- [ ] Formaat: .mov of .mp4
- [ ] Resolutie: 1920x1080 of hoger

---

## ⚙️ XCODE CONFIGURATIE

### Project Settings
- [ ] Xcode project geopend
- [ ] **Signing & Capabilities** tab:
  - [ ] "Automatically manage signing" aangevinkt
  - [ ] Team geselecteerd (je Apple Developer account)
  - [ ] Bundle Identifier ingesteld (bijv. `nl.bisdom.agpeya`)
  
### General Tab
- [ ] Display Name: `Agpeya`
- [ ] Version: `1.0.0`
- [ ] Build: `1`
- [ ] Deployment Target: `iOS 14.0` of hoger
- [ ] Device Orientation: Portrait alleen (of alle orientaties)

### App Info
- [ ] Bundle name correct
- [ ] Copyright toegevoegd

### Launch Screen
- [ ] `LaunchScreen.storyboard` aangepast (optioneel)
- [ ] Achtergrondkleur ingesteld op amber (#f59e0b)

---

## 📱 TESTEN

### Simulator Test
- [ ] iPhone 15 Pro Max simulator gekozen
- [ ] App gebouwd en gedraaid (▶️ play knop)
- [ ] **Home screen** werkt
- [ ] **Alle 7 gebedsuren** openen correct
- [ ] **Dark/Light mode** toggle werkt
- [ ] **Kalender** werkt
- [ ] **Tekst** goed leesbaar
- [ ] **Offline** werkt (disconnect wifi)
- [ ] **Geen crashes** bij navigatie
- [ ] **Install prompt** NIET zichtbaar (native app!)

### Echte iPhone Test (Optioneel maar aanbevolen)
- [ ] iPhone aangesloten op Mac
- [ ] "Trust This Computer" bevestigd
- [ ] App geïnstalleerd op iPhone
- [ ] Developer certificate vertrouwd (Settings → General → VPN & Device Management)
- [ ] App werkt op echte iPhone
- [ ] Alles getest zoals op simulator

---

## 🌐 SUPPORT WEBSITES

### Support Pagina
- [ ] `/public/support.html` aangepast met jouw gegevens:
  - [ ] Contact email bijgewerkt
  - [ ] Website URL bijgewerkt
  - [ ] Adres toegevoegd (indien gewenst)
- [ ] Support pagina geüpload naar hosting (bijv. Netlify)
- [ ] URL getest: `jouw-app.netlify.app/support.html`

### Privacy Policy
- [ ] `/public/privacy.html` aangepast met jouw gegevens:
  - [ ] Contact email bijgewerkt
  - [ ] Adres toegevoegd
  - [ ] Datum bijgewerkt
- [ ] Privacy pagina geüpload naar hosting
- [ ] URL getest: `jouw-app.netlify.app/privacy.html`

**URLs nodig:**
- Support URL: `_____________________________`
- Privacy URL: `_____________________________`

---

## 🏪 APP STORE CONNECT SETUP

### Account & App
- [ ] Ingelogd op [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- [ ] "My Apps" → "+" → "New App" geklikt
- [ ] **Basis info:**
  - [ ] Platform: iOS
  - [ ] Name: `Agpeya - Koptisch Gebedenboek`
  - [ ] Primary Language: Dutch
  - [ ] Bundle ID: `nl.bisdom.agpeya` (of jouw ID)
  - [ ] SKU: `agpeya-nl-001` (uniek ID voor intern gebruik)

### App Information Tab
**Naam & Categorie:**
- [ ] App Name (30 chars): `Agpeya - Koptisch Gebedenboek`
- [ ] Subtitle (30 chars): `7 Canonieke Uren Dagelijks`
- [ ] Primary Category: `Lifestyle`
- [ ] Secondary Category: `Reference` (optioneel)

**Privacy:**
- [ ] Privacy Policy URL toegevoegd
- [ ] Privacy questions beantwoord:
  - [ ] "Does your app collect data?" → **NO**
  
**Age Rating:**
- [ ] Age rating questionnaire ingevuld
- [ ] Rating: `4+` (geen mature content)

### Pricing and Availability
- [ ] Price: **Free** (€0,00)
- [ ] Availability: **All countries** geselecteerd
- [ ] Pre-order: Nee (eerste release)

### Prepare for Submission

**App Clips:** (Skip - niet van toepassing)
- [ ] Overgeslagen

**1.0 Prepare for Submission:**

**Screenshots:**
- [ ] iPhone 6.7" screenshots geüpload (min. 3)
- [ ] iPhone 6.5" screenshots geüpload (min. 3)
- [ ] iPad screenshots geüpload (indien van toepassing)

**Promotional Text (170 chars):**
- [ ] Tekst toegevoegd (zie APP-STORE-ASSETS.md)

**Description (4000 chars):**
- [ ] Nederlandse beschrijving toegevoegd (zie APP-STORE-ASSETS.md)
- [ ] Engels (optioneel) toegevoegd

**Keywords (100 chars):**
- [ ] Keywords toegevoegd: `koptisch,orthodox,gebed,agpeya,bisdom,liturgie,psalmen,uren,christelijk,nederlands`

**Support URL:**
- [ ] Support URL toegevoegd: `jouw-app.netlify.app/support.html`

**Marketing URL (optioneel):**
- [ ] Website toegevoegd (bijv. Bisdom website)

**Version Info:**
- [ ] Version: `1.0.0`
- [ ] Copyright: `© 2024 Koptisch-Orthodox Bisdom Nederland`

**App Review Information:**
- [ ] First Name: [Jouw naam]
- [ ] Last Name: [Jouw achternaam]
- [ ] Phone Number: [Contact nummer]
- [ ] Email: [Contact email]
- [ ] Sign-in required: **NO**
- [ ] Demo account: Niet nodig
- [ ] Notes: "Religious prayer app for Coptic Orthodox Church. No user data collected."

**Version Release:**
- [ ] Automatically release: **YES** (of manual als je specifieke datum wilt)

---

## 📦 BUILD & UPLOAD

### Archive Maken
- [ ] Xcode: Product → Clean Build Folder
- [ ] Xcode: Generic iOS Device geselecteerd (niet simulator!)
- [ ] Xcode: Product → Archive
- [ ] Wacht tot archiving compleet is (~5-10 min)
- [ ] Organizer window opent automatisch

### Upload naar App Store
- [ ] Archive geselecteerd in Organizer
- [ ] "Distribute App" geklikt
- [ ] **App Store Connect** gekozen
- [ ] **Upload** gekozen (niet Export!)
- [ ] Volgende stappen doorlopen:
  - [ ] App Store Connect distribution options: standaard
  - [ ] Re-sign: Automatic
  - [ ] Review upload summary
- [ ] **Upload** geklikt
- [ ] Wacht tot upload compleet (~10-15 min)
- [ ] "Upload Successful" bevestiging ontvangen

### Verificatie
- [ ] Email ontvangen van Apple (processing)
- [ ] Terug naar App Store Connect
- [ ] Build verschijnt onder "TestFlight" tab (~5-10 min)
- [ ] Build status: "Processing" → "Ready to Submit"
- [ ] Build versie geselecteerd onder "App Store" tab

---

## 🚀 SUBMISSION

### Final Review
- [ ] Alle screenshots correct
- [ ] Beschrijving zonder spelfouten
- [ ] URLs werken en laden correct
- [ ] App icons zien er goed uit
- [ ] Build selected
- [ ] Export Compliance: **NO** (geen encryptie features)

### Indienen
- [ ] "Add for Review" geklikt (of "Submit for Review")
- [ ] Final confirmation bevestigd
- [ ] **SUBMITTED!** 🎉

### Na Submission
- [ ] Email confirmatie ontvangen van Apple
- [ ] Status: "Waiting for Review"
- [ ] Wachttijd: 1-3 dagen (gemiddeld)

---

## ⏳ REVIEW PROCESS

### Status Tracking
App Store Connect statussen:
- [ ] **Waiting for Review** - In de wachtrij
- [ ] **In Review** - Apple test je app (12-48 uur)
- [ ] **Pending Developer Release** - Goedgekeurd! (als je manual release koos)
- [ ] **Ready for Sale** - LIVE IN APP STORE! 🎉

### Mogelijke Issues
Als je **Rejected** status krijgt:
- [ ] Email van Apple gelezen met rejection reason
- [ ] Issues opgelost in de app
- [ ] Nieuwe build geüpload
- [ ] Opnieuw gesubmit

**Veelvoorkomende rejection redenen:**
- Missing privacy policy
- Broken links
- App crashes
- Incomplete metadata
- Missing screenshots

### Bij Goedkeuring
- [ ] Email ontvangen: "App Status Change - Ready for Sale"
- [ ] App LIVE in App Store!
- [ ] App gedownload en getest
- [ ] Link gedeeld met gemeente

---

## 📣 POST-LAUNCH

### Promotie
- [ ] App Store link gedeeld:
  - `https://apps.apple.com/app/id[APP_ID]`
- [ ] QR code gemaakt (via PWA Tools in de app)
- [ ] Social media post gemaakt
- [ ] Kerk website bijgewerkt
- [ ] Gemeente geïnformeerd
- [ ] Bulletin/nieuwsbrief artikel

### Monitoring
- [ ] App Store reviews checken
- [ ] Crash reports monitoren (indien beschikbaar)
- [ ] User feedback verzamelen
- [ ] Download statistieken bekijken (App Store Connect → Analytics)

---

## 🔄 UPDATES DEPLOYEN

Voor toekomstige updates:

### Code Changes
- [ ] Bug fixes / nieuwe features geïmplementeerd
- [ ] Getest op simulator
- [ ] Getest op echte iPhone

### Version Bump
- [ ] `package.json` version verhogen (bijv. 1.0.0 → 1.0.1)
- [ ] Xcode: General tab → Version verhogen
- [ ] Xcode: General tab → Build number verhogen (1 → 2)

### Build & Upload
- [ ] `npm run build`
- [ ] `npx cap sync ios`
- [ ] `npx cap open ios`
- [ ] Product → Archive
- [ ] Upload naar App Store

### App Store Connect
- [ ] Nieuwe versie maken: "+" knop bij versies
- [ ] "What's New" tekst toevoegen (beschrijf changes)
- [ ] Nieuwe build selecteren
- [ ] Submit for Review

---

## 💰 KOSTEN OVERZICHT

| Item | Kosten | Frequentie |
|------|--------|------------|
| Apple Developer Account | $99 | Per jaar |
| Hosting (Netlify voor support pages) | €0 | Gratis |
| Domein (optioneel) | ~€10 | Per jaar |
| **TOTAAL** | **$99-109/jaar** | |

---

## 🆘 TROUBLESHOOTING

### "Signing for requires a development team"
**Fix:**
- Xcode → Signing & Capabilities
- Selecteer je Team in dropdown
- Klik "Try Again"

### "No profiles found"
**Fix:**
- developer.apple.com → Certificates
- Controleer of je provisioning profiles actief zijn
- Xcode → Preferences → Accounts → Download Manual Profiles

### "Archive failed"
**Fix:**
- Product → Clean Build Folder
- Sluit Xcode en heropen
- Probeer opnieuw

### Upload blijft hangen
**Fix:**
- Check internetverbinding
- Probeer later opnieuw
- Gebruik Xcode Organizer → "Export" → "Save for App Store" → upload via Application Loader

### Build verschijnt niet in App Store Connect
**Fix:**
- Wacht 10-15 minuten
- Refresh de pagina
- Check je email voor errors

---

## 📞 HULP & RESOURCES

**Documentatie:**
- [Capacitor iOS Docs](https://capacitorjs.com/docs/ios)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)

**Support:**
- Apple Developer Forums
- Stack Overflow (tag: ios, capacitor)
- Capacitor Discord

**Interne Docs:**
- `CAPACITOR-SETUP.md` - Volledige Capacitor guide
- `APP-STORE-ASSETS.md` - Assets en beschrijvingen
- `DOWNLOAD-GUIDE.md` - Project download instructies

---

## ✅ FINAL CHECKLIST

**Voor je op "Submit" drukt:**

- [ ] App werkt perfect op simulator
- [ ] App werkt perfect op echte iPhone
- [ ] Geen crashes of bugs
- [ ] Alle screenshots uploaden
- [ ] Beschrijving zonder spelfouten
- [ ] Keywords optimaal
- [ ] Support URL werkt
- [ ] Privacy URL werkt
- [ ] Alle app icons zichtbaar
- [ ] Build geüpload en geselecteerd
- [ ] Export compliance beantwoord
- [ ] Contact info correct
- [ ] Copyright info correct
- [ ] Screenshots tonen app accuraat
- [ ] App voldoet aan Review Guidelines

**Als alles ✅ is: SUBMIT! 🚀**

---

## 🎉 SUCCES!

Je bent nu klaar om je Agpeya app naar de App Store te deployen!

**Geschatte tijdlijn:**
- Setup & assets: 4-6 uur
- Testen: 2-3 uur
- Submission: 1 uur
- Review wachttijd: 1-3 dagen
- **Totaal: ~1 week** van start tot live!

**✟ In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.**

Moge deze app vele gelovigen zegenen in hun dagelijks gebed! 🙏✨
