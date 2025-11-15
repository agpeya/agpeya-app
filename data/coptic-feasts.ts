// Koptisch-Orthodoxe Feestdagen en Vastendagen

export interface CopticFeast {
  id: string;
  name: string;
  copticDate?: {
    day: number;
    month: number; // 1-13 (Thoout t/m Nesi)
  };
  type: 'major' | 'minor' | 'saints' | 'fast' | 'virgin-mary';
  description?: string;
  moveable?: boolean; // Voor feesten die variëren zoals Pasen
  fastDuration?: number; // Voor vastenperiodes: aantal dagen
}

// Vaste Feestdagen per Koptische maand
export const fixedFeasts: CopticFeast[] = [
  // THOOUT (maand 1) - September/Oktober
  {
    id: 'thoout-1-new-year',
    name: 'Koptisch Nieuwjaar (Nayrouz)',
    copticDate: { day: 1, month: 1 },
    type: 'major',
    description: 'Het begin van het Koptische jaar, ter ere van de martelaren'
  },
  {
    id: 'thoout-4-st-takla',
    name: 'H. Takla Haymanot',
    copticDate: { day: 4, month: 1 },
    type: 'saints',
    description: 'Ethiopische heilige en monnik'
  },
  {
    id: 'thoout-12-st-cyprianus',
    name: 'H. Cyprianus & H. Justina',
    copticDate: { day: 12, month: 1 },
    type: 'saints',
    description: 'Martelaren'
  },
  {
    id: 'thoout-16-st-euphemia',
    name: 'H. Euphemia',
    copticDate: { day: 16, month: 1 },
    type: 'saints',
    description: 'Martelares'
  },
  
  // PAOPE (maand 2) - Oktober/November
  {
    id: 'paope-2-st-john-kouzi',
    name: 'H. Johannes Kolobos (de Korte)',
    copticDate: { day: 2, month: 2 },
    type: 'saints',
    description: 'Woestijnvader en monnik'
  },
  {
    id: 'paope-5-virgin-mary-apparition',
    name: 'Verschijning van Maagd Maria in Zeitoun',
    copticDate: { day: 5, month: 2 },
    type: 'virgin-mary',
    description: 'Herdenking van Maria-verschijningen in Egypte'
  },
  {
    id: 'paope-9-st-demiana',
    name: 'H. Demiana',
    copticDate: { day: 9, month: 2 },
    type: 'saints',
    description: 'Martelares en 40 maagden'
  },
  {
    id: 'paope-17-feast-cross',
    name: 'Feest van het Kruis',
    copticDate: { day: 17, month: 2 },
    type: 'major',
    description: 'Herdenking van de vinding van het Heilige Kruis door Keizerin Helena'
  },
  {
    id: 'paope-20-st-philopater-mercurius',
    name: 'H. Philopater Mercurius (Abu Sefein)',
    copticDate: { day: 20, month: 2 },
    type: 'saints',
    description: 'Martelaar en heilige krijger'
  },
  
  // HATHOR (maand 3) - November/December
  {
    id: 'hathor-6-st-leontius',
    name: 'H. Leontius',
    copticDate: { day: 6, month: 3 },
    type: 'saints',
    description: 'Martelaar'
  },
  {
    id: 'hathor-12-st-michael',
    name: 'Aartsengel Michaël',
    copticDate: { day: 12, month: 3 },
    type: 'minor',
    description: 'Feest van de Aartsengel Michaël'
  },
  {
    id: 'hathor-12-st-martin',
    name: 'H. Martinus van Tours',
    copticDate: { day: 12, month: 3 },
    type: 'saints',
    description: 'Herdenking van St. Martinus van Tours'
  },
  {
    id: 'hathor-15-st-mina',
    name: 'H. Mina de Wonderdoener',
    copticDate: { day: 15, month: 3 },
    type: 'saints',
    description: 'Martelaar en wonderdoener uit Egypte'
  },
  {
    id: 'hathor-21-virgin-mary-presentation',
    name: 'Opdracht van Maria in de Tempel',
    copticDate: { day: 21, month: 3 },
    type: 'virgin-mary',
    description: 'Maria wordt op 3-jarige leeftijd naar de tempel gebracht'
  },
  {
    id: 'hathor-24-st-catherine',
    name: 'H. Catharina van Alexandrië',
    copticDate: { day: 24, month: 3 },
    type: 'saints',
    description: 'Martelares en geleerde'
  },
  
  // KIAHK (maand 4) - December/Januari
  {
    id: 'kiahk-1-st-nahum',
    name: 'H. Nahum de Profeet',
    copticDate: { day: 1, month: 4 },
    type: 'saints',
    description: 'Oudtestamentische profeet'
  },
  {
    id: 'kiahk-3-st-barbara',
    name: 'H. Barbara',
    copticDate: { day: 3, month: 4 },
    type: 'saints',
    description: 'Martelares en heilige'
  },
  {
    id: 'kiahk-10-st-menas-soldier',
    name: 'H. Menas de Soldaat',
    copticDate: { day: 10, month: 4 },
    type: 'saints',
    description: 'Martelaar'
  },
  {
    id: 'kiahk-21-virgin-mary-nativity',
    name: 'Geboorte van de Moeder Gods Maria',
    copticDate: { day: 21, month: 4 },
    type: 'virgin-mary',
    description: 'Geboorte van de Heilige Maagd Maria'
  },
  {
    id: 'kiahk-29-nativity',
    name: 'Geboorte van Christus (Kerstmis)',
    copticDate: { day: 29, month: 4 },
    type: 'major',
    description: 'Geboorte van onze Heer Jezus Christus'
  },
  
  // TOBI (maand 5) - Januari/Februari
  {
    id: 'tobi-1-circumcision',
    name: 'Besnijdenis van Christus',
    copticDate: { day: 1, month: 5 },
    type: 'major',
    description: 'Besnijdenis van onze Heer op de 8e dag'
  },
  {
    id: 'tobi-11-theophany',
    name: 'Theofanie (Doop van Christus)',
    copticDate: { day: 11, month: 5 },
    type: 'major',
    description: 'Doop van onze Heer Jezus Christus in de Jordaan'
  },
  {
    id: 'tobi-12-wedding-cana',
    name: 'Bruiloft te Kana',
    copticDate: { day: 12, month: 5 },
    type: 'minor',
    description: 'Eerste wonder van Christus'
  },
  {
    id: 'tobi-15-st-anthony',
    name: 'H. Antonius de Grote',
    copticDate: { day: 15, month: 5 },
    type: 'saints',
    description: 'Vader van het monasticisme'
  },
  {
    id: 'tobi-20-st-paul',
    name: 'H. Paulus de Kluizenaar',
    copticDate: { day: 20, month: 5 },
    type: 'saints',
    description: 'Eerste kluizenaar'
  },
  
  // MESHIR (maand 6) - Februari/Maart
  {
    id: 'meshir-8-annunciation-virgin',
    name: 'Aankondiging aan de Maagd Maria',
    copticDate: { day: 8, month: 6 },
    type: 'virgin-mary',
    description: 'Aankondiging van de geboorte van Christus aan Maria'
  },
  {
    id: 'meshir-13-st-agathon',
    name: 'H. Agathon',
    copticDate: { day: 13, month: 6 },
    type: 'saints',
    description: 'Woestijnvader'
  },
  {
    id: 'meshir-20-st-peter-seal-martyrs',
    name: 'H. Petrus, Zegel der Martelaren',
    copticDate: { day: 20, month: 6 },
    type: 'saints',
    description: '17e Patriarch van Alexandrië, laatste martelaar onder Diocletianus'
  },
  
  // PAREMHAT (maand 7) - Maart/April
  {
    id: 'paremhat-13-st-bashnouna',
    name: 'H. Bashnouna',
    copticDate: { day: 13, month: 7 },
    type: 'saints',
    description: 'Martelaar'
  },
  {
    id: 'paremhat-21-st-lazarus',
    name: 'Opwekking van Lazarus',
    copticDate: { day: 21, month: 7 },
    type: 'minor',
    description: 'Opwekking van Lazarus door Christus'
  },
  {
    id: 'paremhat-29-annunciation',
    name: 'Annunciatie (Verkondiging)',
    copticDate: { day: 29, month: 7 },
    type: 'major',
    description: 'Verkondiging aan de Heilige Maagd Maria door de Aartsengel Gabriël'
  },
  {
    id: 'paremhat-30-st-mark-evangelist',
    name: 'H. Marcus de Evangelist',
    copticDate: { day: 30, month: 7 },
    type: 'saints',
    description: 'Martelaarschap van St. Marcus, stichter van de Koptische Kerk'
  },
  
  // PARMOUTI (maand 8) - April/Mei
  {
    id: 'parmouti-1-st-jacob-persian',
    name: 'H. Jacobus de Perzische',
    copticDate: { day: 1, month: 8 },
    type: 'saints',
    description: 'Martelaar'
  },
  {
    id: 'parmouti-9-st-george',
    name: 'H. Georgius (Mari Girgis)',
    copticDate: { day: 9, month: 8 },
    type: 'saints',
    description: 'Martelaar en heilige krijger'
  },
  {
    id: 'parmouti-21-virgin-mary-appearing',
    name: 'Verschijning van Maria aan Zacharias',
    copticDate: { day: 21, month: 8 },
    type: 'virgin-mary',
    description: 'Maria verschijnt aan priester Zacharias in de tempel'
  },
  
  // PASHONS (maand 9) - Mei/Juni
  {
    id: 'pashons-2-st-athanasius',
    name: 'H. Athanasius de Apostolische',
    copticDate: { day: 2, month: 9 },
    type: 'saints',
    description: '20e Patriarch van Alexandrië, verdediger van het orthodoxe geloof'
  },
  {
    id: 'pashons-9-st-isaac',
    name: 'H. Isaäk',
    copticDate: { day: 9, month: 9 },
    type: 'saints',
    description: 'Patriarch'
  },
  {
    id: 'pashons-15-st-pachomius',
    name: 'H. Pachomius',
    copticDate: { day: 15, month: 9 },
    type: 'saints',
    description: 'Stichter van het gemeenschapsleven voor monniken'
  },
  {
    id: 'pashons-20-virgin-mary-church',
    name: 'Inwijding van eerste Maria-kerk',
    copticDate: { day: 20, month: 9 },
    type: 'virgin-mary',
    description: 'Inwijding van de eerste kerk gewijd aan de Maagd Maria'
  },
  
  // PAONI (maand 10) - Juni/Juli
  {
    id: 'paoni-5-st-peter-paul',
    name: 'H. Petrus en Paulus',
    copticDate: { day: 5, month: 10 },
    type: 'saints',
    description: 'Heilige Apostelen Petrus en Paulus'
  },
  {
    id: 'paoni-12-st-onuphrius',
    name: 'H. Onuphrius',
    copticDate: { day: 12, month: 10 },
    type: 'saints',
    description: 'Kluizenaar'
  },
  {
    id: 'paoni-19-st-moses-black',
    name: 'H. Mozes de Zwarte',
    copticDate: { day: 19, month: 10 },
    type: 'saints',
    description: 'Bekeerde rover en monnik'
  },
  
  // EPIP (maand 11) - Juli/Augustus
  {
    id: 'epip-2-virgin-mary-al-muharraq',
    name: 'Maria in Al-Muharraq',
    copticDate: { day: 2, month: 11 },
    type: 'virgin-mary',
    description: 'Herdenking van Maria in het klooster van Al-Muharraq'
  },
  {
    id: 'epip-5-st-john-baptist-birth',
    name: 'Geboorte van H. Johannes de Doper',
    copticDate: { day: 5, month: 11 },
    type: 'saints',
    description: 'Geboorte van Johannes de Doper'
  },
  {
    id: 'epip-12-st-peter-paul-martyrdom',
    name: 'Martelaarschap Petrus en Paulus',
    copticDate: { day: 12, month: 11 },
    type: 'saints',
    description: 'Herdenking van het martelaarschap van de Apostelen'
  },
  {
    id: 'epip-13-st-mark-return',
    name: 'Terugkeer relieken H. Marcus',
    copticDate: { day: 13, month: 11 },
    type: 'saints',
    description: 'Terugkeer van de relieken van St. Marcus naar Egypte'
  },
  
  // MESORI (maand 12) - Augustus/September
  {
    id: 'mesori-1-st-moses-prophet',
    name: 'H. Mozes de Profeet',
    copticDate: { day: 1, month: 12 },
    type: 'saints',
    description: 'Profeet en wetgever Mozes'
  },
  {
    id: 'mesori-13-virgin-mary-assumption',
    name: 'Ontslapen van de Moeder Gods',
    copticDate: { day: 13, month: 12 },
    type: 'virgin-mary',
    description: 'Herdenking van het ontslapen van de Heilige Maagd Maria'
  },
  {
    id: 'mesori-16-transfiguration',
    name: 'Gedaanteverandering van Christus',
    copticDate: { day: 16, month: 12 },
    type: 'major',
    description: 'Gedaanteverandering van onze Heer op de berg Tabor'
  },
  {
    id: 'mesori-24-st-bartholomew',
    name: 'H. Bartholomeus',
    copticDate: { day: 24, month: 12 },
    type: 'saints',
    description: 'Apostel en martelaar'
  },
  
  // NESI (maand 13) - September (5-6 dagen)
  {
    id: 'nesi-1-st-john-baptist-death',
    name: 'Onthoofding van H. Johannes de Doper',
    copticDate: { day: 1, month: 13 },
    type: 'saints',
    description: 'Martelaarschap van Johannes de Doper'
  },
];

