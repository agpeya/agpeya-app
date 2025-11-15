// Agpeya Gebeden Data - Gemodulariseerde structuur
// Elk gebedsuur is nu in een apart bestand voor eenvoudig beheer en backup

export { Prayer, PrayerHour } from './prayers/types';

import { primeHour } from './prayers/prime';
import { terceHour } from './prayers/terce';
import { sextHour } from './prayers/sext';
import { noneHour } from './prayers/none';
import { vespersHour } from './prayers/vespers';
import { complineHour } from './prayers/compline';
import { voorhangselHour } from './prayers/voorhangsel';
import { midnightHour } from './prayers/midnight';
import { gebedenHour } from './prayers/gebeden';

export const agpeyaHours = [
  primeHour,
  terceHour,
  sextHour,
  noneHour,
  vespersHour,
  complineHour,
  voorhangselHour,
  midnightHour,
  gebedenHour
];