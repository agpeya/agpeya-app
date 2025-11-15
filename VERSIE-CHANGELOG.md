# 📝 Agpeya App - Versie Changelog

## Versie 3.0 - Vereenvoudigde Interface (3 november 2025)

### **🎯 Belangrijkste Wijzigingen**

Deze versie is vereenvoudigd naar een pure **lees-applicatie** zonder bewerkingsfuncties. De focus ligt op een cleane, rustige leeservaring voor gebeden.

---

### **➖ Verwijderde Features**

#### **1. Koptisch Lettertype Toggle (T knop)**
- **Reden:** Vereenvoudiging interface
- **Wat er was:** Toggle knop in gebedlezer om tussen standaard en Koptisch lettertype te wisselen
- **Nu:** Koptische lettertypen kunnen nog steeds via CSS worden toegepast indien nodig

#### **2. Bewerken Knop & Editor**
- **Reden:** Focus op lezen, niet bewerken
- **Wat er was:** 
  - "Bewerken" knop onderaan gebedlezer
  - Volledige editor interface
  - Gebeden toevoegen/verwijderen
  - Kopiëren naar andere uren
  - LocalStorage opslag van wijzigingen
- **Nu:** Gebeden worden rechtstreeks bewerkt in `/data/prayers.ts`

#### **3. Volgorde Wijzigen Functionaliteit**
- **Reden:** Vaste structuur behouden
- **Wat er was:**
  - "Volgorde wijzigen" knop op hoofdpagina
  - Pijltjes omhoog/omlaag per uur
  - Opslaan/Annuleren knoppen
  - LocalStorage opslag van volgorde
- **Nu:** Vaste volgorde zoals gedefinieerd in `/data/prayers.ts`

#### **4. Per-Gebed Navigatie**
- **Reden:** Doorlopende leeservaring
- **Wat er was:**
  - Vorige/Volgende knoppen
  - Menu met gebedenselectie
  - Per gebed navigeren
  - Huidige gebed indicator (1/15)
- **Nu:** Alle gebeden in doorlopende scroll

---

### **✅ Behouden Features**

#### **1. Font Size Controls**
- ✅ Plus (+) en Minus (-) knoppen
- ✅ Range: 12px tot 28px
- ✅ Realtime aanpassing
- ✅ Blijft bewaard tijdens sessie

#### **2. Thema Toggle**
- ✅ Licht/donker modus schakelaar
- ✅ Maan/zon icoon
- ✅ LocalStorage persistentie
- ✅ Smooth overgangen

#### **3. Automatische Vetgedrukte Teksten**
- ✅ Hoofdlettergevoelige matching
- ✅ Configureerbaar via `/data/formatting-config.ts`
- ✅ Nederlandse termen (BOLD_TERMS)
- ✅ Koptische termen (COPTIC_TERMS)
- ✅ 25+ geconfigureerde termen

#### **4. Zeven Gebedsuren**
- ✅ Alle uren op hoofdpagina
- ✅ Koptische namen weergegeven
- ✅ Tijden en beschrijvingen
- ✅ Klik om te openen

#### **5. Responsive Design**
- ✅ Mobiel geoptimaliseerd
- ✅ Grote touch targets
- ✅ Sticky header
- ✅ Smooth scrolling

---

### **🆕 Nieuwe Features**

#### **Doorlopende Tekst Weergave**
- **Wat:** Alle gebeden van een uur worden na elkaar getoond in één scroll
- **Voordeel:** 
  - Ononderbroken leeservaring
  - Geen klikken/navigeren nodig
  - Natuurlijke flow van gebeden
  - Overzicht van volledig uur
- **Implementatie:**
  ```tsx
  {hour.prayers.map((prayer, index) => (
    <div key={prayer.id} className={index > 0 ? 'mt-8' : ''}>
      <h3>{prayer.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: formatPrayerContent(prayer.content) }} />
    </div>
  ))}
  ```

---

### **📊 Code Wijzigingen**

#### **Gewijzigde Bestanden**

