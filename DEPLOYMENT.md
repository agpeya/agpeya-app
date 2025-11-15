# 🚀 Agpeya App Deployen (Online Zetten)

Deze app is een **Progressive Web App (PWA)** die je gratis kunt hosten. Hier zijn de beste opties:

---

## ✨ Optie 1: Netlify (Aanbevolen - Gratis & Makkelijk)

### Stappen:

1. **Maak een Netlify account**
   - Ga naar [netlify.com](https://netlify.com)
   - Meld je aan met GitHub/GitLab/Email

2. **Upload je project**
   - Klik op "Add new site" → "Deploy manually"
   - Sleep je project map naar het upload gebied
   - Of: Koppel je GitHub repository

3. **Build instellingen** (als je GitHub gebruikt)
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Custom domein** (optioneel)
   - Gratis `.netlify.app` subdomain
   - Of koppel je eigen domein (bijv. `agpeya.nl`)

5. **PWA Configuratie**
   - Netlify detecteert automatisch je manifest.json
   - Service worker wordt automatisch geserveerd

✅ **Klaar!** Je app is nu live op een URL zoals: `jouw-app-naam.netlify.app`

---

## 🎯 Optie 2: Vercel (Ook Gratis & Snel)

### Stappen:

1. **Maak een Vercel account**
   - Ga naar [vercel.com](https://vercel.com)
   - Meld je aan met GitHub

2. **Importeer project**
   - Klik "Add New" → "Project"
   - Importeer je GitHub repository
   - Of gebruik Vercel CLI: `npx vercel`

3. **Deploy**
   - Vercel detecteert automatisch dat het een React app is
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Custom domein**
   - Gratis `.vercel.app` subdomain
   - Of koppel je eigen domein

✅ **Klaar!** Je app is nu live!

---

## 📦 Optie 3: GitHub Pages (Gratis)

### Stappen:

1. **Push code naar GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/jouw-username/agpeya.git
   git push -u origin main
   ```

2. **Installeer gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update package.json**
   Voeg toe:
   ```json
   {
     "homepage": "https://jouw-username.github.io/agpeya",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **GitHub Settings**
   - Ga naar repository Settings → Pages
   - Source: gh-pages branch
   - Save

✅ **Klaar!** App is live op: `https://jouw-username.github.io/agpeya`

---

## 🌐 Eigen Domein Koppelen (Optioneel)

### Koop een domein:
- [TransIP](https://transip.nl) - Nederlandse provider
- [Namecheap](https://namecheap.com) - Internationaal
- Ongeveer €10/jaar voor een `.nl` domein

### Koppel domein aan Netlify/Vercel:
1. Ga naar Domain Settings in Netlify/Vercel
2. Voeg je custom domain toe (bijv. `agpeya.nl`)
3. Update de DNS records bij je domain provider:
   - Voor Netlify: Wijs A record naar hun IP
   - Voor Vercel: Wijs CNAME naar `.vercel-dns.com`
4. Wacht 24 uur voor DNS propagatie

---

## 🔒 HTTPS & SSL

**Gratis SSL certificaat:**
- ✅ Netlify: Automatisch (Let's Encrypt)
- ✅ Vercel: Automatisch (Let's Encrypt)
- ✅ GitHub Pages: Automatisch

Je app krijgt automatisch een `https://` URL!

---

## 📱 PWA Checklist voor Deployment

Zorg dat deze bestanden aanwezig zijn:

- ✅ `/public/manifest.json` - App manifest
- ✅ `/public/service-worker.js` - Offline functionaliteit
- ✅ `/public/icon-192.png` - App icon 192x192
- ✅ `/public/icon-512.png` - App icon 512x512
- ✅ `/index.html` - Met PWA meta tags

---

## 🎨 App Icons Genereren

Je hebt iconen nodig in verschillende maten:

### Online tools (Gratis):
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Genereert alle iconen
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)

### Upload je Koptisch Kruis logo:
1. Upload het kruisbeeld (minimaal 512x512px)
2. Download alle gegenereerde iconen
3. Plaats in `/public/` map
4. Update `manifest.json` met de juiste paths

---

## 🔄 Updates Deployen

### Netlify/Vercel (GitHub connected):
```bash
git add .
git commit -m "Update gebeden"
git push
```
✅ Automatisch gedeployed binnen 1 minuut!

### Handmatige upload (Netlify):
- Sleep je nieuwe build folder naar Netlify dashboard

### GitHub Pages:
```bash
npm run deploy
```

---

## 📊 Analytics (Optioneel)

Wil je weten hoeveel mensen je app gebruiken?

### Google Analytics (Gratis):
1. Maak account op [analytics.google.com](https://analytics.google.com)
2. Krijg tracking ID (bijv. `G-XXXXXXXXXX`)
3. Voeg toe aan `index.html`:
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

---

## 💡 Tips voor Succes

1. **Test eerst lokaal:**
   ```bash
   npm run dev
   ```
   Open op je telefoon: `http://jouw-ip:5173`

2. **Build test:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Lighthouse score checken:**
   - Open app in Chrome
   - DevTools (F12) → Lighthouse tab
   - Run test
   - Streef naar 90+ PWA score

4. **Social Media delen:**
   - Voeg Open Graph tags toe aan `index.html`
   - Maak een mooie preview afbeelding

5. **QR Code maken:**
   - Gebruik [qr-code-generator.com](https://www.qr-code-generator.com/)
   - Laat mensen je app scannen en installeren!

---

## 🆘 Problemen Oplossen

**PWA installeert niet:**
- Check of je HTTPS gebruikt (verplicht!)
- Controleer of `manifest.json` geladen wordt
- Kijk in Chrome DevTools → Application → Manifest

**Service Worker werkt niet:**
- Check Console voor errors
- Verwijder oude service workers in DevTools
- Hard refresh: Ctrl+Shift+R (PC) of Cmd+Shift+R (Mac)

**Icons worden niet getoond:**
- Controleer of de paths in manifest.json kloppen
- Icons moeten in `/public/` staan
- Clear browser cache

---

## ✅ Checklist voor Eerste Deployment

- [ ] Code getest lokaal
- [ ] App icons gegenereerd en toegevoegd
- [ ] Manifest.json geconfigureerd
- [ ] Service worker getest
- [ ] Build succesvol (`npm run build`)
- [ ] Hosting platform gekozen (Netlify/Vercel)
- [ ] App gedeployed
- [ ] PWA installatie getest op mobiel
- [ ] Custom domein gekoppeld (optioneel)
- [ ] SSL certificaat actief (https)
- [ ] Getest op iOS en Android

---

## 🙏 Je App Delen

### QR Code:
Genereer een QR code naar je app URL en deel in:
- Kerk bulletin
- WhatsApp groepen
- Social media
- Flyers

### Direct Link:
Deel je app URL:
```
https://jouw-app.netlify.app

Installeer de Agpeya app op je telefoon:
📱 iPhone: Open in Safari → Deel → Zet in beginscherm
🤖 Android: Open in Chrome → Menu → App installeren
```

---

**Veel succes met je deployment!** 🚀

Bij vragen, check de documentatie van je hosting provider.

**✟ In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.**
