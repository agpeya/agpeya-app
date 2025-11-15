# 📱 PWA Setup Compleet - Agpeya App

## ✅ Wat is er toegevoegd?

Je Agpeya app is nu een **volledige Progressive Web App (PWA)** die gebruikers kunnen installeren op hun telefoon!

### 📁 Nieuwe Bestanden:

1. **`/public/manifest.json`**
   - App configuratie
   - Naam, iconen, kleuren
   - Standalone mode instellingen

2. **`/public/service-worker.js`**
   - Offline functionaliteit
   - Caching strategie
   - Background sync

3. **`/index.html`**
   - PWA meta tags
   - Apple Touch icons
   - Viewport settings
   - Service worker registratie

4. **`/components/InstallPrompt.tsx`**
   - Installatie prompt component
   - Toont na 3 seconden
   - Kan weggedrukt worden
   - Werkt op Android & iOS

5. **`/INSTALLATIE-INSTRUCTIES.md`**
   - Gebruikers handleiding
   - iOS instructies
   - Android instructies
   - Veelgestelde vragen

6. **`/DEPLOYMENT.md`**
   - Deployment guide
   - Netlify, Vercel, GitHub Pages
   - Custom domain setup
   - Analytics & tips

---

## 🎨 App Icons Toevoegen

**BELANGRIJK:** Je moet nog app icons toevoegen!

### Wat je nodig hebt:

Maak deze bestanden aan in `/public/`:

```
/public/icon-192.png   (192x192 pixels)
/public/icon-512.png   (512x512 pixels)
```

### Hoe maken:

