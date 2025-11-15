import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, Download, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Check device and browser type
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsSafari(/safari/.test(userAgent) && !/chrome/.test(userAgent));

    // Check if app is already installed
    const checkStandaloneMode = () => {
      return window.matchMedia('(display-mode: standalone)').matches ||
             (window.navigator as any).standalone === true;
    };

    setIsStandalone(checkStandaloneMode());

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after delay if not dismissed before
      setTimeout(() => {
        const hasSeenPrompt = localStorage.getItem('agpeya-install-prompt-dismissed');
        const shouldShowPrompt = !hasSeenPrompt && !checkStandaloneMode();
        
        if (shouldShowPrompt) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    // For iOS Safari, we need to check if they support PWA installation
    if (!isIOS || !isSafari) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    // Additional check for standalone mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [isIOS, isSafari]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User installed the app');
        // Track installation if needed
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
      // Don't set dismissed in localStorage so they can be prompted again if needed
    } catch (error) {
      console.error('Installation failed:', error);
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember dismissal for 30 days
    localStorage.setItem('agpeya-install-prompt-dismissed', 'true');
    
    // Optional: Set expiration for the dismissal
    const expiration = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days
    localStorage.setItem('agpeya-install-prompt-expiry', expiration.toString());
  };

  // Check if dismissal has expired
  useEffect(() => {
    const expiry = localStorage.getItem('agpeya-install-prompt-expiry');
    if (expiry && Date.now() > parseInt(expiry)) {
      localStorage.removeItem('agpeya-install-prompt-dismissed');
      localStorage.removeItem('agpeya-install-prompt-expiry');
    }
  }, []);

  // iOS Safari installation instructions
  const renderIOSInstructions = () => (
    <div className="mt-2 text-xs text-amber-100">
      <p>Tik op de share button <span className="inline-block mx-1">📤</span> en selecteer &quot;Add to Home Screen&quot;</p>
    </div>
  );

  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom duration-300 sm:left-auto sm:right-4 sm:max-w-sm"
      role="dialog"
      aria-label="App installatie prompt"
    >
      <div className="bg-amber-800 text-white rounded-lg shadow-2xl p-4 border-2 border-amber-600 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 hover:bg-amber-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Prompt sluiten"
        >
          <X className="size-4" />
        </button>
        
        <div className="flex items-start gap-3 pr-8">
          <div className="bg-amber-700 p-2 rounded-lg flex-shrink-0 mt-1">
            <Smartphone className="size-5" aria-hidden="true" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1 text-sm">Installeer Agpeya</h3>
            <p className="text-xs text-amber-100 mb-2 leading-relaxed">
              Installeer de app voor offline toegang en een betere ervaring.
            </p>
            
            {/* Show iOS instructions for Safari */}
            {isIOS && isSafari && renderIOSInstructions()}
            
            <div className="flex gap-2 mt-3">
              {deferredPrompt ? (
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="bg-white text-amber-800 hover:bg-amber-50 flex items-center gap-1.5 font-medium"
                >
                  <Download className="size-3.5" aria-hidden="true" />
                  Installeer Nu
                </Button>
              ) : (
                <Button
                  onClick={handleDismiss}
                  size="sm"
                  variant="outline"
                  className="bg-amber-700 text-white border-amber-600 hover:bg-amber-600 font-medium"
                >
                  Misschien later
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}