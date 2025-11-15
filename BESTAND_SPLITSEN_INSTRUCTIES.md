# Prayers.ts Splitsen - Instructies

## ✅ Wat is er gedaan:

1. **Nieuwe mapstructuur gecreëerd**: `/data/prayers/`
2. **Type definities gemaakt**: `/data/prayers/types.ts`
3. **7 Lege gebedsuur bestanden** gemaakt:
   - `/data/prayers/prime.ts` (Eerste uur)
   - `/data/prayers/terce.ts` (Derde uur)  
   - `/data/prayers/sext.ts` (Zesde uur)
   - `/data/prayers/none.ts` (Negende uur)
   - `/data/prayers/vespers.ts` (Elfde uur)
   - `/data/prayers/compline.ts` (Twaalfde uur)
   - `/data/prayers/midnight.ts` (Middernacht)
4. **Nieuw hoofdbestand**: `/data/prayers-new.ts`

## 📋 Wat je nu moet doen:

### Optie A: Als je een backup hebt van je correcte gebeden
1. Open je backup bestand
2. Kopieer de gebeden voor elk uur naar het bijbehorende bestand in `/data/prayers/`
3. Zorg dat de syntax correct is (zie voorbeelden hieronder)

### Optie B: Vanuit het huidige prayers.ts
1. Open `/data/prayers.ts`
2. Voor elk gebedsuur:
   - Kopieer de `prayers: [...]` array
   - Plak deze in het bijbehorende bestand in `/data/prayers/`
   - Vervang de comment `// BELANGRIJK: Plak hier...`

## 📝 Syntax Voorbeeld:

```typescript
export const primeHour: PrayerHour = {
  id: "prime",
  name: "Gebeden van het eerste uur",
  copticName: "LAUDEN",
  time: "06:00 - zonsopgang",
  description: "Dit gebed gedenkt het uur...",
  prayers: [
    {
      id: "prime-01-intro",
      title: "Inleiding tot iedere getijde",
      content: "✟  In de Naam van de Vader..."
    },
    {
      id: "prime-02-onzevader",
      title: "Onze vader die in de hemelen zijt",
      content: "Onze Vader die..."
    },
    // ... meer gebeden
  ]
};
```

## 🔄 App bijwerken:

Wanneer alle gebeden zijn ingevuld, verander in je App componenten:

Van:
```typescript
import { agpeyaHours } from './data/prayers';
```

Naar:
```typescript
import { agpeyaHours } from './data/prayers-new';
```

## ✨ Voordelen van deze aanpak:

- ✅ Elk uur is een apart bestand (makkelijk backup)
- ✅ Kleiner en overzichtelijker
- ✅ Per uur te herstellen als er fouten zijn
- ✅ Makkelijker te bewerken
- ✅ Geen risico dat hele bestand corrupt raakt

## 🆘 Hulp nodig?

Als je de gebeden niet kunt kopië ren, laat het me weten welk uur je wilt herstellen en ik help je!
