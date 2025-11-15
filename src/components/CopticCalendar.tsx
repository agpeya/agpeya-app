import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useMemo } from "react";

interface CopticCalendarProps {
  isDarkMode: boolean;
  onOpenCalendar?: () => void;
}

interface CopticDate {
  day: number;
  month: string;
  monthNumber: number;
  year: number;
  season: string;
  monthDays: number;
}

// Koptische maanden met Nederlandse vertalingen
const COPTIC_MONTHS = [
  "Thoout", "Paope", "Hathor", "Kiahk", 
  "Tobi", "Meshir", "Paremhat", "Parmouti",
  "Pashons", "Paoni", "Epip", "Mesori", "Nesi"
] as const;

const COPTIC_SEASONS = [
  { name: "Seizoen van de Overstromingen", months: [1, 2, 3, 4] },
  { name: "Seizoen van de Groei", months: [5, 6, 7, 8] },
  { name: "Seizoen van de Oogst", months: [9, 10, 11, 12] },
  { name: "Klein Maand", months: [13] }
] as const;

// Koptische nieuwjaarsdata voor verschillende jaren (11 september, behalve in schrikkeljaren: 12 september)
const COPTIC_NEW_YEAR_DATES: Record<number, { month: number; day: number }> = {
  2023: { month: 9, day: 12 }, // 2023 was schrikkeljaar in Gregoriaanse kalender
  2024: { month: 9, day: 11 },
  2025: { month: 9, day: 11 },
  2026: { month: 9, day: 11 },
  2027: { month: 9, day: 11 },
  2028: { month: 9, day: 11 }, // 2028 is schrikkeljaar
};

function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getCopticNewYear(gregorianYear: number): Date {
  // Bepaal of het Gregoriaanse jaar een schrikkeljaar is
  const isLeap = isGregorianLeapYear(gregorianYear);
  const newYearDay = isLeap ? 12 : 11;
  
  return new Date(gregorianYear, 8, newYearDay); // September = maand 8 (0-indexed)
}

