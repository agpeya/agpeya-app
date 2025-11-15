import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Minus, Plus, Sun, Moon, Menu, Home, List, Settings, Wrench, Edit3 } from "lucide-react";
import { useSwipe } from "../hooks/useSwipe";
import { PrayerHour, Prayer } from "../data/prayers-new";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import copticCross from "../imports/coptic-cross";

// Constants voor betere onderhoudbaarheid
const COPTIC_TERMS = [
  'Ⲁⲙⲏⲛ',
  'Ⲭⲉⲣⲉ',
  'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ'
];

const BOLD_TERMS = [
  'Genade en vrede zij u',
  'Vrede zij met u allen',
  'Met uw geest',
  'En met uw geest',
  'Amen',
  'Alleluia',
  'Kyrie eleison',
  'Heer, ontferm U',
  'Heilig, heilig, heilig',
  'Onze Vader',
  'In de Naam van de Vader',
  'Glorie zij aan de Vader'
];

const FONT_OPTIONS = [
  { name: 'PT Serif', value: 'PT Serif' },
  { name: 'Inter', value: 'Inter' },
  { name: 'Georgia', value: 'Georgia' },
  { name: 'Times New Roman', value: 'Times New Roman' }
] as const;

const FONT_SIZE_RANGE = { min: 12, max: 28, step: 2 };
const DISMISSAL_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 dagen

interface PrayerReaderProps {
  hour: PrayerHour;
  onBack: () => void;
  allHours: PrayerHour[];
  onNavigateToHour: (hour: PrayerHour) => void;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
  onOpenPWATools?: () => void;
}

