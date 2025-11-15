App.tsx

import { useCallback, useMemo, useState } from "react";

// Components
import { Button } from "./components/ui/button";
import { PrayerReader } from "./components/PrayerReader";
import { PWATools } from "./components/PWATools";
import { CalendarView } from "./components/CalendarView";
import { CalendarToday } from "./components/CalendarToday";
import { CalendarFull } from "./components/CalendarFull";
import { CopticCalendar } from "./components/CopticCalendar";
import { HourCard } from "./components/HourCard";
import { InstallPrompt } from "./components/InstallPrompt";
import { Toaster } from "./components/ui/sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";
import { Sun, Moon, Info } from "lucide-react";

// Data
import { agpeyaHours, PrayerHour } from "./data/prayers-new";
import { agpeyaInfo } from "./data/agpeya-info";

// Styles
import "./styles/globals.css";

// Images
import bisdomLogo from "./imports/bisdom-logo";
import copticCross from "./imports/coptic-cross";

export default function App() {
  /* -------------------------------------------------------------
   * THEME (LIGHT / DARK)
   * ----------------------------------------------------------- */
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("agpeya-theme") === "dark";
  });

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("agpeya-theme", next ? "dark" : "light");
      }
      return next;
    });
  }, []);


  /* -------------------------------------------------------------
   * VIEW CONTROLLER (so no router needed)
   * ----------------------------------------------------------- */
  const [activeView, setActiveView] = useState<
    "HOME" | "PWA" | "TODAY" | "FULLCAL" | "CALVIEW" | "PRAYER"
  >("HOME");

  const [selectedHour, setSelectedHour] = useState<PrayerHour | null>(null);

  const openPrayer = (hour: PrayerHour) => {
    setSelectedHour(hour);
    setActiveView("PRAYER");
  };


  /* -------------------------------------------------------------
   * PREPARED HOURS (memo to avoid rerenders)
   * ----------------------------------------------------------- */
  const hours = useMemo(() => agpeyaHours, []);


  /* -------------------------------------------------------------
   * RENDER SWITCH (all views centralized here)
   * ----------------------------------------------------------- */
  const renderView = () => {
    switch (activeView) {
      case "PWA":
        return (
          <PWATools
            onBack={() => setActiveView("HOME")}
            isDarkMode={isDarkMode}
          />
        );

      case "TODAY":
        return (
          <CalendarToday
            isDarkMode={isDarkMode}
            onBack={() => setActiveView("HOME")}
            onNavigateToFullCalendar={() => setActiveView("FULLCAL")}
          />
        );

      case "FULLCAL":
        return (
          <CalendarFull
            isDarkMode={isDarkMode}
            onBack={() => setActiveView("TODAY")}
          />
        );

      case "CALVIEW":
        return (
          <CalendarView
            isDarkMode={isDarkMode}
            onClose={() => setActiveView("HOME")}
          />
        );

      case "PRAYER":
        return (
          selectedHour && (
            <PrayerReader
              hour={selectedHour}
              allHours={hours}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              onBack={() => setActiveView("HOME")}
              onNavigateToHour={(h) => setSelectedHour(h)}
              onOpenPWATools={() => setActiveView("PWA")}
            />
          )
        );

      default:
        return renderHome();
    }
  };


  /* -------------------------------------------------------------
   * HOME SCREEN
   * ----------------------------------------------------------- */
  const renderHome = () => (
    <div
      className={`min-h-screen relative ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-800"
          : "bg-gradient-to-b from-amber-50 to-white"
      }`}
    >
      <Toaster />
      <InstallPrompt />

      {/* Subtle Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url(${copticCross})`,
          backgroundRepeat: "repeat",
          backgroundSize: "1.5cm 1.5cm",
          zIndex: 0,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* HEADER */}
        <header
          className={`border-b shadow-sm ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
          }`}
        >
          <div className="px-3 py-4 text-center relative">
            <div className="flex items-center justify-center gap-3">
              <img src={copticCross} alt="Koptisch Kruis" className="size-12" />

              <h1
                className={`text-3xl ${
                  isDarkMode ? "text-amber-400" : "text-amber-800"
                }`}
                style={{
                  fontFamily: "Cinzel, serif",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                  fontFeatureSettings: '"liga" 1, "dlig" 1',
                }}
              >
                AGPEYA
              </h1>

              <img src={copticCross} alt="Koptisch Kruis" className="size-12" />
            </div>

            <p
              className={`mt-1 tracking-wider text-[0.65rem] ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              KOPTISCH-ORTHODOX BISDOM NEDERLAND
            </p>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="absolute top-2 right-2 size-10"
            >
              {isDarkMode ? (
                <Sun className="size-6 text-gray-200" />
              ) : (
                <Moon className="size-6" />
              )}
            </Button>
          </div>
        </header>

        {/* COPTIC CALENDAR */}
        <div className="px-3 pt-3">
          <CopticCalendar
            isDarkMode={isDarkMode}
            onOpenCalendar={() => setActiveView("CALVIEW")}
          />
        </div>

        {/* HOURS GRID */}
        <div className="px-3 py-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-3">
            {hours.map((hour) => (
              <HourCard
                key={hour.id}
                name={hour.name}
                copticName={hour.copticName}
                time={hour.time}
                description={hour.description}
                onClick={() => openPrayer(hour)}
                isDarkMode={isDarkMode}
              />
            ))}

            {/* Diocese logo */}
            <div className="p-3 flex items-center justify-center">
              <img
                src={bisdomLogo}
                alt="Koptisch-Orthodox Bisdom Nederland"
                style={{
                  width: "2cm",
                  height: "2cm",
                  objectFit: "contain",
                  filter: isDarkMode
                    ? "drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
                    : "drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
                }}
              />
            </div>
          </div>

          {/* ABOUT */}
          <AboutSection isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );


  /* -------------------------------------------------------------
   * MAIN RETURN
   * ----------------------------------------------------------- */
  return renderView();
}


/* -------------------------------------------------------------
 * REUSABLE: About Section
 * ----------------------------------------------------------- */
function AboutSection({ isDarkMode }: { isDarkMode: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={`w-full h-10 p-2 rounded-lg border shadow-sm flex items-center justify-between ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-2">
            <Info
              className={`size-4 ${
                isDarkMode ? "text-amber-500" : "text-amber-700"
              }`}
            />
            <span
              className={`text-sm ${
                isDarkMode ? "text-amber-400" : "text-amber-800"
              }`}
            >
              Over de Agpeya
            </span>
          </div>
          <span
            className={`text-xs ${
              isDarkMode ? "text-amber-500" : "text-amber-600"
            }`}
          >
            {open ? "−" : "+"}
          </span>
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div
          className={`mt-2 p-3 rounded-lg border shadow-sm ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
          }`}
        >
          <p
            className={`mb-3 text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {agpeyaInfo.introduction}
          </p>

          <div className="space-y-2 text-xs">
            {agpeyaInfo.sections.map((section, i) => (
              <div key={i}>
                <p
                  className={`mb-1 ${
                    isDarkMode ? "text-amber-400" : "text-amber-700"
                  }`}
                >
                  {section.title}
                </p>

                <div
                  className={`pl-4 space-y-0.5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {section.content.split("\n").map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}