// Vastenperiodes van de Koptische Kerk

import { FastingPeriod } from './types';

export const fastingPeriods: FastingPeriod[] = [
  {
    id: 'great-lent',
    name: 'Grote Vasten',
    description: '55 dagen voor Pasen (inclusief Heilige Week)',
    startMonth: 0, // Wordt berekend o.b.v. Pasen
    startDay: 0,
    endMonth: 0,
    endDay: 0,
    isMoveable: true,
    offsetFromEaster: -55,
    durationDays: 55
  },
  {
    id: 'advent',
    name: 'Advent Vasten (Vasten van de Profeten)',
    description: '43 dagen voor Kerstmis',
    startMonth: 11,
    startDay: 25,
    endMonth: 1,
    endDay: 6,
    durationDays: 43
  },
  {
    id: 'apostles-fast',
    name: 'Apostelen Vasten',
    description: 'Van de dag na Pinksteren tot feest van HH. Petrus en Paulus',
    startMonth: 0, // Bewegelijk
    startDay: 0,
    endMonth: 7,
    endDay: 12, // 29 juni volgens Koptische kalender = 12 juli
    isMoveable: true,
    offsetFromEaster: 51, // Dag na Pinksteren
    durationDays: 0 // Varieert
  },
  {
    id: 'assumption-fast',
    name: 'Vasten van de Maagd Maria',
    description: '15 dagen voor het Ontslapen van de Maagd',
    startMonth: 8,
    startDay: 7,
    endMonth: 8,
    endDay: 22,
    durationDays: 15
  },
  {
    id: 'jonah-fast',
    name: 'Vasten van Jona',
    description: '3 dagen voor de Grote Vasten',
    startMonth: 0, // Bewegelijk
    startDay: 0,
    endMonth: 0,
    endDay: 0,
    isMoveable: true,
    offsetFromEaster: -58,
    durationDays: 3
  },
  {
    id: 'wednesday-fast',
    name: 'Woensdag Vasten',
    description: 'Elke woensdag van het jaar (behalve tijdens Paastijd)',
    startMonth: 1,
    startDay: 1,
    endMonth: 12,
    endDay: 31,
    durationDays: 52 // Ongeveer 52 woensdagen per jaar
  },
  {
    id: 'friday-fast',
    name: 'Vrijdag Vasten',
    description: 'Elke vrijdag van het jaar (behalve tijdens Paastijd)',
    startMonth: 1,
    startDay: 1,
    endMonth: 12,
    endDay: 31,
    durationDays: 52 // Ongeveer 52 vrijdagen per jaar
  },
  {
    id: 'paramoun-nativity',
    name: 'Paramoun van Kerstmis',
    description: 'Vooravond van de Geboorte van Christus',
    startMonth: 1,
    startDay: 6,
    endMonth: 1,
    endDay: 6,
    durationDays: 1
  },
  {
    id: 'paramoun-theophany',
    name: 'Paramoun van Theofanie',
    description: 'Vooravond van het Doopfeest',
    startMonth: 1,
    startDay: 18,
    endMonth: 1,
    endDay: 18,
    durationDays: 1
  }
];

// Helper functie om te checken of een dag een vastendag is
export function isFastingDay(date: Date): boolean {
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  
  // Check woensdagen en vrijdagen (behalve tijdens Paastijd - dat moet nog geïmplementeerd worden)
  if (day === 3 || day === 5) {
    return true;
  }
  
  // Check specifieke vastenperiodes
  // Advent (25 nov - 6 jan)
  if ((month === 11 && dayOfMonth >= 25) || (month === 12) || (month === 1 && dayOfMonth <= 6)) {
    return true;
  }
  
  // Vasten van Maria (7-22 augustus)
  if (month === 8 && dayOfMonth >= 7 && dayOfMonth <= 22) {
    return true;
  }
  
  // Voor bewegelijke vastenperiodes moet Pasen berekend worden
  // Dit is een basis implementatie
  
  return false;
}
