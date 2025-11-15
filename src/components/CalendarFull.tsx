import { useState, useMemo, useCallback } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { ChevronLeft, ChevronRight, X, Home, Calendar as CalendarIcon, Cross, Church, Salad } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Types
interface Saint {
  id: string;
  name: string;
  description?: string;
  month: number;
  day: number;
}

interface Feast {
  id: string;
  name: string;
  description?: string;
  month: number;
  day: number;
  type: 'lord' | 'major' | 'minor';
  isMoveable: boolean;
}

interface FastingPeriod {
  id: string;
  name: string;
  description?: string;
  durationDays?: number;
}

interface CalendarFullProps {
  onBack: () => void;
  onBackToToday?: () => void;
  isDarkMode?: boolean;
}

// Constants
const MONTHS = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
] as const;

const COPTIC_CROSS_DECORATIVE = "/images/coptic-cross-decorative.svg";

// Mock data - vervang dit door je echte data
const SAINTS: Saint[] = [
  { id: '1', name: 'St. Marcus de Evangelist', month: 4, day: 15 },
  { id: '2', name: 'St. Antonius de Grote', month: 1, day: 22 },
  { id: '3', name: 'St. Joris de Grote', month: 4, day: 23 },
  // Voeg meer heiligen toe...
];

const FEASTS: Feast[] = [
  { id: '1', name: 'Kerstmis', month: 1, day: 7, type: 'lord', isMoveable: false },
  { id: '2', name: 'Doopsel van Christus', month: 1, day: 19, type: 'lord', isMoveable: false },
  { id: '3', name: 'Boodschap aan Maria', month: 3, day: 29, type: 'major', isMoveable: false },
  // Voeg meer feesten toe...
];

const FASTING_PERIODS: FastingPeriod[] = [
  { id: '1', name: 'Vasten van Nineve', description: 'Drie dagen van berouw en vasten', durationDays: 3 },
  { id: '2', name: 'Grote Vasten', description: 'Vasten voor Pasen', durationDays: 55 },
  { id: '3', name: 'Vasten van de Apostelen', description: 'Vasten van de heilige apostelen', durationDays: 15 },
  { id: '4', name: 'Vasten van de Geboorte', description: 'Vasten voor Kerstmis', durationDays: 43 },
  { id: '5', name: 'Vasten van de Maagd Maria', description: 'Vasten voor het feest van de Maagd Maria', durationDays: 15 },
];