**1. `/components/PrayerReader.tsx`**
- Verwijderd: `currentPrayerIndex`, `isMenuOpen`, `useCopticFont` states
- Verwijderd: `goToNext()`, `goToPrevious()`, `selectPrayer()` functies
- Verwijderd: Navigatieknoppen, menu sheet, edit button, Koptisch font toggle
- Toegevoegd: Map over alle prayers voor doorlopende weergave
- Imports: Verwijderd `ChevronLeft`, `ChevronRight`, `Menu`, `Edit`, `Type`, `Sheet` componenten

**2. `/App.tsx`**
- Verwijderd: `isEditing`, `isReordering` states
- Verwijderd: `prayerHours` setState (nu alleen getter)
- Verwijderd: `moveHourUp()`, `moveHourDown()`, `saveHourOrder()`, `cancelReordering()` functies
- Verwijderd: `handleSavePrayer()`, `handleCopyToHours()` functies
- Verwijderd: `PrayerEditor` rendering en imports
- Verwijderd: "Volgorde wijzigen" knop en reordering controls
- Imports: Verwijderd `ArrowUp`, `ArrowDown`, `Check`, `X`, `PrayerEditor`, `toast`, `Toaster`

**3. `/components/HourCard.tsx`**
- Verwijderd: `isReordering`, `onMoveUp`, `onMoveDown`, `canMoveUp`, `canMoveDown` props
- Verwijderd: Reordering buttons (pijltjes omhoog/omlaag)
- Verwijderd: Conditional rendering voor reordering mode
- Imports: Verwijderd `ArrowUp`, `ArrowDown`, `Button`

**4. `/PREVIEW-STATUS.md`**
- Updated: Functionaliteit beschrijving
- Updated: Test instructies
- Updated: Versienummer naar 3.0
- Verwijderd: Referenties naar verwijderde features

---

### **📁 Bestandsstructuur**

**Ongewijzigde Bestanden:**
- `/data/prayers.ts` - Gebeden database
- `/data/formatting-config.ts` - Vetgedrukte teksten config
- `/styles/globals.css` - Styling en Koptische fonts
- `/HANDLEIDING-GEBEDEN-TOEVOEGEN.md` - Handleiding
- `/VETGEDRUKTE-TEKSTEN.md` - Formatting documentatie
- `/PROJECT-OPSLAAN.md` - Opslag instructies

**Niet Meer Gebruikt:**
- `/components/PrayerEditor.tsx` - (nog aanwezig maar niet meer aangeroepen)

---

### **🎨 UI/UX Verschillen**

#### **Gebedlezer Interface**

**Voor (v2.1):**
```
┌─────────────────────────────────┐
│ Terug    [-] 16px [+] [T] [🌙] │
│        Gebeden van het...        │
├─────────────────────────────────┤
│                                  │
│  📖 Titel van Gebed             │
│                                  │
│  Gebed tekst hier...            │
│                                  │
├─────────────────────────────────┤
│ [◄ Vorige] [Menu 1/15] [► Volgende] │
│                                  │
│      [✏️ Bewerken]               │
└─────────────────────────────────┘
```

**Nu (v3.0):**
```
┌─────────────────────────────────┐
│ Terug         [-] 16px [+] [🌙] │
│        Gebeden van het...        │
├─────────────────────────────────┤
│                                  │
│  📖 Inleiding                   │
│  Tekst van inleiding...         │
│                                  │
│  📖 Onze Vader                  │
│  Tekst van Onze Vader...        │
│                                  │
│  📖 DANKGEBED                   │
│  Tekst van dankgebed...         │
│                                  │
│  📖 PSALM 50                    │
│  Tekst van psalm...             │
│                                  │
│  ... (alle gebeden doorlopend)  │
│                                  │
└─────────────────────────────────┘
```

---

### **💡 Rationale**

#### **Waarom Deze Wijzigingen?**

1. **Eenvoud:** Minder knoppen = minder afleiding tijdens gebed
2. **Focus:** Pure leeservaring zonder bewerkingsfuncties
3. **Flow:** Doorlopende tekst creëert natuurlijke gebedsstroom
4. **Onderhoud:** Direct bewerken in code is flexibeler voor ontwikkelaars
5. **Stabiliteit:** Geen gebruikerswijzigingen = consistente ervaring

