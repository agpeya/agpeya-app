// Vandaag scherm - toont heiligen, feestdagen en vasten van vandaag

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Calendar as CalendarIcon, Cross, Home, Church, Salad } from 'lucide-react';
import { calculateCopticDate, getCurrentCopticMonthName, getCopticYearStart, getCopticDayName } from '../data/calendar/coptic-dates';
import { fixedFeasts, fasts } from '../data/coptic-feasts';

// SVG path from public folder
const copticCrossDecorative = "/images/coptic-cross-decorative.svg";

interface CalendarTodayProps {
  onBack: () => void;
  onNavigateToFullCalendar: () => void;
  isDarkMode?: boolean;
}

export function CalendarToday({ onBack, onNavigateToFullCalendar, isDarkMode }: CalendarTodayProps) {
  const [monthDays, setMonthDays] = useState<CalendarDay[]>([]);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    
    const days = getCalendarMonth(year, month);
    setMonthDays(days);
    
    setCurrentMonth(now.toLocaleDateString('nl-NL', { 
      year: 'numeric', 
      month: 'long'
    }));
  }, []);

  const formatDate = (date: Date) => {
    const dayName = date.toLocaleDateString('nl-NL', { 
      weekday: 'long'
    });
    const fullDate = date.toLocaleDateString('nl-NL', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    return { dayName, fullDate };
  };

  const getFeastTypeLabel = (type: string) => {
    switch (type) {
      case 'lord': return 'Heerlijk Feest';
      case 'major': return 'Groot Feest';
      case 'minor': return 'Klein Feest';
      default: return 'Feest';
    }
  };

  // Verzamel alle unieke feesten van deze maand
  const monthFeasts = monthDays
    .filter(day => day.feasts.length > 0)
    .map(day => ({
      date: day.date,
      feasts: day.feasts
    }));

  // Verzamel alle unieke heiligen van deze maand
  const monthSaints = monthDays
    .filter(day => day.saints.length > 0)
    .map(day => ({
      date: day.date,
      saints: day.saints
    }));

  // Verzamel alle vastenperiodes van deze maand
  const monthFasting = monthDays
    .filter(day => day.isFastDay && day.fastingPeriods.length > 0)
    .reduce((acc, day) => {
      day.fastingPeriods.forEach(fp => {
        if (!acc.some(existing => existing.id === fp.id)) {
          acc.push(fp);
        }
      });
      return acc;
    }, [] as typeof monthDays[0]['fastingPeriods']);

  return (
    <div className={`min-h-screen flex flex-col relative ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-amber-50 to-white'}`}>
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${copticCrossDecorative})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
          opacity: isDarkMode ? 0.02 : 0.03,
          zIndex: 0,
          willChange: 'transform'
        }}
      />

      {/* Header */}
      <div className={`border-b shadow-sm sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className={`h-14 w-14 p-0 ${isDarkMode ? 'text-white hover:bg-gray-700' : ''}`}
            >
              <Home className="size-8" />
            </Button>
            
            <div className="text-center flex-1 mx-4">
              <h2 className={isDarkMode ? 'text-amber-400' : 'text-amber-700'}>Kalender</h2>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentMonth}
              </p>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onNavigateToFullCalendar}
              className={`h-14 w-14 p-0 ${isDarkMode ? 'text-white hover:bg-gray-700' : ''}`}
            >
              <CalendarIcon className="size-8" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 relative z-10">
        <div className="px-4 py-6 space-y-4">
          
          {/* Vastenperiodes */}
          {monthFasting.length > 0 && (
            <div className={`rounded-lg shadow-sm border p-4 ${isDarkMode ? 'bg-purple-900/30 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
              <div className="flex items-start gap-3">
                <Salad className={`size-6 mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <div className="flex-1">
                  <h3 className={`mb-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>Vastenperiodes deze maand</h3>
                  <div className="space-y-3">
                    {monthFasting.map(fp => (
                      <div key={fp.id} className={`pb-3 ${monthFasting[monthFasting.length - 1].id !== fp.id ? 'border-b' : ''} ${isDarkMode ? 'border-purple-700' : 'border-purple-300'}`}>
                        <p className={`font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>{fp.name}</p>
                        {fp.description && (
                          <p className={`text-sm mt-1 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{fp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feestdagen */}
          {monthFeasts.length > 0 && (
            <div className={`rounded-lg shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="flex items-start gap-3">
                <Church className={`size-6 mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                <div className="flex-1">
                  <h3 className={`mb-3 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>Feestdagen deze maand</h3>
                  <div className="space-y-3">
                    {monthFeasts.map((dayData, idx) => (
                      <div key={idx}>
                        {dayData.feasts.map(feast => (
                          <div key={feast.id} className={`pb-3 mb-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b last:border-b-0 last:pb-0 last:mb-0`}>
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2 mb-1">
                                  <div className="flex flex-col">
                                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {formatDate(dayData.date).dayName}
                                    </span>
                                    <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                      {formatDate(dayData.date).fullDate}
                                    </span>
                                  </div>
                                  <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                                    feast.type === 'lord' 
                                      ? isDarkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700'
                                      : feast.type === 'major'
                                      ? isDarkMode ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-700'
                                      : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {getFeastTypeLabel(feast.type)}
                                  </span>
                                </div>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feast.name}</p>
                              </div>
                            </div>
                            {feast.description && (
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feast.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Heiligen */}
          {monthSaints.length > 0 && (
            <div className={`rounded-lg shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="flex items-start gap-3">
                <Cross className={`size-6 mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                <div className="flex-1">
                  <h3 className={`mb-3 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>Heiligen deze maand</h3>
                  <div className="space-y-3">
                    {monthSaints.map((dayData, idx) => (
                      <div key={idx}>
                        {dayData.saints.map(saint => (
                          <div key={saint.id} className={`pb-3 mb-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b last:border-b-0 last:pb-0 last:mb-0`}>
                            <div className="flex flex-col mb-1">
                              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {formatDate(dayData.date).dayName}
                              </span>
                              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                {formatDate(dayData.date).fullDate}
                              </span>
                            </div>
                            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{saint.name}</p>
                            {saint.description && (
                              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{saint.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Als er niets speciaals is deze maand */}
          {monthFasting.length === 0 && monthFeasts.length === 0 && monthSaints.length === 0 && (
            <div className={`rounded-lg shadow-sm border p-6 text-center ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <img src={copticCrossDecorative} alt="Koptisch Kruis IC XC NI KA" className="size-16 mx-auto mb-4 opacity-50" />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Geen speciale gebeurtenissen deze maand
              </p>
            </div>
          )}

        </div>
      </ScrollArea>
    </div>
  );
}