export function CalendarFull({ onBack, onBackToToday, isDarkMode = false }: CalendarFullProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear] = useState(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState('saints');

  // Memoized filtered data
  const saintsForMonth = useMemo(() => 
    SAINTS.filter(s => s.month === selectedMonth).sort((a, b) => a.day - b.day),
    [selectedMonth]
  );

  const feastsForMonth = useMemo(() =>
    FEASTS.filter(f => !f.isMoveable && f.month === selectedMonth).sort((a, b) => a.day - b.day),
    [selectedMonth]
  );

  // Helper functions
  const getFeastTypeLabel = useCallback((type: string) => {
    switch (type) {
      case 'lord': return 'Heerlijk Feest';
      case 'major': return 'Groot Feest';
      case 'minor': return 'Klein Feest';
      default: return 'Feest';
    }
  }, []);

  const getFeastTypeBadgeColor = useCallback((type: string) => {
    switch (type) {
      case 'lord': 
        return isDarkMode ? 'bg-red-900/50 text-red-300 border border-red-700' : 'bg-red-100 text-red-700 border border-red-200';
      case 'major':
        return isDarkMode ? 'bg-amber-900/50 text-amber-300 border border-amber-700' : 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'minor':
        return isDarkMode ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-700 border border-gray-300';
      default:
        return isDarkMode ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-700 border border-gray-300';
    }
  }, [isDarkMode]);

  const getFastingPeriodColor = useCallback((index: number) => {
    const colors = [
      isDarkMode ? 'text-purple-400' : 'text-purple-600',
      isDarkMode ? 'text-blue-400' : 'text-blue-600',
      isDarkMode ? 'text-green-400' : 'text-green-600',
      isDarkMode ? 'text-orange-400' : 'text-orange-600',
      isDarkMode ? 'text-pink-400' : 'text-pink-600'
    ];
    return colors[index % colors.length];
  }, [isDarkMode]);

  // Background style
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${COPTIC_CROSS_DECORATIVE})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '300px 300px',
    opacity: isDarkMode ? 0.02 : 0.03,
    zIndex: 0,
  }), [isDarkMode]);

  // Navigation handlers
  const handlePreviousMonth = useCallback(() => {
    setSelectedMonth(prev => prev === 1 ? 12 : prev - 1);
  }, []);

  const handleNextMonth = useCallback(() => {
    setSelectedMonth(prev => prev === 12 ? 1 : prev + 1);
  }, []);

  const handleTodayClick = useCallback(() => {
    setSelectedMonth(new Date().getMonth() + 1);
    onBackToToday?.();
  }, [onBackToToday]);

  // Render functions for better organization
  const renderMonthSelector = () => (
    <div className={`rounded-lg shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousMonth}
          className={`h-8 w-8 p-0 ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : ''}`}
        >
          <ChevronLeft className="size-4" />
        </Button>
        
        <div className="text-center flex-1 mx-3">
          <label className={`text-sm font-medium block mb-1 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
            Maand
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className={`w-full p-2 rounded border text-sm font-medium ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300'
            }`}
          >
            {MONTHS.map((month, index) => (
              <option key={month} value={index + 1}>{month}</option>
            ))}
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNextMonth}
          className={`h-8 w-8 p-0 ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : ''}`}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleTodayClick}
        className={`w-full text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
      >
        <CalendarIcon className="size-3 mr-1" />
        Ga naar vandaag
      </Button>
    </div>
  );

  const renderSaintsList = () => (
    <div className="space-y-4">
      {renderMonthSelector()}
      
      {saintsForMonth.length > 0 ? (
        <div className={`rounded-lg shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <div className="p-4 border-b" className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Heiligen in {MONTHS[selectedMonth - 1]} ({saintsForMonth.length})
            </h3>
          </div>
          <div className="divide-y" className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {saintsForMonth.map(saint => (
              <div key={saint.id} className="p-4 hover:bg-opacity-50 transition-colors" className={`p-4 hover:bg-opacity-50 transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-start gap-3">
                  <span className={`text-sm font-medium px-2 py-1 rounded min-w-10 text-center ${
                    isDarkMode ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {saint.day}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {saint.name}
                    </p>
                    {saint.description && (
                      <p className={`text-sm mt-1 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {saint.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`rounded-lg shadow-sm border p-8 text-center ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <Cross className={`size-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Geen heiligen geregistreerd voor {MONTHS[selectedMonth - 1]}
          </p>
        </div>
      )}
    </div>
  );

  const renderFeastsList = () => (
    <div className="space-y-4">
      {renderMonthSelector()}
      
      {feastsForMonth.length > 0 ? (
        <div className={`rounded-lg shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <div className="p-4 border-b" className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Feestdagen in {MONTHS[selectedMonth - 1]} ({feastsForMonth.length})
            </h3>
          </div>
          <div className="divide-y" className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {feastsForMonth.map(feast => (
              <div key={feast.id} className="p-4 hover:bg-opacity-50 transition-colors" className={`p-4 hover:bg-opacity-50 transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-start gap-3">
                  <span className={`text-sm font-medium px-2 py-1 rounded min-w-10 text-center ${
                    isDarkMode ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {feast.day}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                      <p className={`font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {feast.name}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${getFeastTypeBadgeColor(feast.type)}`}>
                        {getFeastTypeLabel(feast.type)}
                      </span>
                    </div>
                    {feast.description && (
                      <p className={`text-sm line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {feast.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`rounded-lg shadow-sm border p-8 text-center ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <Church className={`size-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Geen vaste feestdagen voor {MONTHS[selectedMonth - 1]}
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Bewegelijke feesten (zoals Pasen) worden op het "Vandaag" scherm getoond
          </p>
        </div>
      )}
    </div>
  );

  const renderFastingPeriods = () => (
    <div className="space-y-4">
      <div className={`rounded-lg shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <h3 className={`mb-4 font-semibold ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
          Vastenperiodes
        </h3>
        <div className="space-y-4">
          {FASTING_PERIODS.map((fp, index) => (
            <div 
              key={fp.id} 
              className={`p-4 rounded-lg border transition-colors ${
                isDarkMode ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <Salad className={`size-5 mt-0.5 flex-shrink-0 ${getFastingPeriodColor(index)}`} />
                <div className="flex-1 min-w-0">
                  <p className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {fp.name}
                  </p>
                  {fp.description && (
                    <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {fp.description}
                    </p>
                  )}
                  {fp.durationDays && (
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                      📅 Duur: {fp.durationDays} dagen
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Fasting Info */}
      <div className={`rounded-lg shadow-sm border p-4 ${isDarkMode ? 'bg-purple-900/30 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
        <h4 className={`mb-2 font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>
          📖 Wekelijks Vasten
        </h4>
        <p className={`text-sm ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
          Elke woensdag en vrijdag zijn vastendagen (behalve tijdens Paastijd en bepaalde feestperiodes).
        </p>
      </div>

      {/* Fasting Guidelines */}
      <div className={`rounded-lg shadow-sm border p-4 ${isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
        <h4 className={`mb-2 font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
          ⚖️ Vasten Richtlijnen
        </h4>
        <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
          <li>• Geen dierlijke producten (vlees, zuivel, eieren)</li>
          <li>• Geen vis (behalve op bepaalde feestdagen)</li>
          <li>• Alcohol wordt vermeden</li>
          <li>• Focus op gebed en aalmoezen geven</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col relative ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-amber-50 to-white'}`}>
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={backgroundStyle}
      />

      {/* Header */}
      <div className={`border-b shadow-sm sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className={`h-12 w-12 p-0 ${isDarkMode ? 'text-white hover:bg-gray-700' : ''}`}
              aria-label="Terug naar home"
            >
              <Home className="size-6" />
            </Button>
            
            <div className="text-center flex-1 mx-4">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                Koptische Kalender
              </h2>
              <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedYear}
              </p>
            </div>

            <div className="w-12" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 relative z-10">
        <div className="px-4 py-6 max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full grid-cols-3 mb-6 ${isDarkMode ? 'bg-gray-800' : ''}`}>
              <TabsTrigger 
                value="saints" 
                className={`flex items-center ${isDarkMode ? 'data-[state=active]:bg-gray-700' : ''}`}
              >
                <Cross className="size-4 mr-2" />
                Heiligen
              </TabsTrigger>
              <TabsTrigger 
                value="feasts" 
                className={`flex items-center ${isDarkMode ? 'data-[state=active]:bg-gray-700' : ''}`}
              >
                <Church className="size-4 mr-2" />
                Feesten
              </TabsTrigger>
              <TabsTrigger 
                value="fasting" 
                className={`flex items-center ${isDarkMode ? 'data-[state=active]:bg-gray-700' : ''}`}
              >
                <Salad className="size-4 mr-2" />
                Vasten
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saints" className="m-0">
              {renderSaintsList()}
            </TabsContent>

            <TabsContent value="feasts" className="m-0">
              {renderFeastsList()}
            </TabsContent>

            <TabsContent value="fasting" className="m-0">
              {renderFastingPeriods()}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}