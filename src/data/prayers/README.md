# Agpeya Gebeden - Gesplitste Structuur

## Overzicht
Het prayers.ts bestand is nu gesplitst in kleinere, beheerbare bestanden per gebedsuur.

## Bestanden
- **types.ts** - Interface definities voor Prayer en PrayerHour
- **prime.ts** - Gebeden van het eerste uur (LAUDEN)
- **terce.ts** - Gebeden van het derde uur (TERTS)
- **sext.ts** - Gebeden van het zesde uur (SEXT)
- **none.ts** - Gebeden van het negende uur (NONE)
- **vespers.ts** - Gebeden van het elfde uur (VESPERS)
- **compline.ts** - Gebeden van het twaalfde uur (COMPLINE)
- **midnight.ts** - Gebeden van middernacht

## Gebruik

### In je app
```typescript
import { agpeyaHours } from './data/prayers-new';
```

### Backup maken
Je kunt nu elk uur afzonderlijk een backup maken! Bijvoorbeeld:
```bash
# Backup van eerste uur
cp /data/prayers/prime.ts /data/prayers/prime-backup.ts
```

### Herstellen van een backup
Als er iets fout gaat met één uur, kun je alleen dat bestand herstellen:
```bash
# Herstel eerste uur
cp /data/prayers/prime-backup.ts /data/prayers/prime.ts
```

## Voordelen
✅ Kleinere, overzichtelijke bestanden
✅ Makkelijker te bewerken
✅ Per uur backup mogelijk
✅ Minder kans op conflicten
✅ Sneller om specifieke gebeden te vinden

## Migratie
Om de oude prayers.ts te vervangen:
1. Kopieer de gebeden uit het oude bestand naar de juiste nieuwe bestanden
2. Verander in je app: `import { agpeyaHours } from './data/prayers';` 
   naar: `import { agpeyaHours } from './data/prayers-new';`
