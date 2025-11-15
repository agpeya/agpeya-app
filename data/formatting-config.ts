// Configuratie voor automatische tekstopmaak in gebeden
// Deze termen worden automatisch vet gemaakt in alle gebeden

export const BOLD_TERMS = [
  // Langere zinnen eerst (om dubbele matching te voorkomen)
  'Nu en altijd en tot in de eeuwen der eeuwen, Amen.', 
  'Glorie aan de Vader en de Zoon en de Heilige Geest.',
  'Glorie zij aan God tot in eeuwigheid',
  'Glorie zij aan U, die de mens liefheeft.',
  'Heilig, heilig, heilig',
  'Uit de brief van St. Paulus aan de Efeze\n(4: 1-6)', // Met newline
  'Uit de brief van St. Paulus aan de Efeze (4: 1-6)', // Zonder newline
  
  // Gebedstitels
  'JOHANNES (1:1-17)',
  'Halleluja ',  // Met spatie (matcht meeste gevallen)
  'Halleluja',   // Zonder spatie (voor uitzonderingen)
  'Amen.',
  'Amen',
  'Gebeden na het Evangelie.', 
  'Lofprijzing van de Engelen',
  'Inleiding tot iedere getijde',
  'Onze vader die in de hemelen zijt',
  'Inleiding',
  'Inleiding gebeden:',
  'DANKGEBED',
  'Dan wordt gezegd',
  'Uit het geloof van de kerk',
  'Begin van het eerste uur',
  'EERSTE DIENST',
  'TWEEDE DIENST',
  'DERDE DIENST',
  'LITANIEËN',
  'GLORIA',
  'TRISAGION',
  'GEGROET ZIJ U',
  'Inleiding op de geloofsbelijdenis',
  'GELOOFSBELIJDENIS (Credo)',
  'SANCTUS',
  'EVANGELIE',
  'Absolutie van het eerste uur (Lauden)',
  'Nog een absolutie',
  'Slotgebed na ieder uur',
  'Glorie zij aan U, die de mens liefheeft.',
  
  // Evangelie varianten
  'JOHANNES (14:26 - 15:3)',
  'MATTHEÜS (5:1-16)',
  
  // Absoluties per uur
  'Absolutie van het derde uur (Terts)',
  'Absolutie van het zesde uur (Sext)',
  
  // Psalmen (nummers) - alfabetisch gesorteerd voor overzicht
  'PSALM 1',
  'PSALM 2',
  'PSALM 3',
  'PSALM 4',
  'PSALM 5',
  'PSALM 6',
  'PSALM 8',
  'PSALM 11',
  'PSALM 12',
  'PSALM 14',
  'PSALM 15',
  'PSALM 18',
  'PSALM 19',
  'PSALM 22',
  'PSALM 23',
  'PSALM 24',
  'PSALM 25',
  'PSALM 26',
  'PSALM 28',
  'PSALM 29',
  'PSALM 33',
  'PSALM 40',
  'PSALM 42',
  'PSALM 44',
  'PSALM 45',
  'PSALM 46',
  'PSALM 50',
  'PSALM 53',
  'PSALM 56',
  'PSALM 60',
  'PSALM 62',
  'PSALM 66',
  'PSALM 69',
  'PSALM 83',
  'PSALM 84',
  'PSALM 85',
  'PSALM 86',
  'PSALM 90',
  'PSALM 92',
  'PSALM 112',
  'PSALM 116',
  'PSALM 117',
  'PSALM 118 (01)',
  'PSALM 118 (02)',
  'PSALM 118 (03)',
  'PSALM 118 (04)',
  'PSALM 118 (05)',
  'PSALM 118 (06)',
  'PSALM 118 (07)',
  'PSALM 118 (08)',
  'PSALM 118 (09)',
  'PSALM 118 (10)',
  'PSALM 118 (11)',
  'PSALM 118 (12)',
  'PSALM 118 (13)',
  'PSALM 118 (14)',
  'PSALM 118 (15)',
  'PSALM 118 (16)',
  'PSALM 118 (17)',
  'PSALM 118 (18)',
  'PSALM 118 (19)',
  'PSALM 118 (20)',
  'PSALM 118 (21)',
  'PSALM 118 (22)',
  'PSALM 119',
  'PSALM 129',
  'PSALM 130',
  'PSALM 131',
  'PSALM 142',
  'Psalm 25',  // Lowercase variant
  'Psalm 46',  // Lowercase variant
  'Litanie',   // Voor middernachtgebed
];

// Configuratie voor Koptische teksten
// Deze termen worden weergegeven in het CS Avva Shenouda lettertype
export const COPTIC_TERMS = [
  // Varianten zonder spaties (origineel)
  'Doxa Patri ke `Uiw ke `agiw `Pneumati.',
  'Doxa Patri ke `Uiw ke `agiw `Pneumati',
  'Ke nun ke `a`i ke ic touc `e`wnac ton `e`wnwn `amyn.',
  'Ke nun ke `a`i ke ic touc `e`wnac ton `e`wnwn `amyn',
  
  // Varianten met spaties rondom backticks
  'Doxa Patri ke ` Uiw ke `agiw ` Pneumati.',
  'Doxa Patri ke ` Uiw ke `agiw ` Pneumati',
  'Ke nun ke ` a`i ke ic touc `e `wnac ton `e `wnwn ` amyn.',
  'Ke nun ke ` a`i ke ic touc `e `wnac ton `e `wnwn ` amyn',
  
  // K e varianten (met spaties tussen letters)
  'K e n u n k e ` a ` i k e i c t o u c e ` w` n a c t o n e ` w` n w n ` a m y n .',
  'K e n u n k e ` a ` i k e i c t o u c e ` w` n a c t o n e ` w` n w n ` a m y n',
  
  // Andere varianten
  'Kurie` eley`con',
  'Kuri`e ele`ycon',
  
  
  // Voeg hier Koptische termen toe indien nodig
  // Bijvoorbeeld: 'Ⲡⲁⲛⲟⲩϯ',
];