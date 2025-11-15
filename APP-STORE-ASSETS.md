# 🎨 Agpeya App - App Store Assets Guide

Complete gids voor alle benodigde assets voor de iOS App Store submission.

---

## 📱 App Icons (Verplicht)

### Benodigde Sizes

Je hebt iconen nodig in deze formaten:

| Size | Gebruik | Platform |
|------|---------|----------|
| 1024x1024 | App Store | iOS |
| 180x180 | iPhone App | iOS |
|167x167 | iPad Pro | iOS |
| 152x152 | iPad | iOS |
| 120x120 | iPhone | iOS |
| 87x87 | iPhone (notifications) | iOS |
| 80x80 | iPad (spotlight) | iOS |
| 76x76 | iPad | iOS |
| 60x60 | iPhone (spotlight) | iOS |
| 58x58 | iPhone (settings) | iOS |
| 40x40 | iPad (spotlight) | iOS |
| 29x29 | iPhone/iPad (settings) | iOS |
| 20x20 | iPad (notifications) | iOS |

### Hoe te Maken

#### **Optie 1: Online Tool (Makkelijkst!)**

Gebruik een gratis online tool:

1. **AppIcon Generator:**
   - Ga naar: [appicon.co](https://www.appicon.co/)
   - Upload je `icon.svg` (1024x1024 of hoger)
   - Klik "Generate"
   - Download de .zip file
   - Pak uit, je hebt nu alle sizes! 📦

2. **Alternatief: RealFaviconGenerator**
   - [realfavicongenerator.net](https://realfavicongenerator.net/)
   - Kies iOS optie
   - Download alle iconen

#### **Optie 2: Handmatig (Meer Controle)**

Als je Photoshop/Figma/Sketch hebt:

1. Open je Koptisch kruis design
2. Export als PNG voor elke size
3. Settings:
   - **Formaat:** PNG
   - **Achtergrond:** Niet transparant (vul met amber gradient)
   - **Kwaliteit:** Maximaal
   - **Color Profile:** sRGB

#### **Optie 3: Gebruik je huidige SVG**

Je hebt al `/public/icon.svg`! Converteer het:

```bash
# Installeer svg-to-png tool
npm install -g svg-to-png-cli

# Of gebruik online tool:
# cloudconvert.com/svg-to-png
```

Upload je SVG, download in elke size!

---

## 📸 Screenshots (Verplicht)

### Benodigde Sizes

Apple vereist screenshots in deze formaten:

#### **iPhone:**
| Device | Size | Required |
|--------|------|----------|
| 6.7" (iPhone 15 Pro Max) | 1290x2796 | ✅ Ja |
| 6.5" (iPhone 14 Plus) | 1284x2778 | ✅ Ja |
| 5.5" (iPhone 8 Plus) | 1242x2208 | Optioneel |

#### **iPad:**
| Device | Size | Required |
|--------|------|----------|
| 12.9" iPad Pro | 2048x2732 | ✅ Ja (als je iPad support) |
| 11" iPad Pro | 1668x2388 | Optioneel |

**Minimum:** 3 screenshots, **Maximum:** 10 screenshots per device type.

### Wat te Laten Zien in Screenshots

**Screenshot 1: Home Screen**
- Alle 7 gebedsuren
- Koptische kalender kaart
- Mooie header met AGPEYA titel

**Screenshot 2: Gebedenlezer**
- Open gebed (bijv. Prime)
- Toon de mooie typografie
- Highlight HSV versindeling

**Screenshot 3: Dark Mode**
- Zelfde view maar in dark mode
- Laat de amber accenten zien

**Screenshot 4: Koptische Kalender**
- Kalender overzicht
- Feesten en vastentijden

**Screenshot 5: Gebedstekst**
- Close-up van een psalm
- Laat versnummers zien
- Toon leesbaarheid

### Hoe Screenshots Maken

#### **Methode 1: In Xcode Simulator (Beste kwaliteit)**

1. Open je app in Xcode
2. Kies het juiste device:
   - iPhone 15 Pro Max (6.7")
3. Run de app (▶️)
4. Navigeer naar de view die je wilt vastleggen
5. **Command + S** = Screenshot!
6. Screenshots worden opgeslagen in: `~/Desktop/`

#### **Methode 2: Op Echte iPhone**

1. Open de app op je iPhone
2. Maak screenshot: **Volume Up + Power knop**
3. AirDrop naar je Mac
4. Resize indien nodig

#### **Methode 3: Browser (Voor initiële tests)**

1. Open je PWA in browser
2. Open DevTools (F12)
3. Klik op "Toggle Device Toolbar" (of Ctrl+Shift+M)
4. Kies "iPhone 15 Pro Max"
5. Resize naar 1290x2796
6. Screenshot maken
7. **Let op:** Dit is minder perfect dan echte simulator!

### Screenshots Optimaliseren

**Tips voor mooie screenshots:**

1. **Voeg tekst toe** (optioneel):
   - "Bid de 7 canonieke uren"
   - "HSV Bijbelteksten"
   - "Dark Mode Support"
   - "Offline beschikbaar"

2. **Gebruik Figma/Photoshop:**
   - Maak een template met device frame
   - Plaats screenshots erin
   - Voeg branding toe
   - Export als PNG

3. **Tools voor mooie screenshots:**
   - [screenshots.pro](https://screenshots.pro/) - Voegt device frames toe
   - [shotsnapp.com](https://shotsnapp.com/) - Maakt marketing screenshots
   - [placeit.net](https://placeit.net/) - Device mockups

---

## 📝 App Store Beschrijving

### Nederlandse Beschrijving (Primary)

**Titel (30 chars max):**
```
Agpeya - Koptisch Gebedenboek
```

**Subtitle (30 chars max):**
```
7 Canonieke Uren Dagelijks
```

**Promotional Text (170 chars max):**
```
Bid mee met de Koptisch-Orthodoxe Kerk. Alle zeven gebedsuren in het Nederlands, met HSV psalmen. Gratis, offline beschikbaar, en zonder advertenties.
```

**Description (4000 chars max):**
```
AGPEYA - HET KOPTISCH-ORTHODOXE GEBEDENBOEK

Welkom bij de officiële Agpeya app van het Koptisch-Orthodox Bisdom Nederland. Deze app biedt alle zeven canonieke gebedsuren volledig in het Nederlands, zodat je overal en altijd kunt bidden.

WAT IS DE AGPEYA?

De Agpeya (Koptisch: "Het Boek der Uren") is het traditionele gebedenboek van de Koptisch-Orthodoxe Kerk. Het bevat de zeven canonieke gebedstijden die sinds de vroege kerk worden gebeden, gebaseerd op Psalm 119:164 - "Zevenmaal daags loof ik U".

DE 7 GEBEDSUREN

1. NACHTGEBED (Prime) - Middernacht
   Begin de dag met God in stilte en overpeinzing

2. MORGENGEBED (Terce) - 6:00 uur
   Verwelkom de nieuwe dag met lof en dankzegging

3. DERDE UURGEBED (Sext) - 9:00 uur
   Herinner je de uitstorting van de Heilige Geest

4. ZESDE UURGEBED (None) - 12:00 uur
   Gedenk Christus' kruisiging op Golgotha

5. NEGENDE UURGEBED (Vespers) - 15:00 uur
   Herdenk Christus' dood aan het kruis

6. AVONDGEBED (Compline) - 18:00 uur
   Sluit de dag af met dankbaarheid

7. SLAAPGEBED (Midnight Prayer) - Voor het slapen
   Rust in Gods vrede

FUNCTIES

✝ Alle 7 gebedsuren compleet in Nederlands
✝ HSV (Herziene Statenvertaling) voor psalmen
✝ Liturgische gebeden en lezingen
✝ Koptische kalender met feesten en vastentijden
✝ Gregoriaanse kalender met kerkelijke data
✝ Dark mode voor avondgebed
✝ Offline beschikbaar - geen internet nodig
✝ Responsive design voor alle apparaten
✝ Geen advertenties of in-app aankopen
✝ Privacy first - geen tracking
✝ Regelmatige updates met vernieuwde gebeden

BIJZONDERE KENMERKEN

• HSV VERSINDELING
Alle psalmen en Schriftteksten gebruiken de Herziene Statenvertaling met duidelijke versindeling voor beter begrip en meditatief lezen.

• KOPTISCHE KALENDER
Ontdek de rijke liturgische traditie met een overzicht van alle Koptische feesten, heiligendagen en vastentijden.

• GEBRUIKSVRIENDELIJK
Overzichtelijke interface geoptimaliseerd voor mobiel gebruik. Lees comfortabel zonder afleidingen.

• ORTHODOX TRADITIE
Trouw aan de Koptisch-Orthodoxe liturgische traditie, met zegen van het Bisdom Nederland.

VOOR WIE?

Deze app is perfect voor:
- Koptisch-Orthodoxe gelovigen in Nederland
- Iedereen die wil leren over de Agpeya
- Christenen die de liturgische traditie willen ontdekken
- Degenen die dagelijks gestructureerd willen bidden

VOLLEDIG GRATIS

Deze app is volledig gratis en bevat geen advertenties of verborgen kosten. Het is een gift aan de gelovige gemeenschap.

OVER HET BISDOM

Uitgegeven door het Koptisch-Orthodox Bisdom Nederland onder leiding van Zijne Heiligheid Paus Tawadros II en Zijne Eminentie Bisschop Arsanios.

SUPPORT & FEEDBACK

Vragen of suggesties? Neem contact op via het Bisdom Nederland.

✟ In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.
```

**Keywords (100 chars max):**
```
koptisch,orthodox,gebed,agpeya,bisdom,liturgie,psalmen,uren,christelijk,nederlands
```

---

### Engelse Beschrijving (Secondary)

**Title:**
```
Agpeya - Coptic Prayer Book
```

**Subtitle:**
```
7 Canonical Hours of Prayer
```

**Description:**
```
AGPEYA - THE COPTIC ORTHODOX PRAYER BOOK

The official Agpeya app of the Coptic Orthodox Diocese of the Netherlands. All seven canonical hours of prayer in Dutch, with psalm texts from the Dutch Revised Standard Version (HSV).

WHAT IS THE AGPEYA?

The Agpeya (Coptic: "Book of Hours") is the traditional prayer book of the Coptic Orthodox Church, containing the seven canonical prayer times based on Psalm 119:164 - "Seven times a day I praise You".

THE 7 PRAYER HOURS

1. MIDNIGHT PRAYER (Prime)
2. MORNING PRAYER (Terce) - 6 AM
3. THIRD HOUR PRAYER (Sext) - 9 AM
4. SIXTH HOUR PRAYER (None) - Noon
5. NINTH HOUR PRAYER (Vespers) - 3 PM
6. EVENING PRAYER (Compline) - 6 PM
7. VEIL PRAYER (Before Sleep)

FEATURES

✝ All 7 prayer hours in Dutch
✝ HSV Bible translation for psalms
✝ Coptic calendar with feasts and fasts
✝ Gregorian calendar integration
✝ Dark mode support
✝ Works offline - no internet required
✝ No ads or in-app purchases
✝ Privacy focused - no tracking
✝ Regular updates

Completely free. No ads. Orthodox tradition.

✟ In the Name of the Father, the Son, and the Holy Spirit, One God, Amen.
```

---

## 🎬 App Preview Video (Optioneel)

Apple staat toe dat je een 30-seconde video toevoegt.

### Script Idee:

**0-5s:** Open app, laat home screen zien
**5-10s:** Scroll door gebedsuren
**10-15s:** Open een gebed (bijv. Morgengebed)
**15-20s:** Scroll door mooie psalm tekst
**20-25s:** Laat dark mode toggle zien
**25-30s:** Laat kalender zien, eindig met logo

### Hoe te Maken:

1. **Opnemen in Simulator:**
   - Xcode → Window → Devices and Simulators
   - Selecteer simulator
   - Klik "Screenshot" → "Record Screen"

2. **Bewerken:**
   - iMovie (gratis op Mac)
   - Final Cut Pro
   - DaVinci Resolve (gratis)

3. **Specs:**
   - **Formaat:** .mov of .mp4
   - **Resolutie:** 1920x1080 of hoger
   - **Lengte:** 15-30 seconden
   - **Bestandsgrootte:** Max 500MB

---

## 🌐 Support & Privacy URL's

### Support URL (Verplicht)

Maak een simpele support pagina. Minimale inhoud:

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Agpeya App - Support</title>
</head>
<body>
  <h1>Agpeya App Support</h1>
  
  <h2>Contact</h2>
  <p>
    Voor vragen over de Agpeya app, neem contact op met:<br>
    Koptisch-Orthodox Bisdom Nederland<br>
    Email: info@bisdom.nl (pas aan!)<br>
    Website: www.bisdom.nl
  </p>
  
  <h2>Veel Gestelde Vragen</h2>
  
  <h3>Hoe installeer ik de app?</h3>
  <p>Download de app via de App Store en open deze.</p>
  
  <h3>Werkt de app offline?</h3>
  <p>Ja! Alle gebeden zijn offline beschikbaar.</p>
  
  <h3>Is de app gratis?</h3>
  <p>Ja, de app is volledig gratis zonder advertenties.</p>
  
  <h3>Welke Bijbelvertaling wordt gebruikt?</h3>
  <p>We gebruiken de Herziene Statenvertaling (HSV) voor psalmen.</p>
  
  <h2>Technische Problemen</h2>
  <p>Bij technische problemen, email ons met:</p>
  <ul>
    <li>Je iPhone model</li>
    <li>iOS versie</li>
    <li>Beschrijving van het probleem</li>
    <li>Screenshots indien mogelijk</li>
  </ul>
</body>
</html>
```

Host dit op:
- Je Netlify site: `jouw-app.netlify.app/support.html`
- Of kerk website: `bisdom.nl/agpeya/support`

### Privacy Policy URL (Verplicht)

Minimale privacy policy:

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Agpeya App - Privacy Policy</title>
</head>
<body>
  <h1>Privacy Policy - Agpeya App</h1>
  
  <p><strong>Laatst bijgewerkt:</strong> [DATUM]</p>
  
  <h2>Welke Data Verzamelen We?</h2>
  <p><strong>GEEN DATA.</strong></p>
  
  <p>
    De Agpeya app verzamelt <strong>geen persoonlijke gegevens</strong>. 
    We tracken je gebruik niet, we verzamelen geen analytics, 
    en we delen geen informatie met derden.
  </p>
  
  <h2>Wat Slaan We Lokaal Op?</h2>
  <p>De app slaat lokaal op je apparaat op:</p>
  <ul>
    <li>Je thema voorkeur (dark/light mode)</li>
    <li>Gebedsteksten voor offline gebruik</li>
  </ul>
  
  <p>Deze data verlaat nooit je apparaat.</p>
  
  <h2>Cookies</h2>
  <p>We gebruiken geen cookies of tracking technologieën.</p>
  
  <h2>Externe Links</h2>
  <p>
    De app kan links bevatten naar externe websites 
    (zoals het Bisdom Nederland). We zijn niet verantwoordelijk 
    voor de privacy practices van deze websites.
  </p>
  
  <h2>Kinderen</h2>
  <p>
    Deze app is geschikt voor alle leeftijden. 
    We verzamelen bewust geen informatie van kinderen.
  </p>
  
  <h2>Wijzigingen</h2>
  <p>
    We kunnen deze privacy policy bijwerken. 
    Controleer deze pagina regelmatig voor updates.
  </p>
  
  <h2>Contact</h2>
  <p>
    Vragen over privacy? Neem contact op met:<br>
    Koptisch-Orthodox Bisdom Nederland<br>
    Email: info@bisdom.nl
  </p>
  
  <p>✟ In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.</p>
</body>
</html>
```

Host op: `jouw-app.netlify.app/privacy.html`

---

## 📋 Metadata Checklist

Alles wat je nodig hebt voor App Store Connect:

### **Tekst Content:**
- [ ] App naam (30 chars max)
- [ ] Subtitle (30 chars max)
- [ ] Promotional text (170 chars max)
- [ ] Beschrijving Nederlands (4000 chars max)
- [ ] Beschrijving Engels (optioneel)
- [ ] Keywords (100 chars max, komma gescheiden)
- [ ] What's New text (voor updates)

### **URLs:**
- [ ] Support URL
- [ ] Privacy Policy URL
- [ ] Marketing URL (optioneel - je Netlify PWA)

### **Visuele Assets:**
- [ ] App icon 1024x1024
- [ ] Alle icon sizes voor Xcode (20x20 t/m 180x180)
- [ ] Screenshots iPhone 6.7" (min 3, max 10)
- [ ] Screenshots iPhone 6.5" (min 3, max 10)
- [ ] Screenshots iPad 12.9" (optioneel, als je iPad support)
- [ ] App Preview video (optioneel)

### **App Info:**
- [ ] Primary category: Lifestyle
- [ ] Secondary category: Reference (optioneel)
- [ ] Age rating: 4+ (geen mature content)
- [ ] Copyright: © 2024 Koptisch-Orthodox Bisdom Nederland
- [ ] Prijs: Gratis
- [ ] Availability: Alle landen

---

## 🎨 Design Tips

### **Icon Design Principes:**

✅ **DO:**
- Houd het simpel en herkenbaar
- Gebruik het Koptisch kruis als centraal element
- Gebruik de amber/goud brand kleuren
- Maak het leesbaar op kleine sizes
- Test op wit én zwarte achtergrond

❌ **DON'T:**
- Te veel details (wordt onleesbaar op klein formaat)
- Tekst in de icon (Apple ontmoedigt dit)
- Transparante achtergrond (verplicht solide kleur)
- Screenshots van de app (moet een icon zijn, geen screenshot)

### **Screenshot Design Principes:**

✅ **DO:**
- Laat de kernfunctionaliteit zien
- Gebruik de app in de native staat (niet mockups)
- Volgorde: belangrijkste feature eerst
- Consistente lighting/tijdstip
- Laat dark mode zien

❌ **DON'T:**
- Fake data of mockups
- Te veel tekst overlay
- Slordige crops
- Verschillende UI states door elkaar

---

## 📦 Asset Package Structuur

Organiseer je assets zo:

```
agpeya-app-assets/
├── icons/
│   ├── app-icon-1024.png        (Voor App Store)
│   ├── app-icon-180.png         (iPhone)
│   ├── app-icon-167.png         (iPad Pro)
│   ├── app-icon-152.png         (iPad)
│   ├── app-icon-120.png         (iPhone)
│   ├── app-icon-87.png
│   ├── app-icon-80.png
│   ├── app-icon-76.png
│   ├── app-icon-60.png
│   ├── app-icon-58.png
│   ├── app-icon-40.png
│   ├── app-icon-29.png
│   └── app-icon-20.png
│
├── screenshots/
│   ├── iphone-6.7/
│   │   ├── 01-home.png          (1290x2796)
│   │   ├── 02-prayer.png
│   │   ├── 03-dark-mode.png
│   │   ├── 04-calendar.png
│   │   └── 05-reading.png
│   │
│   └── iphone-6.5/
│       ├── 01-home.png          (1284x2778)
│       └── [same as above]
│
├── video/
│   └── app-preview.mov          (Optioneel)
│
└── text/
    ├── description-nl.txt
    ├── description-en.txt
    ├── keywords.txt
    └── promotional-text.txt
```

---

## 🚀 Quick Start Checklist

**30 minuten versie (minimaal maar compleet):**

1. **Icons** (10 min):
   - Upload `icon.svg` naar [appicon.co](https://www.appicon.co/)
   - Download alle sizes
   - Klaar!

2. **Screenshots** (15 min):
   - Open app in Xcode Simulator (iPhone 15 Pro Max)
   - Maak 3 screenshots: home, gebed, dark mode
   - Cmd+S voor elke screenshot
   - Klaar!

3. **Tekst** (5 min):
   - Kopieer Nederlandse beschrijving hierboven
   - Kopieer keywords
   - Klaar!

**Je bent klaar voor submission!** 🎉

---

## 🌟 Pro Tips

1. **Localisatie:**
   - Start met alleen Nederlands
   - Voeg later Engels toe als je internationale gebruikers hebt

2. **A/B Testing:**
   - App Store laat je verschillende screenshots testen
   - Zie welke het beste converteren

3. **Updates:**
   - Update screenshots bij grote redesigns
   - Voeg "What's New" toe bij elke update
   - Houdt screenshots actueel

4. **Marketing:**
   - Gebruik dezelfde screenshots op je website
   - Deel op social media
   - QR code op kerkbulletins

---

## ✅ Final Checklist

Voor je submissie:

- [ ] Alle icon sizes gemaakt en getest
- [ ] Minimaal 3 screenshots per device size
- [ ] App beschrijving geschreven (NL + optioneel EN)
- [ ] Keywords gekozen
- [ ] Support pagina live
- [ ] Privacy policy pagina live
- [ ] Promotional tekst geschreven
- [ ] Copyright info correct
- [ ] Age rating ingesteld (4+)
- [ ] Prijs ingesteld (Gratis)
- [ ] Categorieën gekozen (Lifestyle, Reference)
- [ ] Build geüpload naar App Store Connect
- [ ] Alle info compleet in App Store Connect
- [ ] Final review gedaan
- [ ] **SUBMIT!** 🚀

---

**✟ In de Naam van de Vader en de Zoon en de Heilige Geest, Eén God, Amen.**

Veel succes met je App Store submission! 🙏✨