export function PrayerReader({ 
  hour, 
  onBack, 
  allHours, 
  onNavigateToHour, 
  isDarkMode = false, 
  toggleTheme, 
  onOpenPWATools 
}: PrayerReaderProps) {
  // State management
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('agpeya-font-size');
    return saved ? Math.max(FONT_SIZE_RANGE.min, Math.min(FONT_SIZE_RANGE.max, parseInt(saved, 10))) : 16;
  });
  
  const [selectedFont, setSelectedFont] = useState(() => {
    const saved = localStorage.getItem('agpeya-font-family');
    return saved || 'PT Serif';
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [customPrayers, setCustomPrayers] = useState<Record<string, Prayer>>({});
  
  // Refs
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Load custom prayers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('agpeya-custom-prayers');
    if (saved) {
      try {
        setCustomPrayers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load custom prayers:', e);
      }
    }
  }, []);

  // Get prayer with custom override if exists
  const getPrayer = useCallback((prayer: Prayer): Prayer => {
    const customKey = `${hour.id}-${prayer.id}`;
    return customPrayers[customKey] || prayer;
  }, [hour.id, customPrayers]);

  // Persist fontSize to localStorage
  useEffect(() => {
    localStorage.setItem('agpeya-font-size', fontSize.toString());
  }, [fontSize]);

  // Persist font family to localStorage
  useEffect(() => {
    localStorage.setItem('agpeya-font-family', selectedFont);
  }, [selectedFont]);

  // Scroll to top when hour changes
  useEffect(() => {
    console.log('🔄 Uur veranderd naar:', hour.id);
    
    const scrollToTop = () => {
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    scrollToTop();
  }, [hour.id]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Swipe handlers
  const handleSwipeRight = useCallback(() => {
    if (!isMenuOpen && !isSettingsOpen && !isTocOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen, isSettingsOpen, isTocOpen]);

  const handleSwipeLeft = useCallback(() => {
    if (!isMenuOpen && !isSettingsOpen && !isTocOpen) {
      setIsTocOpen(true);
    }
  }, [isMenuOpen, isSettingsOpen, isTocOpen]);

  // Swipe functionality
  useSwipe({
    onSwipeRight: handleSwipeRight,
    onSwipeLeft: handleSwipeLeft
  });

  // Format prayer content with bold terms
  const formatPrayerContent = useCallback((content: string): string => {
    let formattedContent = content;
    
    // Apply Coptic terms formatting
    COPTIC_TERMS.forEach(term => {
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedTerm, 'g');
      formattedContent = formattedContent.replace(regex, `<strong>${term}</strong>`);
    });
    
    // Apply bold terms formatting
    BOLD_TERMS.forEach(term => {
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedTerm, 'g');
      formattedContent = formattedContent.replace(regex, `<strong>${term}</strong>`);
    });

    return formattedContent;
  }, []);

  // Format verse content for psalms and gospels
  const formatVerseContent = useCallback((content: string, type: 'psalm' | 'gospel' | 'epistle'): string => {
    const versePattern = /\[(\d+)\]([^\[]+)/g;
    let formattedHtml = '';
    let match;
    let lastIndex = 0;
    
    const hasVerseMarkers = content.includes('[');
    
    if (!hasVerseMarkers) {
      return formatPrayerContent(content);
    }
    
    while ((match = versePattern.exec(content)) !== null) {
      if (lastIndex === 0 && match.index > 0) {
        const preText = content.substring(0, match.index).trim();
        if (preText) {
          formattedHtml += `<div class="verse-intro mb-4">${formatPrayerContent(preText)}</div>`;
        }
      }
      
      const verseNumber = match[1];
      const verseText = match[2].trim();
      
      formattedHtml += `<div class="verse-line mb-2">
        <sup class="verse-number mr-1">${verseNumber}</sup>
        <span class="verse-text">${formatPrayerContent(verseText)}</span>
      </div>`;
      
      lastIndex = versePattern.lastIndex;
    }
    
    if (lastIndex < content.length) {
      const postText = content.substring(lastIndex).trim();
      if (postText) {
        formattedHtml += `<div class="verse-outro mt-4">${formatPrayerContent(postText)}</div>`;
      }
    }
    
    return formattedHtml;
  }, [formatPrayerContent]);

  // Font size controls
  const increaseFontSize = useCallback(() => {
    setFontSize(prev => Math.min(prev + FONT_SIZE_RANGE.step, FONT_SIZE_RANGE.max));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize(prev => Math.max(prev - FONT_SIZE_RANGE.step, FONT_SIZE_RANGE.min));
  }, []);

  // Scroll to prayer function
  const scrollToPrayer = useCallback((prayerId: string) => {
    console.log('🟢 scrollToPrayer aangeroepen met ID:', prayerId);
    
    const element = document.getElementById(prayerId);
    console.log('🟡 Element gevonden?', element ? 'JA' : 'NEE');
    
    if (element && contentRef.current) {
      console.log('✅ Probeer scroll binnen contentRef...');
      
      const header = document.querySelector('.sticky');
      const headerHeight = header ? header.getBoundingClientRect().height + 32 : 180;
      
      const containerTop = contentRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const relativePosition = elementTop - containerTop;
      const currentScroll = contentRef.current.scrollTop;
      const targetScroll = currentScroll + relativePosition - headerHeight;
      
      console.log(`📏 Header hoogte: ${headerHeight}px`);
      console.log(`📍 Huidige scroll: ${currentScroll}px, Doel: ${targetScroll}px`);
      
      contentRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
      
      console.log('✅ Scroll uitgevoerd met header offset!');
    } else {
      console.log('❌ Element of contentRef niet gevonden!');
    }
  }, []);

  // Handle navigation to prayer from TOC
  const handleTocNavigation = useCallback((prayerId: string) => {
    console.log('🔴 Knop geklikt voor gebed:', prayerId);
    
    setIsTocOpen(false);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      scrollToPrayer(prayerId);
    }, 300);
  }, [scrollToPrayer]);

  // Memoized filtered hours for menu
  const filteredHours = useMemo(() => 
    allHours.filter((h) => h.id !== hour.id),
    [allHours, hour.id]
  );

  // Background pattern style
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${copticCross})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '1.5cm 1.5cm',
    opacity: 0.10,
    zIndex: 0
  }), []);

  // Cross image filter style
  const crossFilterStyle = useMemo(() => ({
    filter: isDarkMode 
      ? 'brightness(1.2) drop-shadow(0 2px 4px rgba(251, 191, 36, 0.5))' 
      : 'drop-shadow(0 2px 4px rgba(180, 83, 9, 0.3))'
  }), [isDarkMode]);

  // Render individual prayer
  const renderPrayer = useCallback((prayer: Prayer, index: number) => {
    const actualPrayer = getPrayer(prayer);
    const shouldUseVerseFormat = actualPrayer.verseFormat || 
                                actualPrayer.type === 'psalm' || 
                                actualPrayer.type === 'gospel';
    
    const formattedContent = shouldUseVerseFormat
      ? formatVerseContent(actualPrayer.content, actualPrayer.type as 'psalm' | 'gospel' | 'epistle' || 'psalm')
      : formatPrayerContent(actualPrayer.content);
    
    return (
      <div key={prayer.id} id={prayer.id} className={index > 0 ? 'mt-8' : ''}>
        <h3 
          className={`mb-4 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`} 
          style={{ 
            fontWeight: 'bold',
            fontSize: `${fontSize}px`
          }}
        >
          {actualPrayer.title}
        </h3>
        <div 
          className={`${shouldUseVerseFormat ? '' : 'whitespace-pre-wrap'} leading-relaxed ${isDarkMode ? 'text-gray-300' : ''}`}
          style={{ 
            fontSize: `${fontSize}px`,
            fontFamily: selectedFont
          }}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      </div>
    );
  }, [getPrayer, formatVerseContent, formatPrayerContent, isDarkMode, fontSize, selectedFont]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-amber-50 to-white'}`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none" style={backgroundStyle} />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className={`border-b shadow-sm sticky top-0 z-20 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              {/* Left Menu Sheet */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-12 w-12 p-0 ${isDarkMode ? 'text-white hover:bg-gray-700' : ''}`}
                    aria-label="Open menu"
                  >
                    <Menu className="size-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <div className="fixed inset-0 pointer-events-none" style={backgroundStyle} />
                  <SheetHeader>
                    <SheetTitle className="flex flex-col items-center gap-2 pt-4">
                      <img 
                        src={copticCross} 
                        alt="Koptisch Kruis" 
                        className="size-16" 
                        style={crossFilterStyle}
                      />
                      <span className={isDarkMode ? 'text-amber-400' : 'text-amber-700'}>Menu</span>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Navigeer tussen gebedsuren
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-12rem)]">
                    <div className="mt-6 space-y-2">
                      <div className="flex gap-2 ml-[0.25cm]">
                        <Button
                          variant="outline"
                          className={`w-[1.5cm] h-[1.5cm] p-0 flex items-center justify-center shadow-md cursor-pointer ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-amber-600 hover:border-amber-500 text-white' : 'bg-white border-amber-300 hover:bg-amber-200 hover:border-amber-500'}`}
                          style={{ opacity: 0.90 }}
                          onClick={() => {
                            setIsMenuOpen(false);
                            onBack();
                          }}
                          aria-label="Terug naar home"
                        >
                          <Home className="size-6" />
                        </Button>
                        <Button
                          variant="outline"
                          className={`w-[1.5cm] h-[1.5cm] p-0 flex items-center justify-center shadow-md cursor-pointer ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-amber-600 hover:border-amber-500 text-white' : 'bg-white border-amber-300 hover:bg-amber-200 hover:border-amber-500'}`}
                          style={{ opacity: 0.90 }}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsSettingsOpen(true);
                          }}
                          aria-label="Open instellingen"
                        >
                          <Settings className="size-6" />
                        </Button>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-[1.5cm] h-[1.5cm] p-0 flex items-center justify-center shadow-md cursor-pointer ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-amber-600 hover:border-amber-500 text-white' : 'bg-white border-amber-300 hover:bg-amber-200 hover:border-amber-500'}`}
                              style={{ opacity: 0.90 }}
                              aria-label="Open tools"
                            >
                              <Wrench className="size-6" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent side="left" className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                            <div className="fixed inset-0 pointer-events-none" style={backgroundStyle} />
                            <SheetHeader>
                              <SheetTitle className="flex flex-col items-center gap-2 pt-4">
                                <Wrench className="size-10" />
                                <span className={isDarkMode ? 'text-amber-400' : 'text-amber-700'}>Tools</span>
                              </SheetTitle>
                              <SheetDescription className="sr-only">
                                App hulpmiddelen
                              </SheetDescription>
                            </SheetHeader>
                            <div className="mt-8 space-y-4">
                              <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  onOpenPWATools?.();
                                }}
                                className={`w-full h-16 ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-amber-600 hover:border-amber-500 text-white' : 'bg-white border-amber-300 hover:bg-amber-200 hover:border-amber-500'}`}
                                style={{ opacity: 0.90 }}
                              >
                                <Wrench className="size-5 mr-2" />
                                PWA Tools
                              </Button>
                              
                              <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                              
                              <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setIsMenuOpen(true)}
                                className={`w-full h-12 ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-amber-600 hover:border-amber-500 text-white' : 'bg-white border-amber-300 hover:bg-amber-200 hover:border-amber-500'}`}
                                style={{ opacity: 0.90 }}
                              >
                                <Menu className="size-5 mr-2" />
                                Terug naar Menu
                              </Button>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                      <div className={`border-t ${isDarkMode ? 'border-white' : 'border-gray-300'}`} />
                      {filteredHours.map((h) => (
                        <Button
                          key={h.id}
                          variant="outline"
                          className={`w-full justify-start h-14 shadow-md text-base cursor-pointer transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-amber-600 hover:border-amber-500 text-white' : 'bg-white border-amber-300 hover:bg-amber-200 hover:border-amber-500'}`}
                          style={{ opacity: 0.90 }}
                          onClick={() => {
                            setIsMenuOpen(false);
                            onNavigateToHour(h);
                          }}
                        >
                          {h.name}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              
              {/* Title Section */}
              <div className="text-center flex-1 mx-4">
                {hour.copticName && (
                  <h2 className={`text-2xl ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`} style={{ fontFamily: 'Algerian' }}>
                    {hour.copticName}
                  </h2>
                )}
                <p className={`tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} whitespace-nowrap`} 
                   style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem' }}>
                  KOPTISCH-ORTHODOX BISDOM NEDERLAND
                </p>
              </div>
              
              {/* Right TOC Sheet */}
              <Sheet open={isTocOpen} onOpenChange={setIsTocOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-12 w-12 p-0 ${isDarkMode ? 'text-white hover:bg-gray-700' : ''}`}
                    aria-label="Open inhoudsopgave"
                  >
                    <List className="size-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <div className="fixed inset-0 pointer-events-none" style={backgroundStyle} />
                  <SheetHeader>
                    <SheetTitle className="flex flex-col items-center gap-2 pt-4">
                      <img 
                        src={copticCross} 
                        alt="Koptisch Kruis" 
                        className="size-16"
                        style={crossFilterStyle}
                      />
                      <span className={isDarkMode ? 'text-amber-400' : 'text-amber-700'}>Inhoud</span>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Inhoudsopgave van gebeden
                    </SheetDescription>
                  </SheetHeader>
                  <div className="h-[calc(100vh-10rem)] mt-4 overflow-y-auto">
                    <div className="space-y-0 pr-4">
                      {hour.prayers.map((prayer, index) => {
                        const actualPrayer = getPrayer(prayer);
                        return (
                          <button
                            key={prayer.id}
                            type="button"
                            className={`w-full py-3 px-3 cursor-pointer rounded border mb-2 hover:bg-opacity-80 transition-colors text-left ${isDarkMode ? 'border-gray-600 hover:bg-gray-600 hover:border-amber-500 text-white' : 'border-amber-200 hover:bg-amber-100 hover:border-amber-400'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTocNavigation(prayer.id);
                            }}
                            aria-label={`Ga naar ${actualPrayer.title}`}
                          >
                            <span className="text-base" style={{ fontWeight: 'normal' }}>
                              <span className={`${isDarkMode ? 'text-amber-400' : 'text-amber-600'} mr-2`}>
                                {index + 1}.
                              </span>
                              {actualPrayer.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Settings Sheet */}
        <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <SheetContent side="left" className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <div className="fixed inset-0 pointer-events-none" style={backgroundStyle} />
            <SheetHeader>
              <SheetTitle className="flex flex-col items-center gap-2 pt-4">
                <Settings 
                  className="size-12" 
                  style={crossFilterStyle}
                />
                <span className={isDarkMode ? 'text-amber-400' : 'text-amber-700'}>Instellingen</span>
              </SheetTitle>
              <SheetDescription className="sr-only">
                App instellingen
              </SheetDescription>
            </SheetHeader>
            <div className="mt-8 space-y-8">
              {/* Back to Menu */}
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    setIsSettingsOpen(false);
                    setIsMenuOpen(true);
                  }} 
                  className={`w-full h-12 cursor-pointer ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-amber-600 hover:border-amber-500 text-white' : 'bg-white border-amber-300 hover:bg-amber-200 hover:border-amber-500'}`}
                  style={{ opacity: 0.90 }}
                >
                  <Menu className="size-5 mr-2" />
                  Terug naar Menu
                </Button>
              </div>
              
              <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
              
              {/* Font Size */}
              <div className="text-center">
                <h3 className={`mb-3 text-sm ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>Tekstgrootte</h3>
                <div className="flex items-center gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={decreaseFontSize} 
                    disabled={fontSize <= FONT_SIZE_RANGE.min}
                    className={`h-12 w-12 p-0 cursor-pointer ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-amber-600 hover:border-amber-500 text-white' : 'bg-white border-amber-300 hover:bg-amber-200 hover:border-amber-500'}`}
                    style={{ opacity: 0.90 }}
                    aria-label="Verklein tekst"
                  >
                    <Minus className="size-5" />
                  </Button>
                  <span className={`text-lg w-20 text-center ${isDarkMode ? 'text-white' : ''}`}>
                    {fontSize}px
                  </span>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={increaseFontSize} 
                    disabled={fontSize >= FONT_SIZE_RANGE.max}
                    className={`h-12 w-12 p-0 cursor-pointer ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-amber-600 hover:border-amber-500 text-white' : 'bg-white border-amber-300 hover:bg-amber-200 hover:border-amber-500'}`}
                    style={{ opacity: 0.90 }}
                    aria-label="Vergroot tekst"
                  >
                    <Plus className="size-5" />
                  </Button>
                </div>
              </div>
              
              <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
              
              {/* Theme Toggle */}
              <div className="text-center">
                <h3 className={`mb-3 text-sm ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>Thema</h3>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={toggleTheme} 
                  className={`w-full h-12 cursor-pointer ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-amber-600 hover:border-amber-500 text-white' : 'bg-white border-amber-300 hover:bg-amber-200 hover:border-amber-500'}`}
                  style={{ opacity: 0.90 }}
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="size-5 mr-2" />
                      Lichte modus
                    </>
                  ) : (
                    <>
                      <Moon className="size-5 mr-2" />
                      Donkere modus
                    </>
                  )}
                </Button>
              </div>
              
              <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
              
              {/* Font Selection */}
              <div className="text-center">
                <h3 className={`mb-3 text-sm ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>Lettertype</h3>
                <div className="space-y-2">
                  {FONT_OPTIONS.map((font) => (
                    <Button 
                      key={font.value}
                      variant={selectedFont === font.value ? 'default' : 'outline'}
                      size="lg"
                      onClick={() => setSelectedFont(font.value)} 
                      className={`w-full h-12 cursor-pointer ${
                        selectedFont === font.value 
                          ? (isDarkMode ? 'bg-amber-600 hover:bg-amber-700 border-amber-500 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white')
                          : (isDarkMode ? 'bg-gray-500 border-gray-400 hover:bg-amber-500 hover:border-amber-400 text-white' : 'hover:bg-amber-100 hover:border-amber-500')
                      }`}
                      style={{ fontFamily: font.value }}
                    >
                      {font.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Content */}
        <div className="flex-1 relative">
          <div ref={contentRef} className="h-screen overflow-y-auto pb-20">
            <div className={`p-4 rounded-lg shadow-sm mx-4 my-4 border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}>
              {hour.prayers.map(renderPrayer)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}