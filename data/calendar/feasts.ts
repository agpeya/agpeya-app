// Feestdagen van de Koptische Kerk

import { Feast } from './types';

export const feasts: Feast[] = [
  // Vaste Feestdagen (Lord Feasts - Heerlijke Feesten)
  {
    id: 'annunciation',
    name: 'Aankondiging aan Maria',
    type: 'lord',
    description: 'De engel Gabriël verkondigt aan Maria dat zij de Moeder van God zal worden',
    day: 25,
    month: 3
  },
  {
    id: 'nativity',
    name: 'Geboorte van Christus',
    type: 'lord',
    description: 'De geboorte van onze Heer Jezus Christus',
    day: 25,
    month: 12
  },
  {
    id: 'nativity-coptic',
    name: 'Geboorte van Christus (Koptisch - 7 januari)',
    type: 'lord',
    description: 'Volgens Koptische kalender (29 Kiahk)',
    day: 7,
    month: 1
  },
  {
    id: 'theophany',
    name: 'Theofanie (Epifanie)',
    type: 'lord',
    description: 'Doop van Christus in de Jordaan',
    day: 6,
    month: 1
  },
  {
    id: 'theophany-coptic',
    name: 'Theofanie (Koptisch - 19 januari)',
    type: 'lord',
    description: 'Volgens Koptische kalender (11 Tobi)',
    day: 19,
    month: 1
  },
  {
    id: 'presentation',
    name: 'Opdracht van Christus in de Tempel',
    type: 'lord',
    description: 'Veertig dagen na de geboorte',
    day: 2,
    month: 2
  },
  {
    id: 'hosanna-sunday',
    name: 'Palmzondag',
    type: 'lord',
    description: 'Intocht van Christus in Jeruzalem',
    isMoveable: true,
    offsetFromEaster: -7,
    day: 0,
    month: 0
  },
  {
    id: 'good-friday',
    name: 'Goede Vrijdag',
    type: 'lord',
    description: 'Kruisiging van onze Heer',
    isMoveable: true,
    offsetFromEaster: -2,
    day: 0,
    month: 0
  },
  {
    id: 'easter',
    name: 'Heilig Pasen',
    type: 'lord',
    description: 'Verrijzenis van Christus',
    isMoveable: true,
    offsetFromEaster: 0,
    day: 0,
    month: 0
  },
  {
    id: 'ascension',
    name: 'Hemelvaart van Christus',
    type: 'lord',
    description: 'Veertig dagen na Pasen',
    isMoveable: true,
    offsetFromEaster: 40,
    day: 0,
    month: 0
  },
  {
    id: 'pentecost',
    name: 'Pinksteren',
    type: 'lord',
    description: 'Neerdaling van de Heilige Geest',
    isMoveable: true,
    offsetFromEaster: 50,
    day: 0,
    month: 0
  },
  {
    id: 'transfiguration',
    name: 'Gedaanteverandering',
    type: 'lord',
    description: 'Christus op de berg Tabor',
    day: 6,
    month: 8
  },
  {
    id: 'maundy-thursday',
    name: 'Witte Donderdag',
    type: 'lord',
    description: 'Instelling van de Eucharistie',
    isMoveable: true,
    offsetFromEaster: -3,
    day: 0,
    month: 0
  },

  // Grote Feestdagen (Major Feasts)
  {
    id: 'circumcision',
    name: 'Besnijdenis van de Heer',
    type: 'major',
    description: 'Achtste dag na de geboorte',
    day: 1,
    month: 1
  },
  {
    id: 'wedding-cana',
    name: 'Bruiloft te Kana',
    type: 'major',
    description: 'Eerste wonder van Christus',
    day: 13,
    month: 1
  },
  {
    id: 'entry-egypt',
    name: 'Aankomst van de Heilige Familie in Egypte',
    type: 'major',
    description: 'Vlucht naar Egypte',
    day: 1,
    month: 6
  },
  {
    id: 'assumption-mary',
    name: 'Ontslapen van de Heilige Maagd',
    type: 'major',
    description: 'Hemelvaart van de Moeder Gods',
    day: 22,
    month: 8
  },
  {
    id: 'feast-cross',
    name: 'Feest van het Heilig Kruis',
    type: 'major',
    description: 'Gedachtenis van het vinden van het Kruis',
    day: 27,
    month: 9
  },
  {
    id: 'nayrouz',
    name: 'Koptisch Nieuwjaar (Nayrouz)',
    type: 'major',
    description: 'Jaar der Martelaren',
    day: 11,
    month: 9
  },

  // Kleinere Feestdagen (Minor Feasts)
  {
    id: 'nativity-john-baptist',
    name: 'Geboorte van Johannes de Doper',
    type: 'minor',
    description: 'Voorloper van Christus',
    day: 24,
    month: 6
  },
  {
    id: 'beheading-john-baptist',
    name: 'Onthoofding van Johannes de Doper',
    type: 'minor',
    description: 'Martelaarschap van Johannes',
    day: 29,
    month: 8
  },
  {
    id: 'nativity-mary',
    name: 'Geboorte van de Heilige Maagd Maria',
    type: 'minor',
    description: 'Geboorte van de Moeder Gods',
    day: 8,
    month: 9
  },
  {
    id: 'presentation-mary',
    name: 'Opdracht van Maria in de Tempel',
    type: 'minor',
    description: 'Maria gewijd aan God',
    day: 21,
    month: 11
  },
  {
    id: 'archangel-michael',
    name: 'Feest van de Aartsengel Michaël',
    type: 'minor',
    description: 'Beschermer van de Kerk',
    day: 12,
    month: 11
  }
];
