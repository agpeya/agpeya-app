# Koptische Lettertypen Handleiding

## Overzicht
De Agpeya app gebruikt automatische tekstformattering om specifieke teksten weer te geven in Koptische lettertypen. Dit document legt uit hoe je dit systeem kunt gebruiken.

## Welke lettertypen worden gebruikt?

### CS Avva Shenouda
Dit is het primaire Koptische lettertype dat gebruikt wordt voor Griekse/Koptische teksten zoals:
- Doxa Patri ke `Uiw ke `agiw `Pneumati.
- Ke nun ke `a`i ke ic touc `e`wnac ton `e`wnwn `amyn

### CS New Athanasius
Dit lettertype is beschikbaar maar wordt momenteel niet actief gebruikt. Je kunt het toevoegen als je het voor specifieke teksten wilt gebruiken.

## Hoe werkt het automatische systeem?

Het systeem scant alle gebedsteksten en past automatisch het Koptische lettertype toe op vooraf gedefinieerde teksten.

### Configuratiebestand
Alle Koptische teksten worden gedefinieerd in: **`/data/formatting-config.ts`**

## Hoe voeg je een nieuwe Koptische tekst toe?

### Stap 1: Open het configuratiebestand
Open het bestand `/data/formatting-config.ts`

### Stap 2: Voeg je tekst toe aan COPTIC_TERMS
Zoek de `export const COPTIC_TERMS = [` sectie en voeg je tekst toe:

```typescript
export const COPTIC_TERMS = [
  // Bestaande teksten
  'Doxa Patri ke `Uiw ke `agiw `Pneumati.',
  'Ke nun ke `a`i ke ic touc `e`wnac ton `e`wnwn `amyn',
  
  // Voeg hier je nieuwe tekst toe (EXACT zoals het in je gebed staat)
  'Jouw nieuwe Koptische tekst hier',
];
```

### Stap 3: Let op de exacte spelling
⚠️ **BELANGRIJK**: De tekst moet EXACT overeenkomen met hoe het in je gebed staat:
- Let op hoofdletters/kleine letters
- Let op spaties
- Let op leestekens (punt, komma, etc.)
- Let op speciale karakters zoals backticks (`)

### Voorbeelden

#### Voorbeeld 1: Tekst met punt
Als je gebed deze tekst bevat:
```
Doxa Patri ke `Uiw ke `agiw `Pneumati.
```

Voeg toe aan COPTIC_TERMS:
```typescript
'Doxa Patri ke `Uiw ke `agiw `Pneumati.',  // Let op de punt aan het einde
```

#### Voorbeeld 2: Tekst zonder punt
Als dezelfde tekst soms zonder punt voorkomt, voeg beide varianten toe:
```typescript
'Doxa Patri ke `Uiw ke `agiw `Pneumati.',   // Met punt
'Doxa Patri ke `Uiw ke `agiw `Pneumati',    // Zonder punt
```

#### Voorbeeld 3: Tekst met verschillende spaties
Als een tekst soms extra spaties heeft:
```typescript
'Ke nun ke `a`i ke ic touc `e`wnac ton `e`wnwn `amyn',      // Normale versie
'Ke nun ke ` a`i ke ic touc `e `wnac ton `e `wnwn ` amyn',  // Met spaties rondom backticks
```

## Verschillende lettertypen gebruiken

### Standaard: CS Avva Shenouda
Alle teksten in COPTIC_TERMS gebruiken automatisch "CS Avva Shenouda".

### CS New Athanasius gebruiken
Als je CS New Athanasius wilt gebruiken voor specifieke teksten, moet je een nieuwe array maken:

**In `/data/formatting-config.ts`:**
```typescript
// Nieuwe array voor CS New Athanasius
export const COPTIC_TERMS_ATHANASIUS = [
  'Tekst die CS New Athanasius moet gebruiken',
  'Nog een tekst voor dit lettertype',
];
```

**In `/components/PrayerReader.tsx`:**
Je moet dan de formatPrayerContent functie aanpassen om ook deze nieuwe array te verwerken.

## Tips & Best Practices

### 1. Test je toevoegingen
Nadat je een tekst hebt toegevoegd:
- Sla het bestand op
- Herlaad de app
- Controleer of de tekst nu het Koptische lettertype gebruikt

### 2. Varianten toevoegen
Voeg alle mogelijke varianten toe als een tekst op verschillende manieren kan verschijnen:
- Met/zonder punt
- Met/zonder komma
- Met verschillende spaties
- Met hoofdletters/kleine letters

### 3. Volgorde maakt niet uit
De volgorde van teksten in de COPTIC_TERMS array maakt niet uit. Organiseer ze op een logische manier (alfabetisch, per type, etc.) voor overzicht.

### 4. Commentaar toevoegen
Gebruik commentaar om je configuratie overzichtelijk te houden:
```typescript
export const COPTIC_TERMS = [
  // Doxologieën
  'Doxa Patri ke `Uiw ke `agiw `Pneumati.',
  
  // Amen varianten
  'Ke nun ke `a`i ke ic touc `e`wnac ton `e`wnwn `amyn',
  
  // Kyrië eleison varianten
  'Kurie` eley`con',
  'Kyrië eleison',
];
```

## Hoe het technisch werkt

Het systeem gebruikt een regex-gebaseerde zoek-en-vervang methode:

1. **Scannen**: Elk gebed wordt gescand op teksten die in COPTIC_TERMS staan
2. **Matchen**: Als een exacte match wordt gevonden
3. **Formatteren**: De tekst wordt gewrapped in een `<span>` met:
   - CSS class: `font-coptic-primary`
   - Inline style: `font-family: 'CS Avva Shenouda', serif;`
   - Bold styling: `<strong>` tags

Resultaat:
```html
<span class="font-coptic-primary" style="font-family: 'CS Avva Shenouda', serif;">
  <strong>Doxa Patri ke `Uiw ke `agiw `Pneumati.</strong>
</span>
```

## Veelgestelde vragen

### Q: Mijn tekst wordt niet geformatteerd, wat nu?
**A**: Controleer het volgende:
1. Is de tekst EXACT hetzelfde (inclusief spaties, hoofdletters, leestekens)?
2. Heb je het bestand opgeslagen?
3. Heb je de app herladen?

### Q: Kan ik ook gewone Nederlandse teksten in een Koptisch lettertype zetten?
**A**: Ja! Voeg gewoon de Nederlandse tekst toe aan COPTIC_TERMS. Het lettertype wordt toegepast op elke tekst die je toevoegt.

### Q: Wat als een tekst zowel vet moet zijn als Koptisch lettertype moet hebben?
**A**: Het systeem maakt Koptische teksten automatisch vet. Je hoeft de tekst niet toe te voegen aan BOLD_TERMS.

### Q: Kan ik delen van een langere tekst Koptisch maken?
**A**: Ja, maar alleen complete matches worden geformatteerd. Als je "Kyrië eleison" in een langere zin Koptisch wilt maken, voeg dan alleen "Kyrië eleison" toe aan COPTIC_TERMS (niet de hele zin).

## Snelle referentie

```typescript
// Locatie: /data/formatting-config.ts

export const COPTIC_TERMS = [
  // Voeg je Koptische teksten hier toe
  'Exacte tekst zoals het in je gebed staat',
];
```

Sla op → Herlaad app → Klaar! ✅
