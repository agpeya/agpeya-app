# Handleiding: Gebeden Toevoegen aan prayers.ts

## 📖 Overzicht
Dit document legt uit hoe je gebedenteksten toevoegt aan het `/data/prayers.ts` bestand zonder syntax errors.

## ✨ Automatische Tekstopmaak

De app maakt automatisch de volgende teksten **vet** in alle gebeden:
- **Amen** (exact deze schrijfwijze)
- **Halleluja** (exact deze schrijfwijze)
- **Glorie zij aan God tot in eeuwigheid** (exact deze schrijfwijze)
- **JOHANNES (1:1-17)** (exact deze schrijfwijze)
- **Heilig, heilig, heilig** (exact deze schrijfwijze)

⚠️ **BELANGRIJK:** De matching is **hoofdlettergevoelig** (case-sensitive)!
- "Amen" wordt vet → **Amen**
- "amen" wordt NIET vet → amen
- "AMEN" wordt NIET vet → AMEN

Je kunt extra termen toevoegen in `/data/formatting-config.ts` - zie sectie "Extra Vette Teksten Toevoegen" onderaan deze handleiding.

---

## ✅ Methode 1: Template Strings Gebruiken (AANBEVOLEN)

**Voordeel:** Je kunt quotes en apostrofs gebruiken zonder escape characters!

### Syntax:
```typescript
{
  id: "prayer-1",
  title: "Titel van het gebed",
  content: `Hier komt je gebedstekst.
  
Je kunt meerdere regels gebruiken.
Je kunt 'enkele quotes' gebruiken.
Je kunt "dubbele quotes" gebruiken.
Je kunt zelfs het woord God's gebruiken zonder problemen!

Nieuwe paragrafen maak je met een lege regel ertussen.`
}
```

