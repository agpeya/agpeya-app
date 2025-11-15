// Hoofdbestand voor Koptische Kalender

import { saints } from './saints';
import { feasts } from './feasts';
import { fastingPeriods, isFastingDay } from './fasting';
import { getMovableDates, getDateFromEasterOffset } from './easter-calculator';
import type { CalendarDay, Saint, Feast, FastingPeriod } from './types';

// Functie om data voor een specifieke dag op te halen
export function getCalendarDay(date: Date): CalendarDay {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Haal bewegelijke data op voor dit jaar
  const movableDates = getMovableDates(year);
  
  // Filter heiligen voor deze dag
  const daySaints = saints.filter(s => s.month === month && s.day === day);
  
  // Filter feesten voor deze dag
  const dayFeasts = feasts.filter(f => {
    if (f.isMoveable && f.offsetFromEaster !== undefined) {
      const feastDate = getDateFromEasterOffset(year, f.offsetFromEaster);
      return feastDate.getMonth() === date.getMonth() && 
             feastDate.getDate() === date.getDate();
    }
    return f.month === month && f.day === day;
  });
  
  // Check vastenperiodes
  const activeFastingPeriods: FastingPeriod[] = [];
  fastingPeriods.forEach(fp => {
    if (fp.isMoveable && fp.offsetFromEaster !== undefined && fp.durationDays) {
      const startDate = getDateFromEasterOffset(year, fp.offsetFromEaster);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + fp.durationDays);
      
      if (date >= startDate && date <= endDate) {
        activeFastingPeriods.push(fp);
      }
    } else if (!fp.isMoveable) {
      // Vaste vastenperiodes
      const startDate = new Date(year, fp.startMonth - 1, fp.startDay);
      const endDate = new Date(fp.endMonth > fp.startMonth ? year : year + 1, 
                               fp.endMonth - 1, fp.endDay);
      
      if (date >= startDate && date <= endDate) {
        activeFastingPeriods.push(fp);
      }
    }
  });
  
  return {
    date,
    saints: daySaints,
    feasts: dayFeasts,
    fastingPeriods: activeFastingPeriods,
    isFastDay: isFastingDay(date) || activeFastingPeriods.length > 0
  };
}

// Functie om alle gebeurtenissen van een maand op te halen
export function getCalendarMonth(year: number, month: number): CalendarDay[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthDays: CalendarDay[] = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    monthDays.push(getCalendarDay(date));
  }
  
  return monthDays;
}

// Exporteer alles
export { saints } from './saints';
export { feasts } from './feasts';
export { fastingPeriods, isFastingDay } from './fasting';
export { getMovableDates, getDateFromEasterOffset } from './easter-calculator';
export type { Saint, Feast, FastingPeriod, CalendarDay } from './types';