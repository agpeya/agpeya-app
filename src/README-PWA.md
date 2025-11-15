# 📱 Agpeya PWA - Complete Setup Guide

## ✨ Wat is er toegevoegd?

Je Agpeya app is nu een **volledige Progressive Web App (PWA)** die gebruikers kunnen installeren op hun telefoon!

---

## 🎯 PWA Tools in de App

### In-App Generator Toegevoegd! 🎉

De app heeft nu een **PWA Tools** sectie die je kunt openen vanaf het hoofdscherm:

1. **Scroll naar beneden** op het hoofdscherm
2. **Klik op "PWA Tools"** knop (blauwe kaart met moersleutel icoon)
3. **Gebruik de tools:**
   - **App Icons** tab: Genereer en download app icons (192x192 en 512x512)
   - **QR Code** tab: Maak een QR code voor je app URL

### ⚡ Snel Gebruik:

```
1. Open de app
2. Klik "PWA Tools" onderaan
3. Tab "App Icons" → Download beide icons
4. Tab "QR Code" → Voer je app URL in → Download QR
5. Klaar! ✅
```

---

## 📁 PWA Bestanden Structuur

```
/public/
  ├── manifest.json          ✅ App configuratie
  ├── service-worker.js      ✅ Offline functionaliteit
  ├── icon-192.png           ⚠️ Nog toevoegen!
  └── icon-512.png           ⚠️ Nog toevoegen!

/components/
  ├── InstallPrompt.tsx      ✅ Installatie prompt
  ├── AppIconGenerator.tsx   ✅ Icon generator
  ├── QRCodeGenerator.tsx    ✅ QR code maker
  └── PWATools.tsx           ✅ Tools pagina

/index.html                  ✅ PWA meta tags
/App.tsx                     ✅ Met PWA Tools knop

Documentatie:
  ├── INSTALLATIE-INSTRUCTIES.md
  ├── DEPLOYMENT.md
  ├── PWA-SETUP.md
  └── README-PWA.md (dit bestand)
```

---

## 🚀 Snelstart Guide

### Stap 1: Icons Genereren 🎨

**Optie A: In-App Generator (Aanbevolen)**
1. Start de app: `npm run dev`
2. Klik op "PWA Tools" onderaan
3. Ga naar "App Icons" tab
4. Klik "Download Beide Icons"
5. Plaats `icon-192.png` en `icon-512.png` in `/public/` map

