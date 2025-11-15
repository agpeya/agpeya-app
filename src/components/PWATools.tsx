import { useState, useMemo } from "react";
import { AppIconGenerator } from "./AppIconGenerator";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { Button } from "./ui/button";
import { ArrowLeft, Wrench, Download, Smartphone, Code, Upload, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface PWAToolsProps {
  onBack: () => void;
  isDarkMode: boolean;
}

interface DeploymentStep {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  code?: string;
  link?: {
    url: string;
    text: string;
  };
}

export function PWATools({ onBack, isDarkMode }: PWAToolsProps) {
  const [activeTab, setActiveTab] = useState("icons");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStepCompletion = (step: number) => {
    setCompletedSteps(prev => 
      prev.includes(step) 
        ? prev.filter(s => s !== step)
        : [...prev, step]
    );
  };

  // Deployment steps data
  const deploymentSteps: DeploymentStep[] = useMemo(() => [
    {
      step: 1,
      title: "Download de App Icons",
      description: "Gebruik het 'App Icons' tabblad om beide icons te downloaden (192px en 512px). Plaats ze in de public map van je project.",
      icon: <Download className="size-5" />,
      code: "📁 Plaats in: /public/icons/"
    },
    {
      step: 2,
      title: "Build je App",
      description: "Open je terminal en run het build commando om je app voor te bereiden voor deployment.",
      icon: <Code className="size-5" />,
      code: "npm run build"
    },
    {
      step: 3,
      title: "Deploy naar Netlify",
      description: "Upload je gebouwde app naar Netlify voor gratis hosting met PWA ondersteuning.",
      icon: <Upload className="size-5" />,
      link: {
        url: "https://app.netlify.com/drop",
        text: "netlify.com/drop"
      }
    },
    {
      step: 4,
      title: "Maak een QR Code",
      description: "Gebruik het 'QR Code' tabblad om een scanbare QR code te maken met je app URL voor delen.",
      icon: <Wrench className="size-5" />
    },
    {
      step: 5,
      title: "Test de Installatie",
      description: "Open de app op verschillende apparaten en test de PWA installatie functionaliteit.",
      icon: <Smartphone className="size-5" />
    }
  ], []);

  // Tab configurations
  const tabs = [
    { value: "icons", label: "App Icons", component: <AppIconGenerator /> },
    { value: "qr", label: "QR Code", component: <QRCodeGenerator /> }
  ];

  const headerBackground = isDarkMode 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white";
  
  const cardBackground = isDarkMode 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white border-amber-200";
  
  const accentColor = isDarkMode ? "text-amber-400" : "text-amber-700";
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-600";
  const secondaryTextColor = isDarkMode ? "text-gray-400" : "text-gray-500";

  const renderDeploymentStep = (step: DeploymentStep) => {
    const isCompleted = completedSteps.includes(step.step);
    
    return (
      <div 
        key={step.step}
        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
          isCompleted
            ? isDarkMode 
              ? "bg-green-900/20 border-green-700" 
              : "bg-green-50 border-green-300"
            : isDarkMode 
              ? "bg-gray-700 border-gray-600 hover:border-amber-500" 
              : "bg-amber-50 border-amber-200 hover:border-amber-400"
        }`}
        onClick={() => toggleStepCompletion(step.step)}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg flex-shrink-0 ${
            isCompleted
              ? isDarkMode ? "bg-green-800" : "bg-green-100"
              : isDarkMode ? "bg-gray-600" : "bg-amber-100"
          }`}>
            {isCompleted ? (
              <CheckCircle className={`size-5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
            ) : (
              <div className={isDarkMode ? "text-amber-400" : "text-amber-600"}>
                {step.icon}
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className={`font-semibold ${isCompleted ? (isDarkMode ? "text-green-400" : "text-green-700") : accentColor}`}>
                {step.step}️⃣ {step.title}
              </h4>
              {isCompleted && (
                <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                  isDarkMode ? "bg-green-800 text-green-300" : "bg-green-100 text-green-700"
                }`}>
                  Voltooid
                </span>
              )}
            </div>
            
            <p className={`text-sm mb-2 ${textColor}`}>
              {step.description}
            </p>
            
            {step.code && (
              <code className={`block text-sm p-2 rounded mb-2 ${
                isDarkMode ? "bg-gray-900 text-green-400" : "bg-gray-900 text-green-400"
              }`}>
                {step.code}
              </code>
            )}
            
            {step.link && (
              <a 
                href={step.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center text-sm ${
                  isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
                } underline`}
                onClick={(e) => e.stopPropagation()}
              >
                🔗 {step.link.text}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-amber-50 to-white'}`}>
      {/* Header */}
      <div className={`border-b shadow-sm sticky top-0 z-10 ${headerBackground}`}>
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="flex-shrink-0"
              aria-label="Terug naar vorige pagina"
            >
              <ArrowLeft className="size-6" />
            </Button>
            
            <div className="text-center flex-1 mr-12">
              <div className="flex items-center gap-2 justify-center">
                <Wrench className={`size-6 ${accentColor}`} />
                <h1 className={`text-xl ${accentColor}`} style={{ fontFamily: 'Algerian' }}>
                  PWA Tools
                </h1>
              </div>
              <p 
                className={`tracking-wider ${secondaryTextColor} whitespace-nowrap`} 
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem' }}
              >
                KOPTISCH-ORTHODOX BISDOM NEDERLAND
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20 max-w-4xl mx-auto">
        {/* Introduction */}
        <div className="mb-6">
          <p className={`text-sm ${textColor} mb-2`}>
            Hulpmiddelen om je Agpeya app te deployen als Progressive Web App.
          </p>
          <div className={`text-xs px-3 py-2 rounded-lg ${
            isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-700"
          }`}>
            💡 <strong>Tip:</strong> Volg de stappen hieronder om je app succesvol te deployen en te delen.
          </div>
        </div>

        {/* Tools Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className="space-y-4 m-0">
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>

        {/* Deployment Steps */}
        <div className={`p-6 rounded-lg shadow-lg border-2 ${cardBackground}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl ${accentColor}`} style={{ fontFamily: 'Algerian' }}>
              🚀 Deployment Checklist
            </h3>
            
            <div className={`text-sm px-3 py-1 rounded-full ${
              isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
            }`}>
              {completedSteps.length} / {deploymentSteps.length} voltooid
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            {deploymentSteps.map(renderDeploymentStep)}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className={textColor}>Voortgang</span>
              <span className={textColor}>
                {Math.round((completedSteps.length / deploymentSteps.length) * 100)}%
              </span>
            </div>
            <div className={`w-full rounded-full h-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  isDarkMode ? "bg-green-500" : "bg-green-600"
                }`}
                style={{ width: `${(completedSteps.length / deploymentSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Additional Resources */}
          <div className={`p-4 rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-600' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
              📚 Handige Documentatie
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className={`p-2 rounded ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-blue-100"
              } transition-colors`}>
                <code className={`block font-mono ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                  INSTALLATIE-INSTRUCTIES.md
                </code>
                <span className={textColor}>Voor je gebruikers</span>
              </div>
              <div className={`p-2 rounded ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-blue-100"
              } transition-colors`}>
                <code className={`block font-mono ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                  DEPLOYMENT.md
                </code>
                <span className={textColor}>Deployment handleiding</span>
              </div>
              <div className={`p-2 rounded ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-blue-100"
              } transition-colors`}>
                <code className={`block font-mono ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                  PWA-SETUP.md
                </code>
                <span className={textColor}>Technische details</span>
              </div>
              <div className={`p-2 rounded ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-blue-100"
              } transition-colors`}>
                <code className={`block font-mono ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                  TROUBLESHOOTING.md
                </code>
                <span className={textColor}>Probleemoplossing</span>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className={`mt-4 p-3 rounded-lg ${
            isDarkMode ? "bg-amber-900/20 border border-amber-800" : "bg-amber-50 border border-amber-200"
          }`}>
            <h5 className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-amber-400" : "text-amber-700"}`}>
              💡 Snelle Tips
            </h5>
            <ul className={`text-xs space-y-1 ${textColor}`}>
              <li>• Zorg dat je <code className="px-1 rounded bg-black/20">manifest.json</code> correct is geconfigureerd</li>
              <li>• Test op zowel iOS als Android apparaten</li>
              <li>• Gebruik HTTPS voor PWA functionaliteiten</li>
              <li>• Controleer de console voor errors tijdens installatie</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}