import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { fixedFeasts, fasts, moveableFeasts, CopticFeast, copticToGregorian } from "../data/coptic-feasts";
import copticCross from "../imports/coptic-cross";

interface CalendarViewProps {
  isDarkMode: boolean;
  onClose: () => void;
}

export function CalendarView({ isDarkMode, onClose }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get current month and year
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const monthNames = [
    'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
    'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
  ];
  
  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  // Calculate Orthodox Easter for any year (Coptic Orthodox uses same calculation)
  const calculateOrthodoxEaster = (year: number): Date => {
    // Meeus/Jones/Butcher algorithm for Orthodox Easter
    const a = year % 4;
    const b = year % 7;
    const c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31);
    const day = ((d + e + 114) % 31) + 1;
    
    // This gives us the Julian calendar date, convert to Gregorian
    const julianEaster = new Date(year, month - 1, day);
    
    // Add 13 days for 20th-21st century (Julian to Gregorian offset)
    const gregorianEaster = new Date(julianEaster);
    gregorianEaster.setDate(julianEaster.getDate() + 13);
    
    return gregorianEaster;
  };
  
  // Get all events for the current month in chronological order
  const getMonthEvents = () => {
    const events: Array<{ date: Date; feast: CopticFeast }> = [];
    
    // Fixed feasts (both major and minor)
    fixedFeasts.forEach(feast => {
      if (feast.copticDate) {
        const gregorianDate = copticToGregorian(feast.copticDate.day, feast.copticDate.month);
        if (gregorianDate.getMonth() === currentMonth && gregorianDate.getFullYear() === currentYear) {
          events.push({ date: gregorianDate, feast });
        }
      }
    });
    
    // All fasts - maar vermijd duplicaten
    const processedFasts = new Set<string>();
    fasts.forEach(fast => {
      // Skip wekelijkse vasten (wordt apart getoond)
      if (fast.id === 'fast-wednesday-friday') return;
      
      // Skip einde-markers als we al de start hebben
      if (fast.id.includes('-end') && processedFasts.has(fast.id.replace('-end', ''))) return;
      
      if (fast.copticDate && !fast.moveable) {
        const gregorianDate = copticToGregorian(fast.copticDate.day, fast.copticDate.month);
        if (gregorianDate.getMonth() === currentMonth && gregorianDate.getFullYear() === currentYear) {
          events.push({ date: gregorianDate, feast: fast });
          processedFasts.add(fast.id);
        }
      }
    });
    
    // Calculate moveable feasts for any year based on Easter
    const easter = calculateOrthodoxEaster(currentYear);
    const easterMonth = easter.getMonth();
    const easterDate = easter.getDate();
    const easterYear = easter.getFullYear();
    
    // Jonah Fast: 3 dagen, begint op maandag 70 dagen voor Pasen
    const jonahStart = new Date(easter);
    jonahStart.setDate(easter.getDate() - 70);
    if (jonahStart.getMonth() === currentMonth && jonahStart.getFullYear() === currentYear) {
      events.push({
        date: jonahStart,
        feast: {
          id: 'fast-jonah',
          name: 'Vasten van Nineve (Jona)',
          type: 'fast',
          description: '3 dagen vasten ter voorbereiding op de Grote Vasten',
          moveable: true
        }
      });
    }
    
    // Great Lent: begint op maandag 55 dagen voor Pasen
    const greatLentStart = new Date(easter);
    greatLentStart.setDate(easter.getDate() - 55);
    if (greatLentStart.getMonth() === currentMonth && greatLentStart.getFullYear() === currentYear) {
      events.push({
        date: greatLentStart,
        feast: {
          id: 'fast-great-lent',
          name: 'Grote Vasten',
          type: 'fast',
          description: '55 dagen vasten (40 dagen + Heilige Week) tot Pasen',
          moveable: true
        }
      });
    }
    
    // Palm Sunday: 7 dagen voor Pasen
    const palmSunday = new Date(easter);
    palmSunday.setDate(easter.getDate() - 7);
    if (palmSunday.getMonth() === currentMonth && palmSunday.getFullYear() === currentYear) {
      events.push({
        date: palmSunday,
        feast: moveableFeasts.find(f => f.id === 'palm-sunday')!
      });
    }
    
    // Holy Thursday: 3 dagen voor Pasen
    const holyThursday = new Date(easter);
    holyThursday.setDate(easter.getDate() - 3);
    if (holyThursday.getMonth() === currentMonth && holyThursday.getFullYear() === currentYear) {
      events.push({
        date: holyThursday,
        feast: moveableFeasts.find(f => f.id === 'holy-thursday')!
      });
    }
    
    // Good Friday: 2 dagen voor Pasen
    const goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2);
    if (goodFriday.getMonth() === currentMonth && goodFriday.getFullYear() === currentYear) {
      events.push({
        date: goodFriday,
        feast: moveableFeasts.find(f => f.id === 'good-friday')!
      });
    }
    
    // Holy Saturday: 1 dag voor Pasen
    const holySaturday = new Date(easter);
    holySaturday.setDate(easter.getDate() - 1);
    if (holySaturday.getMonth() === currentMonth && holySaturday.getFullYear() === currentYear) {
      events.push({
        date: holySaturday,
        feast: {
          ...moveableFeasts.find(f => f.id === 'holy-saturday')!,
          description: 'Laatste dag van de Grote Vasten, Christus in het graf'
        }
      });
    }
    
    // Easter Sunday
    if (easter.getMonth() === currentMonth && easter.getFullYear() === currentYear) {
      events.push({
        date: easter,
        feast: moveableFeasts.find(f => f.id === 'easter')!
      });
    }
    
    // Thomas Sunday: 7 dagen na Pasen
    const thomasSunday = new Date(easter);
    thomasSunday.setDate(easter.getDate() + 7);
    if (thomasSunday.getMonth() === currentMonth && thomasSunday.getFullYear() === currentYear) {
      events.push({
        date: thomasSunday,
        feast: moveableFeasts.find(f => f.id === 'thomas-sunday')!
      });
    }
    
    // Ascension: 40 dagen na Pasen (altijd op donderdag)
    const ascension = new Date(easter);
    ascension.setDate(easter.getDate() + 39); // 39 dagen want Pasen telt als dag 1
    if (ascension.getMonth() === currentMonth && ascension.getFullYear() === currentYear) {
      events.push({
        date: ascension,
        feast: moveableFeasts.find(f => f.id === 'ascension')!
      });
    }
    
    // Pentecost: 50 dagen na Pasen
    const pentecost = new Date(easter);
    pentecost.setDate(easter.getDate() + 49); // 49 dagen want Pasen telt als dag 1
    if (pentecost.getMonth() === currentMonth && pentecost.getFullYear() === currentYear) {
      events.push({
        date: pentecost,
        feast: moveableFeasts.find(f => f.id === 'pentecost')!
      });
    }
    
    // Apostles Fast: begint op maandag na Pinksteren
    const apostlesFastStart = new Date(pentecost);
    apostlesFastStart.setDate(pentecost.getDate() + 1);
    if (apostlesFastStart.getMonth() === currentMonth && apostlesFastStart.getFullYear() === currentYear) {
      events.push({
        date: apostlesFastStart,
        feast: {
          id: 'fast-apostles',
          name: 'Apostelen Vasten',
          type: 'fast',
          description: 'Vasten van maandag na Pinksteren tot Feest van Petrus en Paulus (5 juli)',
          moveable: true
        }
      });
    }
    
    // Sort by date
    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  
  const monthEvents = getMonthEvents();
  
  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'major':
        return {
          label: 'Grote Feest',
          color: isDarkMode ? 'bg-red-900/40 border-red-700 text-red-300' : 'bg-red-50 border-red-300 text-red-800',
          icon: '✝'
        };
      case 'minor':
        return {
          label: 'Klein Feest',
          color: isDarkMode ? 'bg-orange-900/40 border-orange-700 text-orange-300' : 'bg-orange-50 border-orange-300 text-orange-800',
          icon: '✦'
        };
      case 'saints':
        return {
          label: 'Heilige',
          color: isDarkMode ? 'bg-blue-900/40 border-blue-700 text-blue-300' : 'bg-blue-50 border-blue-300 text-blue-800',
          icon: '†'
        };
      case 'virgin-mary':
        return {
          label: 'Moeder Gods',
          color: isDarkMode ? 'bg-purple-900/40 border-purple-700 text-purple-300' : 'bg-purple-50 border-purple-300 text-purple-800',
          icon: '🕊'
        };
      case 'fast':
        return {
          label: 'Vasten',
          color: isDarkMode ? 'bg-gray-700/60 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-400 text-gray-800',
          icon: '⊕'
        };
      default:
        return {
          label: 'Feest',
          color: isDarkMode ? 'bg-amber-900/40 border-amber-700 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-800',
          icon: '✦'
        };
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-amber-50 to-white'}`}>
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${copticCross})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '1.5cm 1.5cm',
          opacity: 0.10,
          zIndex: 0
        }}
      />

      {/* Main Container */}
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className={`border-b shadow-sm sticky top-0 z-20 ${isDarkMode ? 'bg-gray-800/95 border-gray-700 backdrop-blur' : 'bg-white/95 backdrop-blur'}`}>
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className={`h-12 w-12 p-0 ${isDarkMode ? 'text-white hover:bg-gray-700' : ''}`}
              >
                <ChevronLeft className="size-6" />
              </Button>
              
              <div className="text-center flex-1 mx-4">
                <h1 className={`${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`} style={{ fontFamily: 'Algerian' }}>
                  Liturgische Kalender
                </h1>
                <p className={`tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} whitespace-nowrap`} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem' }}>
                  KOPTISCH-ORTHODOX BISDOM NEDERLAND
                </p>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className={`h-12 w-12 p-0 ${isDarkMode ? 'text-white hover:bg-gray-700' : ''}`}
              >
                <X className="size-6" />
              </Button>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={previousMonth}
                className={isDarkMode ? 'text-gray-300 hover:bg-gray-700' : ''}
              >
                <ChevronLeft className="size-5 mr-1" />
                Vorige
              </Button>
              
              <h2 className={`text-xl ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                {monthNames[currentMonth]} {currentYear}
              </h2>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextMonth}
                className={isDarkMode ? 'text-gray-300 hover:bg-gray-700' : ''}
              >
                Volgende
                <ChevronRight className="size-5 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content - List View */}
        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="px-4 py-6">
            {monthEvents.length === 0 ? (
              <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Geen feesten of gedenkdagen deze maand
              </div>
            ) : (
              <div className="space-y-3">
                {monthEvents.map((event, index) => {
                  const typeInfo = getTypeInfo(event.feast.type);
                  const dayName = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'][event.date.getDay()];
                  
                  return (
                    <div
                      key={`${event.feast.id}-${index}`}
                      className={`p-4 rounded-lg border-2 ${typeInfo.color} transition-all hover:shadow-lg`}
                    >
                      {/* Date Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`text-center min-w-[60px] ${isDarkMode ? 'bg-black/20' : 'bg-white/50'} rounded-lg p-2`}>
                            <div className={`text-2xl ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                              {event.date.getDate()}
                            </div>
                            <div className="text-xs opacity-70">
                              {dayName.substring(0, 3)}
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xl">{typeInfo.icon}</span>
                              <h3 className="font-semibold">
                                {event.feast.name}
                              </h3>
                            </div>
                            {event.feast.description && (
                              <p className="text-sm opacity-80 mt-1">
                                {event.feast.description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${isDarkMode ? 'bg-black/30' : 'bg-white/50'}`}>
                          {typeInfo.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Weekly Fasts Note */}
            <div className={`mt-6 p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700/30 border-gray-600 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-700'}`}>
              <div className="flex items-start gap-2">
                <span className="text-lg">⊕</span>
                <div>
                  <div className="font-semibold mb-1">Wekelijks Vasten</div>
                  <p className="text-sm opacity-80">
                    Elke woensdag (verraad van Judas) en vrijdag (kruisiging) zijn vastendagen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}