// Bewegelijke Feesten (afhankelijk van Pasen)
export const moveableFeasts: CopticFeast[] = [
  {
    id: 'palm-sunday',
    name: 'Palmzondag',
    type: 'major',
    moveable: true,
    description: 'Intocht van Christus in Jeruzalem'
  },
  {
    id: 'holy-thursday',
    name: 'Witte Donderdag',
    type: 'major',
    moveable: true,
    description: 'Laatste Avondmaal van Christus met zijn discipelen'
  },
  {
    id: 'good-friday',
    name: 'Goede Vrijdag',
    type: 'major',
    moveable: true,
    description: 'Kruisiging van onze Heer Jezus Christus'
  },
  {
    id: 'holy-saturday',
    name: 'Stille Zaterdag',
    type: 'major',
    moveable: true,
    description: 'Christus in het graf'
  },
  {
    id: 'easter',
    name: 'Heilig Pasen (Verrijzenis)',
    type: 'major',
    moveable: true,
    description: 'Verrijzenis van onze Heer Jezus Christus'
  },
  {
    id: 'thomas-sunday',
    name: 'Zondag van Thomas',
    type: 'minor',
    moveable: true,
    description: 'Eerste zondag na Pasen, verschijning aan Thomas'
  },
  {
    id: 'ascension',
    name: 'Hemelvaart van Christus',
    type: 'major',
    moveable: true,
    description: 'Hemelvaart van onze Heer (40 dagen na Pasen)'
  },
  {
    id: 'pentecost',
    name: 'Pinksteren',
    type: 'major',
    moveable: true,
    description: 'Neerdaling van de Heilige Geest (50 dagen na Pasen)'
  },
];

