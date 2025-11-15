# HSV-Stijl Versindeling voor Psalmen en Evangelie

## Overzicht

De Agpeya-app ondersteunt nu HSV (Herziene Statenvertaling) stijl versindeling voor psalmen en evangeliën. Deze formattering toont elke vers op een aparte regel met een duidelijk versnummer in superscript, zoals in een echte bijbel.

## Hoe het werkt

### 1. Type toevoegen aan Prayer interface

In `/data/prayers/types.ts` is de Prayer interface uitgebreid met:
- `type?: 'prayer' | 'psalm' | 'gospel'` - Geeft aan wat voor soort gebed het is
- `verseFormat?: boolean` - Activeert de versindeling (optioneel, wordt automatisch geactiveerd als type psalm of gospel is)

### 2. Versnummers in de tekst

Gebruik `[nummer]` markers in de content om verzen aan te duiden:

```typescript
{
  id: "prime-09-psalm1",
  title: "PSALM 1",
  type: "psalm",
  verseFormat: true,
  content: "[1]Welzalig de man die niet wandelt in de raad van de goddelozen...\n[2]maar die zijn vreugde vindt in de wet van de HEERE...\n[3]Want hij zal zijn als een boom, geplant aan waterbeken...\n\nHalleluja"
}
```

### 3. Rendering

De `PrayerReader` component detecteert automatisch:
- Als een gebed `type: 'psalm'` of `type: 'gospel'` heeft
- Of als `verseFormat: true` is ingesteld

Dan wordt de `formatVerseContent()` functie gebruikt die:
- Versnummers in superscript toont
- Elke vers op een aparte regel zet
- Tekst vóór het eerste vers (zoals "Heilig, heilig, heilig") behoudt als intro
- Tekst na het laatste vers (zoals "Glorie zij aan God" of "Halleluja") behoudt als outro

## Voorbeelden

### Voorbeeld 1: Psalm 1 (6 verzen)

```typescript
{
  id: "prime-09-psalm1",
  title: "PSALM 1",
  type: "psalm",
  verseFormat: true,
  content: "[1]Welzalig de man die niet wandelt in de raad van de goddelozen, die niet staat op de weg van de zondaars, die niet zit op de zetel van de spotters,\n[2]maar die zijn vreugde vindt in de wet van de HEERE en Zijn wet dag en nacht overdenkt.\n[3]Want hij zal zijn als een boom, geplant aan waterbeken, die zijn vrucht geeft op zijn tijd, waarvan het blad niet afvalt; al wat hij doet, zal goed gelukken.\n[4]Maar zo zijn de goddelozen niet: die zijn juist als het kaf, dat de wind wegblaast.\n[5]Daarom blijven de goddelozen niet staande in het gericht, de zondaars niet in de gemeenschap van de rechtvaardigen.\n[6]Want de HEERE kent de weg van de rechtvaardigen, maar de weg van de goddelozen zal vergaan.\n\nHalleluja"
}
```

### Voorbeeld 2: Johannes 1:1-17 (met intro en outro)

```typescript
{
  id: "prime-28-evangelie",
  title: "EVANGELIE",
  type: "gospel",
  verseFormat: true,
  content: "Heilig, heilig, heilig.\nEen lezing uit het Evangelie volgens St Johannes, zijn zegen zij met ons Amen\n\nJOHANNES (1:1-17)\n[1]In het begin was het Woord en het Woord was bij God en het Woord was God.\n[2]Dit was in het begin bij God.\n[3]Alle dingen zijn door het Woord gemaakt, en zonder dit Woord is geen ding gemaakt dat gemaakt is.\n...\n[17]Want de wet is door Mozes gegeven, de genade en de waarheid zijn er door Jezus Christus gekomen.\n\nGlorie zij aan God tot in eeuwigheid. Amen"
}
```

## Stappen om een nieuwe psalm te formatteren

1. **Zoek de juiste versnummering**: Gebruik een HSV-bijbel of https://www.debijbel.nl
2. **Splits de tekst per vers**: Elk vers begint met `[nummer]`
3. **Voeg type toe**: `type: "psalm"` en `verseFormat: true`
4. **Test de formattering**: Open de app en controleer of de verzen correct getoond worden

## Huidige status

✅ **Geformatteerd met HSV-layout:**
- Psalm 1 (alle 6 verzen)
- Johannes 1:1-17 (Evangelie van het eerste uur)

⏳ **Nog te formatteren:**
- Psalm 2 (12 verzen)
- Psalm 3 (8 verzen)  
- Psalm 4 (8 verzen)
- Psalm 5 (12 verzen)
- Psalm 6 (10 verzen)
- Psalm 8 (9 verzen)
- Psalm 11 (8 verzen)
- Psalm 12 (6 verzen)
- Psalm 14/15 (5 verzen)
- Psalm 15/16 (11 verzen)
- Psalm 18/19 (14 verzen)
- Psalm 24/25 (22 verzen)
- Psalm 26/27 (14 verzen)
- Psalm 62/63 (11 verzen)
- Psalm 66/67 (7 verzen)
- Psalm 69/70 (5 verzen)
- Psalm 112/113 (9 verzen)
- Psalm 142/143 (12 verzen)

**Let op**: De psalmnummering verschilt tussen de HSV en sommige andere bijbelvertalingen. Controleer altijd de juiste nummering in de HSV.

## CSS Styling

De versnummers en layout worden gestyled via `/styles/globals.css`:

```css
.verse-line {
  position: relative;
  padding-left: 0;
}

.verse-number {
  font-size: 0.75em;
  vertical-align: super;
  line-height: 0;
  margin-right: 0.25rem;
  color: var(--muted-foreground);
  font-weight: 600;
}

.verse-text {
  display: inline;
}

.verse-intro,
.verse-outro {
  font-style: normal;
}
```

## Tips

- Houd intro-tekst (zoals "Heilig, heilig, heilig") vóór het eerste `[1]`
- Houd afsluiting (zoals "Halleluja" of "Glorie zij aan God") na het laatste vers
- Gebruik `\n` voor nieuwe regels tussen verzen
- Alle bestaande formattering (vet, Koptische lettertypen) blijft werken binnen verzen
- Versnummers worden automatisch in een subtielere kleur getoond

## Compatibiliteit met PrayerEditor

De tekstbewerker blijft volledig functioneel:
- Je kunt geformatteerde psalmen bewerken via de editor
- De `[nummer]` markers blijven bewaard in de editor
- Het `type` veld wordt bewaard bij custom prayers
- Als je een psalm bewerkt, blijft de versindeling behouden