#### **Voor Wie Is Deze Versie?**

✅ **Ideaal voor:**
- Gebruikers die alleen willen lezen en bidden
- Deployment zonder bewerking door eindgebruikers
- Eenvoudige, rustige interface voorkeur
- Overzicht van volledig uur in één keer

❌ **Niet ideaal voor:**
- Gebruikers die eigen gebeden willen toevoegen via UI
- Dynamische aanpassing van volgorde
- Per-gebed navigatie voorkeur

---

### **🔄 Migratie van v2.1 naar v3.0**

#### **Data Behoud**
- ✅ Alle gebeden blijven intact in `/data/prayers.ts`
- ✅ Thema voorkeur blijft bewaard in localStorage
- ❌ Opgeslagen bewerkingen in localStorage worden niet meer gebruikt
- ❌ Opgeslagen volgorde in localStorage wordt niet meer gebruikt

#### **Als Je Wilt Terugkeren naar v2.1**
De bestanden zijn niet verwijderd, dus je kunt:
1. `PrayerEditor.tsx` weer importeren in `App.tsx`
2. States en functies terugzetten
3. Props toevoegen aan componenten

Bewaar deze versie als backup!

---

### **📊 Code Statistieken**

**Verwijderde Regels Code:** ~150 regels
**Toegevoegde Regels Code:** ~10 regels
**Netto Reductie:** ~140 regels (-35%)

**Componenten:**
- Voor: 4 componenten (App, PrayerReader, PrayerEditor, HourCard)
- Nu: 3 actieve componenten (PrayerEditor blijft bestaan maar wordt niet gebruikt)

**Dependencies:**
- Verwijderd: `toast` van sonner (niet meer nodig)
- Behouden: Alle UI componenten, icons

---

### **🧪 Testing Checklist v3.0**

- [ ] App laadt zonder errors
- [ ] Alle 7 uren zijn zichtbaar
- [ ] Klikken op uur opent doorlopende tekst
- [ ] Font size +/- werkt correct
- [ ] Thema toggle werkt
- [ ] Vetgedrukte teksten verschijnen correct
- [ ] Scroll is smooth
- [ ] Terug knop werkt
- [ ] LocalStorage bewaart thema
- [ ] Mobiel responsive
- [ ] Geen console errors

---

### **📚 Volgende Stappen**

1. **Content Toevoegen:**
   - Vul overige 6 uren in via `/data/prayers.ts`
   - Gebruik `/HANDLEIDING-GEBEDEN-TOEVOEGEN.md`

2. **Formatting Aanpassen:**
   - Voeg extra vetgedrukte termen toe in `/data/formatting-config.ts`
   - Test in preview

3. **Styling Tweaks:**
   - Pas kleuren aan in `/styles/globals.css` indien gewenst
   - Test in licht en donker modus

4. **Backup Maken:**
   - Volg `/PROJECT-OPSLAAN.md`
   - Bewaar vooral `/data/prayers.ts` en `/data/formatting-config.ts`

---

## Versie 2.1 - Met Bewerking (3 november 2025)

### Features
- ✅ Bewerken functionaliteit
- ✅ Volgorde wijzigen
- ✅ Koptisch lettertype toggle
- ✅ Per-gebed navigatie
- ✅ Automatische vetgedrukte teksten
- ✅ Kopiëren tussen uren

---

## Versie 2.0 - Hoofdlettergevoelige Formatting (3 november 2025)

### Features
- ✅ Case-sensitive vetgedrukte teksten
- ✅ BOLD_TERMS en COPTIC_TERMS configuratie
- ✅ Automatische formatting functie

---

## Versie 1.0 - Basis App (begin november 2025)

### Features
- ✅ 7 gebedsuren
- ✅ Basis leesfunctionaliteit
- ✅ Licht/donker modus
- ✅ Font size controls

---

**Huidige Versie:** 3.0
**Laatste Update:** 3 november 2025
**Beheerder:** Jouw Naam