// Vastentijden
export const fasts: CopticFeast[] = [
  {
    id: 'fast-nativity',
    name: 'Adventsvasten',
    type: 'fast',
    moveable: false,
    copticDate: { day: 16, month: 3 }, // Begint 16 Hathor
    description: '43 dagen vasten voor Kerstmis (16 Hathor t/m 28 Kiahk)',
    fastDuration: 43
  },
  {
    id: 'fast-nativity-start',
    name: 'Start Adventsvasten',
    type: 'fast',
    moveable: false,
    copticDate: { day: 16, month: 3 },
    description: 'Begin van 43 dagen vasten voor Kerstmis',
    fastDuration: 43
  },
  {
    id: 'fast-jonah',
    name: 'Vasten van Nineve (Jona)',
    type: 'fast',
    moveable: true,
    description: '3 dagen vasten ter voorbereiding op de Grote Vasten',
    fastDuration: 3
  },
  {
    id: 'fast-great-lent',
    name: 'Grote Vasten',
    type: 'fast',
    moveable: true,
    description: '55 dagen vasten: 40 dagen + Heilige Week voor Pasen',
    fastDuration: 55
  },
  {
    id: 'fast-apostles',
    name: 'Apostelen Vasten',
    type: 'fast',
    moveable: true,
    description: 'Vasten van maandag na Pinksteren tot 12 Epip (5 juli)',
    fastDuration: 0 // variabel
  },
  {
    id: 'fast-apostles-end',
    name: 'Einde Apostelen Vasten',
    type: 'fast',
    moveable: false,
    copticDate: { day: 12, month: 11 }, // 12 Epip
    description: 'Het Apostelen Vasten eindigt op 12 Epip (feest van Petrus & Paulus)'
  },
  {
    id: 'fast-virgin-mary',
    name: 'Vasten van de H. Maagd Maria',
    type: 'fast',
    moveable: false,
    copticDate: { day: 1, month: 12 }, // Begint 1 Mesori
    description: '15 dagen vasten (1-15 Mesori) voor het feest van Maria\'s Ontslapen',
    fastDuration: 15
  },
  {
    id: 'fast-virgin-mary-end',
    name: 'Einde Maria Vasten',
    type: 'fast',
    moveable: false,
    copticDate: { day: 15, month: 12 },
    description: 'Laatste dag van het Maria Vasten'
  },
  {
    id: 'fast-wednesday-friday',
    name: 'Woensdag & Vrijdag Vasten',
    type: 'fast',
    moveable: false,
    description: 'Wekelijks vasten elke woensdag (verraad van Judas) en vrijdag (kruisiging)'
  },
];

