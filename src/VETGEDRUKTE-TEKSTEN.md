# 📝 Vetgedrukte Teksten Configuratie

## 🎯 Overzicht

De Agpeya app maakt automatisch bepaalde teksten **vet** in alle gebeden. Dit gebeurt op basis van configuratie in `/data/formatting-config.ts`.

---

## ⚙️ Hoe Het Werkt

### 1. **Hoofdlettergevoelig (Case-Sensitive)**
De matching is **exact**. Dit betekent:
- ✅ `Amen` matcht → **Amen**
- ❌ `amen` matcht NIET
- ❌ `AMEN` matcht NIET
- ❌ `AmeN` matcht NIET

### 2. **Twee Categorieën**

#### **Nederlandse/Algemene Termen** (`BOLD_TERMS`)
```typescript
export const BOLD_TERMS = [
  'Amen',
  'Halleluja',
  'Glorie zij aan God tot in eeuwigheid',
  'JOHANNES (1:1-17)',
  'Heilig, heilig, heilig',
  'Nu en altijd en tot in de eeuwen der eeuwen, Amen.',
  'Glorie aan de Vader en de Zoon en de Heilige Geest.',
  // ... etc
];
```

#### **Koptische Termen** (`COPTIC_TERMS`)
```typescript
export const COPTIC_TERMS = [
  'Doxa Patri ke `Uiw ke `agiw `Pneumati.',
  'Kuri`e ele`ycon',
  'Ke nun ke `a`i ke ic touc `e`wnac ton `e`wnwn `amyn.',
  // ... etc
];
```

Beide categorieën worden automatisch vet gemaakt in de gebedlezer.

---

## ➕ Nieuwe Termen Toevoegen

### Stap 1: Open `/data/formatting-config.ts`

### Stap 2: Voeg term toe aan juiste array

Voor Nederlandse tekst:
```typescript
export const BOLD_TERMS = [
  // Bestaande termen...
  'Mijn nieuwe term',  // Voeg hier toe
];
```

Voor Koptische tekst:
```typescript
export const COPTIC_TERMS = [
  // Bestaande termen...
  'Nieuwe Koptische term',  // Voeg hier toe
];
```

### Stap 3: Sla op

De wijzigingen zijn direct actief! 🎉

---

## ⚠️ Belangrijke Regels

### 1. **Exacte Schrijfwijze**
Schrijf de term EXACT zoals deze in je gebeden voorkomt:
- Met juiste hoofdletters
- Met juiste kleine letters
- Met juiste interpunctie (punt, komma, etc.)
- Met juiste spaties

### 2. **Speciale Karakters**
De volgende karakters worden automatisch correct behandeld:
- Haakjes: `()`, `[]`
- Punten: `.`
- Komma's: `,`
- Vraagtekens: `?`
- Uitroeptekens: `!`
- Backticks: `` ` ``

Je hoeft deze NIET te escapen!

### 3. **Meerdere Voorkomens**
Als een term meerdere keren in een gebed voorkomt, worden ALLE voorkomens vet gemaakt.

---

## 📋 Huidige Geconfigureerde Termen

### Nederlandse Termen (32 stuks)

1. Amen
2. Halleluja
3. Glorie zij aan God tot in eeuwigheid
4. JOHANNES (1:1-17)
5. Heilig, heilig, heilig
6. Nu en altijd en tot in de eeuwen der eeuwen, Amen.
7. Glorie aan de Vader en de Zoon en de Heilige Geest.
8. Gebeden na het Evangelie.
9. Lofprijzing van de Engelen
10. Inleiding
11. DANKGEBED
12. Dan wordt gezegd
13. Uit de brief van St. Paulus aan de Efeze (4: 1-6)
14. Uit het geloof van de kerk
15. Begin van het eerste uur
16. LITANIEËN
17. GLORIA
18. TRISAGION
19. GEGROET ZIJ U
20. Inleiding op de geloofsbelijdenis
21. GELOOFSBELIJDENIS (Credo)
22. SANCTUS
23. Absolutie van het eerste uur (Lauden)
24. Nog een absolutie
25. Slotgebed na ieder uur

### Koptische Termen (3 stuks)

1. Doxa Patri ke `Uiw ke `agiw `Pneumati.
2. Kuri`e ele`ycon
3. Ke nun ke `a`i ke ic touc `e`wnac ton `e`wnwn `amyn.

---

## 🔧 Technische Details

### Bestand Locatie
```
/data/formatting-config.ts
```

### Gebruikt In
```
/components/PrayerReader.tsx
```

### Functie
De functie `formatPrayerContent()` in `PrayerReader.tsx`:
1. Neemt de gebedstekst als input
2. Scant door alle `BOLD_TERMS` en `COPTIC_TERMS`
3. Escapet speciale regex karakters
4. Maakt een hoofdlettergevoelige regex match
5. Wrapt matches in `<strong>` tags
6. Retourneert geformatteerde HTML

### Rendering
De geformatteerde tekst wordt weergegeven met:
```tsx
<div dangerouslySetInnerHTML={{ __html: formatPrayerContent(currentPrayer.content) }} />
```

---

## 🧪 Test Voorbeelden

### Input (in prayers.ts):
```
Amen, Halleluja! Glorie zij aan God tot in eeuwigheid.
Heilig, heilig, heilig is de Heer.
```

### Output (in gebedlezer):
**Amen**, **Halleluja**! **Glorie zij aan God tot in eeuwigheid**.
**Heilig, heilig, heilig** is de Heer.

### Input (variaties):
```
amen, AMEN, AmeN, halleluja, HALLELUJA
```

### Output (GEEN vetgedrukt):
amen, AMEN, AmeN, halleluja, HALLELUJA

---

## 💡 Tips

### Tip 1: Consistente Schrijfwijze
Zorg dat je in je gebeden altijd dezelfde schrijfwijze gebruikt voor termen die je vet wilt maken.

### Tip 2: Check de Preview
Test altijd in de gebedlezer of je nieuwe term correct vet wordt gemaakt.

### Tip 3: Geen Dubbele Formatting
Als een term al in `<strong>` tags staat in je gebedstekst, voeg deze dan niet toe aan de config (dubbel vet werkt niet goed).

### Tip 4: Lange Zinnen
Je kunt hele zinnen toevoegen, bijvoorbeeld:
```typescript
'Glorie zij aan God tot in eeuwigheid'
```

### Tip 5: Backups
Maak altijd een backup van `formatting-config.ts` voordat je grote wijzigingen maakt!

---

## 🐛 Troubleshooting

### Probleem: Term wordt niet vet gemaakt
**Oplossing:**
1. Check de exacte schrijfwijze in je gebed
2. Check hoofdletters en kleine letters
3. Check spaties en interpunctie
4. Zorg dat de term precies hetzelfde is in `formatting-config.ts`

### Probleem: Verkeerde delen worden vet gemaakt
**Oplossing:**
1. Check of de term niet te algemeen is (bijv. "de" zou alles matchen)
2. Wees specifieker met de term
3. Voeg context toe (bijv. "de Heer" in plaats van "de")

### Probleem: Speciale karakters werken niet
**Oplossing:**
- Alle speciale karakters worden automatisch geëscaped
- Als het toch niet werkt, check of er geen typfouten zijn

---

## 📞 Hulp Nodig?

- Check de `/HANDLEIDING-GEBEDEN-TOEVOEGEN.md` voor algemene instructies
- Check de code in `/components/PrayerReader.tsx` voor de implementatie
- Test altijd in de preview voordat je definitieve wijzigingen maakt

---

**Laatste Update:** 3 november 2025
**Versie:** 2.0 (hoofdlettergevoelig)