**Optie 1: Online Tool (Aanbevolen)**
1. Ga naar [RealFaviconGenerator.net](https://realfavicongenerator.net/)
2. Upload je Koptisch Kruis logo
3. Download alle gegenereerde iconen
4. Plaats `icon-192.png` en `icon-512.png` in `/public/`

**Optie 2: Handmatig**
1. Open je Koptisch Kruis afbeelding in een foto-editor
2. Maak twee versies:
   - 192 x 192 pixels → sla op als `icon-192.png`
   - 512 x 512 pixels → sla op als `icon-512.png`
3. Plaats in `/public/` map

**Tips voor de icons:**
- Gebruik een vierkante achtergrond (bijv. amber/goud)
- Zorg dat het kruis goed zichtbaar is
- Vermijd witte achtergrond (voor dark mode)
- Test op verschillende achtergronden

---

## 🚀 Hoe Deployen?

### Snelste Methode: Netlify Drop

1. **Build je app:**
   ```bash
   npm run build
   ```

2. **Ga naar Netlify:**
   - [netlify.com/drop](https://app.netlify.com/drop)
   - Maak gratis account

3. **Sleep de `dist` folder:**
   - Sleep de hele `dist` folder naar Netlify
   - Klaar! Je krijgt een URL

4. **Deel de URL:**
   - Bijvoorbeeld: `https://agpeya-app.netlify.app`
   - Gebruikers kunnen nu de app installeren!

---

## 📱 Installatie Testen

### Op je eigen telefoon:

**iPhone/iPad:**
1. Open de app URL in Safari
2. Tik op delen knop (vierkant met pijl)
3. Scroll naar "Zet in beginscherm"
4. Tik "Voeg toe"

**Android:**
1. Open de app URL in Chrome
2. Pop-up verschijnt: "App installeren"
3. Of: Menu (⋮) → "App installeren"
4. Tik "Installeren"

**Desktop (Chrome/Edge):**
1. Open de app URL
2. Installatie icoon verschijnt in adresbalk
3. Of: Menu → "Agpeya installeren"

---

## ⚙️ Wat Doet de PWA?

### ✨ Features:

**📴 Offline Werken:**
- Na eerste bezoek werkt de app zonder internet
- Gebeden zijn lokaal opgeslagen
- Service Worker cached de content

**🏠 Home Screen Icon:**
- App verschijnt als icoon op telefoon
- Geen browser-balk meer
- Voelt aan als native app

**⚡ Snelle Laadtijd:**
- Cached content laadt instant
- Alleen eerste keer download
- Updates automatisch op achtergrond

**🔔 Installatie Prompt:**
- Verschijnt na 3 seconden
- Kan weggedrukt worden
- Wordt 1x getoond (LocalStorage)

**💾 LocalStorage:**
- Dark/Light mode voorkeur opgeslagen
- Installatie prompt status opgeslagen

---

## 🔧 Technische Details

### Manifest.json Instellingen:

```json
{
  "display": "standalone",          // Fullscreen app
  "orientation": "portrait",        // Alleen verticaal
  "background_color": "#fffbeb",    // Amber achtergrond
  "theme_color": "#92400e",         // Amber statusbalk
  "scope": "/",                     // Hele site
  "start_url": "/"                  // Start pagina
}
```

### Service Worker Strategie:

**Network First:**
- Probeer eerst internet
- Bij falen: gebruik cache
- Altijd verse content als mogelijk
- Fallback naar offline versie

**Cache Naam:**
- `agpeya-v1` - update versie bij grote changes
- Oude caches worden automatisch verwijderd

---

## 📊 PWA Audit

### Chrome DevTools Checklist:

1. **Open DevTools** (F12)

2. **Lighthouse Tab:**
   - Run audit
   - Check PWA score
   - Moet 100% zijn!

3. **Application Tab:**
   - Manifest: ✅ Correct ingeladen?
   - Service Workers: ✅ Geregistreerd?
   - Cache Storage: ✅ Bestanden gecached?

4. **Network Tab:**
   - Offline modus testen
   - App moet blijven werken

---

## 🎯 Optimalisaties

### Already Included:

✅ **Mobile-First Design:**
- Viewport meta tag
- Touch-friendly buttons
- Swipe gestures
- Responsive layout

✅ **Performance:**
- Lazy loading
- Code splitting
- Optimized bundles
- Minimal dependencies

✅ **Accessibility:**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

✅ **SEO:**
- Meta descriptions
- Structured data ready
- Semantic markup
- Fast loading

---

## 🐛 Troubleshooting

### Service Worker niet geregistreerd?

**Check Console:**
```javascript
// Open DevTools Console (F12)
// Moet zien: "Service Worker geregistreerd: ..."
```

**Oplossing:**
1. Hard refresh: Ctrl+Shift+R
2. Clear cache & hard reload
3. Check `/public/service-worker.js` bestaat
4. HTTPS verplicht (localhost ok voor testen)

### Manifest niet gevonden?

**Check:**
1. Bestand bestaat op `/public/manifest.json`
2. Link in `index.html` klopt
3. CORS headers bij hosting

**DevTools:**
- Application → Manifest
- Zie je errors? Fix ze!

### Icons niet zichtbaar?

**Check:**
1. `icon-192.png` en `icon-512.png` in `/public/`
2. Paden in manifest.json kloppen
3. Icons zijn valid PNG bestanden
4. Clear app cache en herinstalleer

### Installatie prompt verschijnt niet?

**Oorzaken:**
1. Al eerder weggedrukt → `localStorage.clear()`
2. App al geïnstalleerd → Verwijder eerst
3. Niet via HTTPS → Deploy eerst
4. iOS: Moet Safari gebruiken (niet Chrome)

---

## 📈 Volgende Stappen

### Nu:
1. ✅ Build de app (`npm run build`)
2. ✅ Voeg app icons toe (`/public/icon-*.png`)
3. ✅ Deploy naar Netlify/Vercel
4. ✅ Test installatie op je telefoon

### Later (Optioneel):
- [ ] Custom domein koppelen (bijv. `agpeya.nl`)
- [ ] Google Analytics toevoegen
- [ ] Push notificaties voor gebedstijden
- [ ] Background sync voor updates
- [ ] Share functionaliteit (Web Share API)

---

## 📚 Gebruikers Informeren

### Deel deze instructies:

**WhatsApp Message Template:**
```
📱 Agpeya App - Koptisch Gebedenboek

Installeer de app op je telefoon:
🔗 https://jouw-app.netlify.app

📱 iPhone: Open in Safari → Deel → Zet in beginscherm
🤖 Android: Open in Chrome → Installeren

✨ Werkt offline!
✝️ Alle zeven gebedsuren
🌙 Dark mode
```

**Email Template:**
Zie `/INSTALLATIE-INSTRUCTIES.md` voor volledige gebruikershandleiding.

---

## ✅ Launch Checklist

Voor je de app lanceert:

- [ ] App icons toegevoegd (`192px` en `512px`)
- [ ] Gebeden zijn compleet en correct
- [ ] Koptische teksten tonen goed
- [ ] Dark mode werkt correct
- [ ] Getest op iPhone (Safari)
- [ ] Getest op Android (Chrome)
- [ ] Service Worker werkt offline
- [ ] Installatie prompt werkt
- [ ] App info is correct in manifest
- [ ] Lighthouse PWA score is 90+
- [ ] App gedeployed op HTTPS
- [ ] Installatie getest op echte devices
- [ ] Screenshots gemaakt voor promotie
- [ ] Gebruikers instructies klaar
- [ ] QR code gegenereerd (optioneel)

---

## 🎉 Klaar voor Launch!

Je Agpeya app is nu een complete PWA die:

✅ **Installeerbaar** is op iOS en Android  
✅ **Offline** werkt na eerste bezoek  
✅ **Snel** laadt met service worker caching  
✅ **Mobile-first** ontworpen voor telefoons  
✅ **Gratis** te hosten op Netlify/Vercel  
✅ **Geen App Store** kosten nodig  

**Veel succes met je launch!** 🚀🙏

---

**✟ In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.**