### ⚠️ Belangrijk bij Template Strings:
- Gebruik backticks: **\`tekst\`** (niet 'tekst' of "tekst")
- Als je een backtick IN de tekst wilt, escape deze: **\\\`**
- Als je een dollar-teken met accolade gebruikt (\${), escape de dollar: **\\\${**

---

## 🔄 Methode 2: Tekst uit Preview Interface Overzetten

### Stappen:

1. **Open de preview interface** en bewerk je gebed
2. **Kopieer de tekst** zoals je die hebt ingevoerd
3. **Ga naar `/data/prayers.ts`**
4. **Vervang de placeholder** `[Voeg hier je tekst toe]` met je gekopieerde tekst
5. **Gebruik template strings** (backticks) zoals hierboven

### Voorbeeld:

**VAN (in preview bewerkt):**
```
Welzalig de man die niet wandelt in de raad van de goddelozen,
die niet staat op de weg van de zondaars.
```

**NAAR (in prayers.ts):**
```typescript
{
  id: "prime-9",
  title: "PSALM 1",
  content: `Welzalig de man die niet wandelt in de raad van de goddelozen,
die niet staat op de weg van de zondaars.

Eer zij de Vader, de Zoon en de Heilige Geest,
nu en altijd en in alle eeuwigheid. Amen.`
}
```

---

## 🚫 Veelvoorkomende Syntax Errors Vermijden

### ❌ FOUT - Normale quotes met apostrofs:
```typescript
content: "God's liefde is groot"  // SYNTAX ERROR!
```

### ✅ GOED - Template strings:
```typescript
content: `God's liefde is groot`  // WERKT!
```

---

### ❌ FOUT - Niet afgesloten string:
```typescript
content: "Regel 1
Regel 2"  // SYNTAX ERROR!
```

### ✅ GOED - Template strings met enters:
```typescript
content: `Regel 1
Regel 2`  // WERKT!
```

---

### ❌ FOUT - Komma vergeten:
```typescript
{
  id: "prayer-1",
  title: "Titel"
  content: "Tekst"  // SYNTAX ERROR - komma vergeten na title!
}
```

### ✅ GOED - Komma's op de juiste plek:
```typescript
{
  id: "prayer-1",
  title: "Titel",
  content: `Tekst`
}
```

---

## 📝 Complete Voorbeeld van een Gebed Toevoegen

```typescript
{
  id: "prime-4",
  title: "PSALM 50",
  content: `Ontferm U over mij, o God, naar Uw goedertierenheid,
delg mijn overtredingen uit naar de grootheid van Uw barmhartigheid.
Was mij grondig van mijn ongerechtigheid
en reinig mij van mijn zonde.

Want ík ken mijn overtredingen
en mijn zonde is voortdurend vóór mij.
Tegen U, U alleen, heb ik gezondigd
en gedaan wat kwaad is in Uw ogen,
opdat U rechtvaardig blijkt in Uw spreken,
zuiver in Uw oordeel.

Zie, in ongerechtigheid ben ik geboren
en in zonde heeft mijn moeder mij ontvangen.
Zie, U hebt lust in waarheid in het binnenste,
maak mij wijsheid bekend in het verborgene.

Eer zij de Vader, de Zoon en de Heilige Geest,
nu en altijd en in alle eeuwigheid. Amen.`
},
```

---

## 🎯 Checklist voor elk Gebed

- [ ] `id:` is uniek (bijv. "prime-4", "terce-2")
- [ ] `title:` bevat de titel tussen quotes
- [ ] `content:` gebruikt backticks \` \` (template strings)
- [ ] Komma na elk veld (behalve het laatste veld in een object)
- [ ] Komma na de `}` als er nog meer gebeden volgen
- [ ] GEEN komma na de laatste `}` in de prayers array

---

## 🔍 Debugging Tips

### Als je een syntax error krijgt:

1. **Check backticks** - Zorg dat je \` gebruikt, niet ' of "
2. **Check komma's** - Elk veld moet eindigen met een komma (behalve het laatste)
3. **Check accolades** - Elke `{` moet een `}` hebben
4. **Check vierkante haken** - De prayers array begint met `[` en eindigt met `]`

### Handige editor tips:

- Gebruik een code editor zoals VS Code
- Schakel syntax highlighting in voor TypeScript/JavaScript
- Gebruik een linter om errors automatisch te detecteren

---

## 💾 Bewerkingen Opslaan

**Let op:** Tekst die je in de preview interface bewerkt wordt NIET automatisch opgeslagen in het codebestand!

### Workflow:
1. Test je gebedstekst in de preview interface
2. Als het er goed uitziet, kopieer dan de tekst
3. Plak het in `/data/prayers.ts` met de juiste formatting
4. Sla het bestand op
5. Ververs de preview om te controleren

---

## 📚 Structuur van het Eerste Uur (Lauden)

Je hebt nu een volledig template met alle 41 gebeden:

1. Inleiding tot iedere getijde
2. Onze Vader die in de hemelen zijt
3. DANKGEBED
4. PSALM 50
5. Dan wordt gezegd
6. Uit de brief van St. Paulus aan de Efeze (4: 1-6)
7. Uit het geloof van de kerk
8. Begin van het eerste uur
9. PSALM 1
10. PSALM 2
11. PSALM 3
12. PSALM 4
13. PSALM 5
14. PSALM 6
15. PSALM 8
16. PSALM 11
17. PSALM 12
18. PSALM 14
19. PSALM 15
20. PSALM 18
21. PSALM 24
22. PSALM 26
23. PSALM 62
24. PSALM 66
25. PSALM 69
26. PSALM 112
27. PSALM 142
28. EVANGELIE
29. LITANIEËN
30. GLORIA
31. TRISAGION
32. Onze Vader die in de hemelen zijt
33. GEGROET ZIJ U
34. Inleiding op de geloofsbelijdenis
35. GELOOFSBELIJDENIS (Credo)
36. Dan wordt gezegd
37. SANCTUS
38. Onze Vader die in de hemelen zijt
39. Absolutie van het eerste uur (Lauden)
40. Nog een absolutie
41. Slotgebed na ieder uur

Vervang de `[Voeg hier je tekst toe]` placeholders met je eigen gebedenteksten!

---

## ✨ Extra Tips

### Kopiëren vanuit Word/PDF:
- Let op speciale aanhalingstekens: " " (smart quotes)
- Vervang deze met normale quotes of gebruik template strings
- Let op lange streepjes (—) vs normale streepjes (-)

### Koptische Teksten:
- De Koptische lettertypen worden automatisch toegepast als je de toggle gebruikt
- Je hoeft niets speciaals te doen in de code

### Formatting:
- Gebruik `\n` voor een enkele regelovergang (als je geen template strings gebruikt)
- Gebruik dubbele enters in template strings voor een lege regel tussen paragrafen

---

## 🎨 Extra Vette Teksten Toevoegen

Wil je andere teksten automatisch vet maken in alle gebeden? Bewerk `/data/formatting-config.ts`:

```typescript
export const BOLD_TERMS = [
  'Amen',
  'Halleluja',
  'Glorie zij aan God tot in eeuwigheid',
  'JOHANNES (1:1-17)',
  'Heilig, heilig, heilig',
  
  // Voeg hier je eigen termen toe:
  'Kyrie eleison',
  'In de Naam van de Vader',
  'Onze Vader',
  'Heer, ontferm U',
];
```

**Belangrijke opmerkingen:**
- De matching is **HOOFDLETTERGEVOELIG** (case-sensitive) - exact dezelfde schrijfwijze is nodig!
- Speciale karakters zoals `()` en `,` worden automatisch correct behandeld
- Let goed op de exacte schrijfwijze (hoofdletters, kleine letters, interpunctie)

**Voorbeelden:**
- `'Amen'` in de lijst matcht alleen: "Amen"
- `'Amen'` matcht NIET: "amen", "AMEN", "AmeN"
- `'Heilig, heilig, heilig'` matcht exact die zin met komma's en kleine letters

---

Succes met het toevoegen van je gebeden! 🙏