**Optie B: Online Tool**
1. Ga naar [RealFaviconGenerator.net](https://realfavicongenerator.net/)
2. Upload het Koptisch kruis (uit de app)
3. Download gegenereerde icons
4. Hernoem naar `icon-192.png` en `icon-512.png`
5. Plaats in `/public/` map

### Stap 2: Build de App 📦

```bash
npm run build
```

Dit creëert een `dist` folder met je productie-klare app.

### Stap 3: Deploy naar Netlify 🌐

**Snelste methode:**
1. Ga naar [app.netlify.com/drop](https://app.netlify.com/drop)
2. Maak gratis account (via GitHub of email)
3. Sleep de `dist` folder naar het scherm
4. Wacht 30 seconden... Klaar! 🎉

Je krijgt een URL zoals: `https://jouw-app-naam.netlify.app`

### Stap 4: QR Code Maken 📱

**In de app:**
1. Klik "PWA Tools"
2. Ga naar "QR Code" tab
3. Voer je Netlify URL in
4. Klik "Maak Echte QR Code" (opent externe tool)
5. Download de QR code

**Of gebruik:**
- [QR Code Generator](https://www.qr-code-generator.com/)
- [QRCode Monkey](https://www.qrcode-monkey.com/)
- [QR Server API](https://goqr.me/api/)

### Stap 5: Test Installatie 📲

**iPhone/iPad:**
```
1. Open de app URL in Safari
2. Tik delen knop (vierkant met pijl ↑)
3. Scroll naar "Zet in beginscherm"
4. Tik "Voeg toe"
```

**Android:**
```
1. Open de app URL in Chrome
2. Pop-up: "App installeren" → Tik "Installeren"
   Of: Menu (⋮) → "App installeren"
3. App staat nu op je startscherm!
```

---

## 🎨 App Icon Details

### Automatisch Gegenereerde Icons

De in-app generator maakt icons met:
- **Gradient achtergrond**: Goud/amber kleuren (#fbbf24 → #b45309)
- **Koptisch kruis**: Gecentreerd met 15% padding
- **Border**: Subtiele amber-800 rand
- **Shadow**: Voor diepte effect
- **Fallback**: Als kruis niet laadt, toont "Agpeya" tekst

### Icon Maten:

| Bestand | Grootte | Gebruik |
|---------|---------|---------|
| `icon-192.png` | 192x192px | Home screen, app lijst |
| `icon-512.png` | 512x512px | Splash screen, high-res displays |

---

## 📱 QR Code Gebruik

### Waar kun je de QR code delen?

✅ **Kerk:**
- Weekblad/bulletin
- Posters in de kerk
- Projectie tijdens dienst

✅ **Digital:**
- WhatsApp groepen
- Facebook, Instagram
- Email nieuwsbrief
- Website

✅ **Print:**
- Flyers
- Visitekaartjes
- Boekleggers

### QR Code Best Practices:

1. **Grootte**: Minimaal 3x3 cm bij printen
2. **Contrast**: Donkere QR op lichte achtergrond
3. **Test**: Scan altijd eerst met je telefoon
4. **Context**: Voeg tekst toe: "Scan voor Agpeya app"

---

## 🔧 Technische Details

### Service Worker

**Caching Strategie: Network First**
- Probeert eerst verse content van internet
- Bij falen: gebruik cached versie
- Automatische updates op achtergrond

**Cache Naam:** `agpeya-v1`
- Update versie bij grote changes
- Oude caches worden automatisch verwijderd

### Manifest.json Configuratie

```json
{
  "display": "standalone",          // Fullscreen zonder browser-balk
  "orientation": "portrait",        // Alleen verticaal (mobiel)
  "background_color": "#fffbeb",    // Amber achtergrond
  "theme_color": "#92400e",         // Amber statusbalk
  "start_url": "/",                 // Start bij hoofdpagina
  "scope": "/"                      // Hele app
}
```

### Install Prompt

- Verschijnt automatisch na 3 seconden
- Alleen op Android (native prompt)
- iOS: Handmatige installatie via Safari
- Kan weggedrukt worden (opgeslagen in LocalStorage)

---

## 🎯 Features van de PWA

| Feature | Status | Details |
|---------|--------|---------|
| 📴 **Offline Mode** | ✅ | Werkt na eerste bezoek |
| 🏠 **Home Screen Icon** | ✅ | Installeerbaar op telefoon |
| 🔔 **Install Prompt** | ✅ | Auto-prompt na 3 sec (Android) |
| ⚡ **Fast Loading** | ✅ | Service worker caching |
| 🌙 **Dark Mode** | ✅ | Opgeslagen in LocalStorage |
| 🔒 **HTTPS** | ✅ | Auto via Netlify/Vercel |
| 📱 **Mobile-First** | ✅ | Geoptimaliseerd voor mobiel |
| 🎨 **App Icons** | ⚠️ | Toevoegen via tools |
| 📊 **QR Code** | ⚠️ | Genereren via tools |

---

## 🆘 Troubleshooting

### Icons worden niet getoond

**Probleem:** Icons blijven leeg of tonen verkeerd

**Oplossing:**
1. Check of `icon-192.png` en `icon-512.png` in `/public/` staan
2. Verifieer paden in `manifest.json`
3. Clear browser cache (Ctrl+Shift+R)
4. Herinstalleer de app op je telefoon
5. Check browser console voor errors

### Service Worker werkt niet

**Probleem:** App werkt niet offline

**Oplossing:**
1. HTTPS is verplicht (localhost is ok voor dev)
2. Open DevTools → Application → Service Workers
3. Klik "Unregister" en reload
4. Check Console voor errors
5. Verifieer `/public/service-worker.js` bestaat

### Install prompt verschijnt niet

**Probleem:** Geen installatie optie

**iOS:**
- Normale gedrag! iOS toont geen auto-prompt
- Gebruik handmatige methode: Safari → Delen → Zet in beginscherm

**Android:**
- Check of app al geïnstalleerd is
- LocalStorage check: `localStorage.clear()` in console
- Gebruik Chrome (niet Firefox)
- HTTPS verplicht

### QR Code scant niet

**Probleem:** QR code werkt niet

**Oplossing:**
1. Gebruik een echte QR generator (niet de demo in de app)
2. Test met verschillende QR scanner apps
3. Check of URL correct is (https!)
4. Print groter (minimaal 3x3 cm)
5. Zorg voor goed contrast (zwart op wit)

---

## 📊 PWA Audit Checklist

### Voor Deployment:

- [ ] Icons toegevoegd (`icon-192.png`, `icon-512.png`)
- [ ] `manifest.json` correct ingevuld
- [ ] Service worker getest (offline mode)
- [ ] HTTPS enabled (auto via Netlify)
- [ ] Lighthouse PWA score 90+ (in Chrome DevTools)
- [ ] Getest op iPhone (Safari)
- [ ] Getest op Android (Chrome)
- [ ] Install prompt werkt (Android)
- [ ] Offline functionaliteit getest
- [ ] Dark mode opgeslagen in cache
- [ ] App info correct in manifest
- [ ] Meta tags aanwezig in index.html

### Chrome Lighthouse Test:

```
1. Open je app in Chrome
2. F12 → Lighthouse tab
3. Select "Progressive Web App"
4. Click "Generate report"
5. Streef naar 90+ score
```

**Belangrijkste checks:**
- ✅ Installable
- ✅ Offline capable
- ✅ Configured for offline use
- ✅ Has a valid manifest
- ✅ Provides a valid apple-touch-icon

---

## 🌐 Custom Domain (Optioneel)

### Stap 1: Koop een domein

**Nederlandse providers:**
- [TransIP](https://transip.nl) - €10/jaar voor .nl
- [Hostnet](https://hostnet.nl)
- [Byte](https://byte.nl)

**Internationaal:**
- [Namecheap](https://namecheap.com) - €10/jaar
- [Google Domains](https://domains.google)

### Stap 2: Koppel aan Netlify

**In Netlify Dashboard:**
1. Ga naar Site settings → Domain management
2. Klik "Add custom domain"
3. Voer je domein in (bijv. `agpeya.nl`)
4. Volg DNS instructies

**Bij je domain provider:**
1. Ga naar DNS settings
2. Voeg A record toe naar Netlify IP
3. Of: CNAME naar `[jouw-site].netlify.app`
4. Wacht 24 uur voor propagatie

**SSL Certificaat:**
- Automatisch door Netlify (Let's Encrypt)
- Gratis HTTPS binnen 1 uur

---

## 💰 Kosten Overzicht

### Volledig Gratis Setup:

| Item | Kosten | Notities |
|------|--------|----------|
| **Netlify Hosting** | €0 | 100GB bandwidth/maand gratis |
| **Vercel Hosting** | €0 | Alternatief voor Netlify |
| **GitHub Pages** | €0 | Als je GitHub gebruikt |
| **SSL Certificaat** | €0 | Auto via Let's Encrypt |
| **PWA Features** | €0 | Allemaal native web tech |
| **Service Worker** | €0 | Deel van browser API |

**Totaal: €0** 🎉

### Optionele Kosten:

| Item | Kosten | Nodig? |
|------|--------|--------|
| **Custom Domain** | €10/jaar | Nee (krijg gratis subdomain) |
| **Google Analytics** | €0 | Nee (maar handig) |
| **Push Notificaties** | €0 | Nee (future feature) |

---

## 🔄 Updates Deployen

### Automatisch (Met GitHub):

```bash
# Maak changes in je code
git add .
git commit -m "Update gebeden"
git push
```

✅ **Netlify/Vercel deployed automatisch binnen 1 minuut!**

### Handmatig (Netlify Drop):

```bash
# Build je app
npm run build

# Sleep nieuwe dist folder naar Netlify dashboard
```

### Gebruikers krijgen updates:

- **Automatisch** bij volgende app open (met internet)
- **Service Worker** haalt nieuwe versie op achtergrond
- **Geen actie** van gebruiker nodig

---

## 📈 Analytics (Optioneel)

### Google Analytics Setup:

**1. Maak account:**
- Ga naar [analytics.google.com](https://analytics.google.com)
- Maak property aan voor je app

**2. Voeg tracking toe:**

In `/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**3. Track events:**

```typescript
// Track gebed opens
gtag('event', 'open_prayer', {
  'prayer_name': 'Eerste Uur'
});

// Track installaties
gtag('event', 'app_install');
```

---

## 🎊 Launch Checklist

### Pre-Launch:

- [ ] Alle gebeden compleet en gecontroleerd
- [ ] Koptische teksten tonen correct
- [ ] Icons toegevoegd en getest
- [ ] App gebuild (`npm run build`)
- [ ] Gedeployed naar Netlify
- [ ] Custom domain gekoppeld (optioneel)
- [ ] SSL certificaat actief (https)
- [ ] PWA installatie getest op iPhone
- [ ] PWA installatie getest op Android
- [ ] Offline mode getest
- [ ] Dark mode werkt correct
- [ ] QR code gemaakt en getest
- [ ] Lighthouse PWA score 90+
- [ ] Screenshots gemaakt voor promotie

### Launch Day:

- [ ] Kondig aan in kerk
- [ ] Deel URL in WhatsApp groepen
- [ ] Post op social media (Facebook, Instagram)
- [ ] Print QR codes voor in de kerk
- [ ] Stuur email naar gemeenschap
- [ ] Voeg toe aan kerk website

### Na Launch:

- [ ] Monitor analytics (als geïnstalleerd)
- [ ] Verzamel feedback van gebruikers
- [ ] Fix bugs indien nodig
- [ ] Voeg extra gebeden toe
- [ ] Overweeg extra features (push notificaties, etc.)

---

## 📚 Meer Resources

### Documentatie in je Project:

- **`INSTALLATIE-INSTRUCTIES.md`** - Voor eindgebruikers (stuur naar je gemeenschap)
- **`DEPLOYMENT.md`** - Volledige deployment handleiding
- **`PWA-SETUP.md`** - Technische PWA details
- **`README-PWA.md`** - Dit bestand (overzicht)

### Externe Links:

- [PWA Builder](https://www.pwabuilder.com/) - PWA test tools
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/) - Google's PWA handleiding
- [Netlify Docs](https://docs.netlify.com/) - Hosting documentatie
- [MDN Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - Technical reference

---

## 🙏 Support & Vragen

### Community:

Deel je ervaring met andere Koptisch-Orthodoxe gemeenschappen!

### Technische Vragen:

1. Check eerst de troubleshooting sectie hierboven
2. Bekijk browser console voor errors (F12)
3. Test in incognito mode (schone state)
4. Check Netlify build logs bij deployment problemen

---

## ✨ Conclusie

Je hebt nu een **complete PWA** die:

✅ **Werkt offline** na eerste bezoek  
✅ **Installeerbaar** is op iOS en Android  
✅ **Snel laadt** met service worker caching  
✅ **Gratis** te hosten op Netlify/Vercel  
✅ **Professioneel** oogt als echte app  
✅ **Eenvoudig** te delen via QR code  
✅ **Mobiel-first** ontworpen  
✅ **Dark mode** support  
✅ **Auto-updates** voor gebruikers  

**Geen App Store of Play Store kosten nodig!** 🎉

---

**✟ In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.**

---

**Veel succes met je Agpeya app launch!** 🚀📱🙏
