import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

// SVG path from public folder
const copticCross = "/images/coptic-cross-simple.svg";

interface IconGeneratorProps {
  size: number;
  onGenerated?: (blob: Blob) => void;
}

function IconCanvas({ size, onGenerated }: IconGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = copticCross;

    img.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Gradient achtergrond (amber/goud)
      const gradient = ctx.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, '#fbbf24');    // amber-400
      gradient.addColorStop(1, '#b45309');    // amber-700
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // Border (subtiel donkerder)
      ctx.strokeStyle = '#92400e'; // amber-800
      ctx.lineWidth = size * 0.02;
      ctx.strokeRect(0, 0, size, size);

      // Teken het kruis (gecentreerd met padding)
      const padding = size * 0.15; // 15% padding
      const crossSize = size - (padding * 2);
      const x = padding;
      const y = padding;

      // Shadow voor diepte
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = size * 0.02;
      ctx.shadowOffsetX = size * 0.01;
      ctx.shadowOffsetY = size * 0.01;

      ctx.drawImage(img, x, y, crossSize, crossSize);

      // Reset shadow
      ctx.shadowColor = 'transparent';

      setImageLoaded(true);

      // Genereer blob voor download
      canvas.toBlob((blob) => {
        if (blob && onGenerated) {
          onGenerated(blob);
        }
      }, 'image/png');
    };

    img.onerror = () => {
      console.error('Fout bij laden van het kruis');
      // Fallback: teken alleen achtergrond met tekst
      const gradient = ctx.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, '#fbbf24');
      gradient.addColorStop(1, '#b45309');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      ctx.fillStyle = '#fff';
      ctx.font = `${size * 0.15}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Agpeya', size / 2, size / 2);

      setImageLoaded(true);
    };
  }, [size, onGenerated]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="border-2 border-amber-300 rounded-lg shadow-lg"
      style={{ width: '150px', height: '150px' }}
    />
  );
}

export function AppIconGenerator() {
  const [icon192Blob, setIcon192Blob] = useState<Blob | null>(null);
  const [icon512Blob, setIcon512Blob] = useState<Blob | null>(null);

  const downloadIcon = (blob: Blob | null, filename: string) => {
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    if (icon192Blob) downloadIcon(icon192Blob, 'icon-192.png');
    setTimeout(() => {
      if (icon512Blob) downloadIcon(icon512Blob, 'icon-512.png');
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-200">
      <h2 className="text-2xl text-amber-800 mb-4" style={{ fontFamily: 'Algerian' }}>📱 App Icons Generator</h2>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4">
          De app icons worden automatisch gegenereerd met het Koptisch kruis op een gouden achtergrond.
          Download beide bestanden en plaats ze in de <code className="bg-gray-100 px-1 rounded">/public/</code> map.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 192x192 Icon */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-700">Icon 192x192</h3>
            <Button
              onClick={() => downloadIcon(icon192Blob, 'icon-192.png')}
              size="sm"
              disabled={!icon192Blob}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Download className="size-4 mr-2" />
              Download
            </Button>
          </div>
          <IconCanvas size={192} onGenerated={setIcon192Blob} />
          <p className="text-xs text-gray-500">Voor home screen & app lijst</p>
        </div>

        {/* 512x512 Icon */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-700">Icon 512x512</h3>
            <Button
              onClick={() => downloadIcon(icon512Blob, 'icon-512.png')}
              size="sm"
              disabled={!icon512Blob}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Download className="size-4 mr-2" />
              Download
            </Button>
          </div>
          <IconCanvas size={512} onGenerated={setIcon512Blob} />
          <p className="text-xs text-gray-500">Voor splash screen & high-res</p>
        </div>
      </div>

      <div className="flex justify-center pt-4 border-t border-amber-200">
        <Button
          onClick={downloadAll}
          disabled={!icon192Blob || !icon512Blob}
          className="bg-amber-700 hover:bg-amber-800"
        >
          <Download className="size-5 mr-2" />
          Download Beide Icons
        </Button>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h4 className="text-sm text-amber-800 mb-2">📝 Installatie Instructies:</h4>
        <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
          <li>Download beide icons (192x192 en 512x512)</li>
          <li>Hernoem ze naar <code>icon-192.png</code> en <code>icon-512.png</code></li>
          <li>Plaats ze in de <code>/public/</code> map van je project</li>
          <li>Build je app opnieuw: <code>npm run build</code></li>
          <li>Deploy naar je hosting platform</li>
          <li>Test de installatie op je telefoon! 📱</li>
        </ol>
      </div>
    </div>
  );
}