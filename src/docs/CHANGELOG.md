# 📋 Changelog - Agpeya App

## [1.1.0] - 2024-11-06

### ✨ Nieuw Toegevoegd

#### 🖊️ Tekst Editor
- **Volledig gebeden bewerken systeem**
  - Bewerk alle gebedsteksten direct in de app
  - Wijzig titels en inhoud van gebeden
  - Realtime preview van wijzigingen
  - Zoekfunctie om snel gebeden te vinden

- **Backup & Restore**
  - Exporteer al je aanpassingen als JSON backup
  - Importeer backups om wijzigingen te herstellen
  - Veilige opslag in browser LocalStorage

- **Origineel Reset**
  - Zet individuele gebeden terug naar origineel
  - Behoud van originele teksten in het systeem
  - Visuele indicator (✏️) voor aangepaste gebeden

#### 🛠️ PWA Tools
- **App Icon Generator**
  - Genereer 192x192 en 512x512 app icons
  - Automatisch Koptisch kruis design
  - Directe download functionaliteit

- **QR Code Generator**
  - Maak QR codes voor je app URL
  - Aanpasbare kleuren en grootte
  - Download als PNG afbeelding

#### 📱 PWA Optimalisaties
- **Installatie Prompt**
  - Slimme detectie wanneer gebruiker kan installeren
  - Eenmalige prompt per sessie
  - Makkelijk te sluiten zonder herhalingen

- **Service Worker**
  - Volledig offline functionaliteit
  - Cache van alle app bestanden
  - Snelle laadtijden bij herhaald gebruik

- **Web App Manifest**
  - Complete PWA configuratie
  - Icon sets voor alle apparaten
  - Standalone app modus

### 🔧 Verbeteringen
- Custom prayers worden automatisch geladen in gebedlezer
- Nederlandse vertalingen voor alle nieuwe features
- Donkere modus ondersteuning voor alle nieuwe componenten
- Responsive design voor desktop en mobiel

### 📚 Documentatie
- **TEKST-EDITOR-HANDLEIDING.md** - Complete editor instructies
- **PWA-HANDLEIDING.md** - App installatie gids
- **PWA-DEVELOPMENT.md** - Ontwikkelaar documentatie
- **SNELSTART-GUIDE.md** - Quick start voor gebruikers

### 🗑️ Verwijderd
- Griekse doxologieën verwijderd uit:
  - Compline (Twaalfde uur)
  - Midnight (Middernacht)
  - None (Negende uur)
  - Prime (Eerste uur)
  - Sext (Zesde uur)
  - Terce (Derde uur)
  - Vespers (Elfde uur)
  - Voorhangsel

---

## [1.0.0] - 2024-11-05

### Initiële Release

#### 🙏 Gebedsuren
- Alle 7 canonieke gebedsuren geïmplementeerd
- Eerste uur (PRIME)
- Derde uur (TERCE)
- Zesde uur (SEXT)
- Negende uur (NONE)
- Elfde uur (VESPERS)
- Twaalfde uur (COMPLINE)
- Middernachtgebed (MIDNIGHT)
- Gebed van het Voorhangsel
- Verschillende Gebeden

#### 📖 Gebedlezer
- Continue scroll door alle gebeden van een uur
- Verstelbare tekstgrootte (12-28px)
- Inhoudsopgave met snelle navigatie
- Donkere en lichte modus
- Swipe navigatie
- Koptische lettertypen voor specifieke teksten

#### 📅 Koptische Kalender
- Huidige Koptische datum berekening
- Maandnamen in het Nederlands
- Gregorian ↔ Coptic conversie

#### 🎨 UI/UX
- Mobiel-geoptimaliseerd ontwerp
- Touch-vriendelijke knoppen
- Smooth animaties en transities
- Koptisch kruis patroon achtergrond
- Responsive grid layout
- Sheet navigatie voor menu's

#### 🔤 Tekstopmaak
- Automatisch vet maken van specifieke termen
- CS Avva Shenouda lettertype support
- CS New Athanasius lettertype support
- HSV Psalmen formaat

#### 💾 Data Structuur
- Gemodulariseerde gebeden per uur
- TypeScript type safety
- Makkelijk uitbreidbaar systeem
- JSON-gebaseerde opslag

---

## Toekomstige Plannen

### Mogelijk Toekomstig (v1.2.0+)
- [ ] Cloud sync van aangepaste gebeden
- [ ] Meerdere taal ondersteuning (Engels, Arabisch)
- [ ] Audio opnamen van gebeden
- [ ] Gebed herinneringen/notificaties
- [ ] Thema aanpassingen (kleuren)
- [ ] Favoriete gebeden markeren
- [ ] Gebed geschiedenis bijhouden
- [ ] Delen van gebeden via social media
- [ ] Print vriendelijke weergave
- [ ] Volledig offline Koptische kalender

---

**Versie Nummering**: MAJOR.MINOR.PATCH
- **MAJOR**: Grote veranderingen, mogelijk breaking changes
- **MINOR**: Nieuwe features, backwards compatible
- **PATCH**: Bug fixes en kleine verbeteringen