export const copticMonthNames = [
  'Thoout', 'Paope', 'Hathor', 'Kiahk',
  'Tobi', 'Meshir', 'Paremhat', 'Parmouti',
  'Pashons', 'Paoni', 'Epip', 'Mesori', 'Nesi'
];

// Converteer Koptische datum naar Gregoriaanse datum
export function copticToGregorian(copticDay: number, copticMonth: number, copticYear: number = 1742): Date {
  // Koptisch jaar 1742 = 11 september 2025 tot 10 september 2026
  // Het Koptische nieuwjaar valt meestal op 11 september (of 12 sept na Gregoriaans schrikkeljaar)
  
  const gregorianYear = copticYear + 283; // 1742 + 283 = 2025
  
  // Check of Gregoriaans jaar een schrikkeljaar is
  const isGregorianLeapYear = (gregorianYear % 4 === 0 && gregorianYear % 100 !== 0) || (gregorianYear % 400 === 0);
  const newYearDay = isGregorianLeapYear ? 12 : 11;
  
  // Start van Koptisch jaar in Gregoriaans
  const copticNewYear = new Date(gregorianYear, 8, newYearDay); // 11 of 12 september
  
  // Bereken aantal dagen sinds Koptisch nieuwjaar
  // Elke maand heeft 30 dagen behalve Nesi (maand 13) die 5 of 6 dagen heeft
  let daysSinceNewYear = 0;
  
  // Tel alle volledige maanden op
  for (let m = 1; m < copticMonth; m++) {
    if (m === 13) {
      // Nesi heeft 5 dagen (6 in schrikkeljaar)
      const isCopticLeapYear = (copticYear % 4 === 3); // Koptische schrikkeljaren
      daysSinceNewYear += isCopticLeapYear ? 6 : 5;
    } else {
      daysSinceNewYear += 30;
    }
  }
  
  // Tel de dagen in de huidige maand op
  daysSinceNewYear += copticDay - 1;
  
  // Voeg dagen toe aan het Koptische nieuwjaar
  const gregorianDate = new Date(copticNewYear);
  gregorianDate.setDate(copticNewYear.getDate() + daysSinceNewYear);
  
  return gregorianDate;
}

// Format Gregoriaanse datum naar Nederlandse tekst
export function formatGregorianDate(date: Date): string {
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long'
  });
}

export function getFeastName(type: string): string {
  switch (type) {
    case 'major': return 'Grote Feest';
    case 'minor': return 'Klein Feest';
    case 'saints': return 'Heiligenfees';
    case 'virgin-mary': return 'Feest van de Moeder Gods';
    case 'fast': return 'Vastenperiode';
    default: return 'Feest';
  }
}

// Helper functie om feesten voor een specifieke datum te vinden
export function getFeastsForDate(day: number, month: number): CopticFeast[] {
  return fixedFeasts.filter(
    feast => feast.copticDate?.day === day && feast.copticDate?.month === month
  );
}

// Helper functie om alle feesten te krijgen
export function getAllFeasts(): CopticFeast[] {
  return [...fixedFeasts, ...moveableFeasts, ...fasts];
}