function getCopticDate(gregorianDate: Date): CopticDate {
  const gregorianYear = gregorianDate.getFullYear();
  const gregorianMonth = gregorianDate.getMonth() + 1;
  const gregorianDay = gregorianDate.getDate();

  // Bepaal Koptisch nieuwjaar voor dit Gregoriaanse jaar
  const copticNewYearCurrent = getCopticNewYear(gregorianYear);
  const copticNewYearPrevious = getCopticNewYear(gregorianYear - 1);

  // Bepaal of we voor of na het Koptische nieuwjaar zitten
  let copticYear: number;
  let daysSinceCopticNewYear: number;

  if (gregorianDate >= copticNewYearCurrent) {
    // Na Koptisch nieuwjaar van dit jaar
    copticYear = gregorianYear - 283;
    daysSinceCopticNewYear = Math.floor(
      (gregorianDate.getTime() - copticNewYearCurrent.getTime()) / (1000 * 60 * 60 * 24)
    );
  } else {
    // Voor Koptisch nieuwjaar van dit jaar -> gebruik vorig Koptisch jaar
    copticYear = gregorianYear - 284;
    daysSinceCopticNewYear = Math.floor(
      (gregorianDate.getTime() - copticNewYearPrevious.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  // Bereken Koptische maand en dag
  let copticMonth: number;
  let copticDay: number;
  let monthDays: number;

  // Koptische maanden hebben 30 dagen, behalve de 13e maand (Nesi) die 5-6 dagen heeft
  if (daysSinceCopticNewYear < 360) {
    copticMonth = Math.floor(daysSinceCopticNewYear / 30) + 1;
    copticDay = (daysSinceCopticNewYear % 30) + 1;
    monthDays = 30;
  } else {
    copticMonth = 13;
    copticDay = daysSinceCopticNewYear - 359;
    // Nesi heeft 5 dagen, behalve in Koptische schrikkeljaren (elke 4 jaar)
    const isCopticLeapYear = (copticYear % 4) === 3; // Koptische schrikkeljaren zijn jaren die deelbaar zijn door 4, met remainder 3
    monthDays = isCopticLeapYear ? 6 : 5;
  }

  const season = COPTIC_SEASONS.find(s => s.months.includes(copticMonth))?.name || "";

  return {
    day: copticDay,
    month: COPTIC_MONTHS[copticMonth - 1],
    monthNumber: copticMonth,
    year: copticYear,
    season: season,
    monthDays: monthDays
  };
}

// Functie om Koptische feestdagen te krijgen (vereenvoudigd)
function getCopticFeastDays(copticDate: CopticDate): string[] {
  const feasts: string[] = [];

  // Belangrijke Koptische feestdagen
  if (copticDate.monthNumber === 1 && copticDate.day === 1) {
    feasts.push("Koptisch Nieuwjaar (Nayrouz)");
  }
  if (copticDate.monthNumber === 1 && copticDate.day === 17) {
    feasts.push("Feest van het Kruis");
  }
  if (copticDate.monthNumber === 4 && copticDate.day === 29) {
    feasts.push("Kerstmis");
  }
  if (copticDate.monthNumber === 7 && copticDate.day === 11) {
    feasts.push("Doopsel van Christus (Epifanie)");
  }
  if (copticDate.monthNumber === 9 && copticDate.day === 29) {
    feasts.push("Palmzondag");
  }
  if (copticDate.monthNumber === 10 && copticDate.day === 6) {
    feasts.push("Paaszondag");
  }
  if (copticDate.monthNumber === 10 && copticDate.day === 14) {
    feasts.push("Thomas Zondag");
  }

  return feasts;
}

export function CopticCalendar({ isDarkMode, onOpenCalendar }: CopticCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const copticDate = useMemo(() => getCopticDate(today), [today]);
  const feastDays = useMemo(() => getCopticFeastDays(copticDate), [copticDate]);

  const gregorianDayName = today.toLocaleDateString('nl-NL', { 
    weekday: 'long'
  });
  
  const gregorianFullDate = today.toLocaleDateString('nl-NL', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric'
  });

  // Progress voor de huidige Koptische maand
  const monthProgress = (copticDate.day / copticDate.monthDays) * 100;

  return (
    <div className={`p-4 rounded-lg border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <div className="grid grid-cols-2 gap-4 text-sm">
        {/* Gregorian Date */}
        <div className="space-y-2">
          <p className={`font-semibold ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
            Gregoriaans
          </p>
          <div>
            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {gregorianDayName}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {gregorianFullDate}
            </p>
          </div>
        </div>
        
        {/* Coptic Date */}
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-amber-50'}`}>
          <p className={`font-semibold mb-2 ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
            Koptisch
          </p>
          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {copticDate.day} {copticDate.month} {copticDate.year}
          </p>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>
            {copticDate.season}
          </p>
          
          {/* Maand progress indicator */}
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Dag {copticDate.day} van {copticDate.monthDays}
              </span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {Math.round(monthProgress)}%
              </span>
            </div>
            <div className={`w-full rounded-full h-1.5 ${isDarkMode ? 'bg-gray-600' : 'bg-amber-200'}`}>
              <div 
                className={`h-1.5 rounded-full ${isDarkMode ? 'bg-amber-500' : 'bg-amber-600'}`}
                style={{ width: `${monthProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feast Days */}
      {feastDays.length > 0 && (
        <div className={`mt-3 p-2 rounded-md text-center ${isDarkMode ? 'bg-amber-900/30 border border-amber-700' : 'bg-amber-100 border border-amber-300'}`}>
          <p className={`text-xs font-semibold ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>
            🎉 {feastDays[0]}
          </p>
          {feastDays.length > 1 && (
            <p className="text-xs text-gray-600 mt-1">
              +{feastDays.length - 1} meer feestdag(en)
            </p>
          )}
        </div>
      )}

      {/* Calendar Button */}
      {onOpenCalendar && (
        <div className="mt-3 flex justify-center">
          <Button
            onClick={onOpenCalendar}
            variant="outline"
            size="sm"
            className={`h-9 px-3 text-xs ${isDarkMode 
              ? 'bg-amber-900/30 border-amber-700 hover:bg-amber-900/50 text-amber-300' 
              : 'bg-amber-50 border-amber-300 hover:bg-amber-100 text-amber-800'
            }`}
          >
            <CalendarIcon className="size-3.5 mr-2" />
            Heiligen & Feestdagen
          </Button>
        </div>
      )}

      {/* Extra info voor ontwikkelaars */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-2 text-xs">
          <summary className={`cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Debug Info
          </summary>
          <div className={`mt-1 p-2 rounded ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <p>Gregoriaans: {today.toISOString().split('T')[0]}</p>
            <p>Koptisch: {copticDate.day}/{copticDate.monthNumber}/{copticDate.year}</p>
            <p>Maand: {copticDate.monthDays} dagen</p>
          </div>
        </details>
      )}
    </div>
  );
}