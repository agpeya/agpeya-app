import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Download, Share2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function QRCodeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [url, setUrl] = useState("https://jouw-agpeya-app.netlify.app");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  /**
   * Simpele QR generator (demo)
   * Voor productie: gebruik qrcode.js of QRCodeStyling
   */
  const generateQRCode = (text: string, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 400;
    const moduleCount = 25;
    const moduleSize = size / moduleCount;

    canvas.width = size;
    canvas.height = size;

    // Achtergrond
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Hash op basis van URL
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }

    // Positioneringsblokken
    const drawPositionPattern = (x: number, y: number) => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize * 7, moduleSize * 7);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(
        (x + 1) * moduleSize,
        (y + 1) * moduleSize,
        moduleSize * 5,
        moduleSize * 5
      );

      ctx.fillStyle = "#000000";
      ctx.fillRect(
        (x + 2) * moduleSize,
        (y + 2) * moduleSize,
        moduleSize * 3,
        moduleSize * 3
      );
    };

    drawPositionPattern(0, 0);
    drawPositionPattern(moduleCount - 7, 0);
    drawPositionPattern(0, moduleCount - 7);

    // Willekeurig patroon
    ctx.fillStyle = "#000000";
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        const skip =
          (row < 8 && col < 8) ||
          (row < 8 && col >= moduleCount - 8) ||
          (row >= moduleCount - 8 && col < 8);

        if (skip) continue;

        const seed = (row * moduleCount + col + hash) * 2654435761;

        if (seed % 3 === 0) {
          ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    // Timing pattern
    for (let i = 8; i < moduleCount - 8; i++) {
      if (i % 2 === 0) {
        ctx.fillRect(i * moduleSize, 6 * moduleSize, moduleSize, moduleSize);
        ctx.fillRect(6 * moduleSize, i * moduleSize, moduleSize, moduleSize);
      }
    }

    // Branding midden
    const centerSize = moduleSize * 5;
    const centerX = (size - centerSize) / 2;
    const centerY = (size - centerSize) / 2;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(centerX, centerY, centerSize, centerSize);

    ctx.fillStyle = "#b45309";
    ctx.fillRect(centerX + 2, centerY + 2, centerSize - 4, centerSize - 4);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✝", size / 2, size / 2);

    setQrGenerated(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && url) generateQRCode(url, canvas);
  }, [url]);

  const downloadQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const finalCanvas = document.createElement("canvas");
    const ctx = finalCanvas.getContext("2d");
    if (!ctx) return;

    const padding = 60;
    const baseSize = 400;

    finalCanvas.width = baseSize + padding * 2;
    finalCanvas.height = baseSize + padding * 2 + 80;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    ctx.drawImage(canvas, padding, padding);

    ctx.fillStyle = "#92400e";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Agpeya – Koptisch Gebedenboek", finalCanvas.width / 2, 34);

    ctx.fillStyle = "#78716c";
    ctx.font = "16px sans-serif";
    const shortUrl = url.length > 40 ? url.slice(0, 40) + "…" : url;
    ctx.fillText(shortUrl, finalCanvas.width / 2, baseSize + padding + 38);

    ctx.font = "14px sans-serif";
    ctx.fillText("Scan om de app te openen", finalCanvas.width / 2, baseSize + padding + 64);

    finalCanvas.toBlob((blob) => {
      if (!blob) return;

      const dl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = dl;
      a.download = "agpeya-qr-code.png";
      a.click();
      URL.revokeObjectURL(dl);

      toast.success("QR code gedownload!");
    });
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("URL gekopieerd!");

      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Kon URL niet kopiëren.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-200">
      <h2 className="text-2xl text-amber-800 mb-4 font-bold">
        📱 QR Code Generator
      </h2>

      <p className="text-sm text-gray-600 mb-4">
        Genereer een QR code die direct naar je Agpeya app linkt.
      </p>

      {/* URL INPUT */}
      <div className="mb-6 space-y-2">
        <Label htmlFor="app-url" className="text-amber-800">
          App URL
        </Label>

        <div className="flex gap-2">
          <Input
            id="app-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://jouw-agpeya-app.netlify.app"
            className="flex-1 border-amber-300 focus:border-amber-500"
          />

          <Button
            onClick={copyUrl}
            variant="outline"
            size="icon"
            className="border-amber-300"
          >
            {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
          </Button>
        </div>
      </div>

      {/* QR DISPLAY */}
      <div className="flex flex-col items-center mb-6">
        <div className="p-6 rounded-lg border-4 border-amber-300 shadow-xl bg-white">
          <canvas ref={canvasRef} className="w-[300px] h-[300px]" />
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          ⚠️ Dit is een demo QR. Gebruik een echte QR generator voor productie.
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Button
          onClick={downloadQRCode}
          disabled={!qrGenerated}
          className="flex-1 bg-amber-700 hover:bg-amber-800"
        >
          <Download className="size-5 mr-2" />
          Download QR Code
        </Button>

        <Button
          onClick={() =>
            window.open(
              `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
                url
              )}`,
              "_blank"
            )
          }
          variant="outline"
          className="flex-1 border-amber-600 text-amber-700 hover:bg-amber-50"
        >
          <Share2 className="size-5 mr-2" />
          Maak Echte QR Code
        </Button>
      </div>

      {/* TIPS */}
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h4 className="text-sm text-amber-800 mb-3">📋 Waar kun je de QR code gebruiken?</h4>
        <ul className="text-xs text-gray-700 space-y-2">
          <li>⛪ Kerkbulletin</li>
          <li>📱 WhatsApp groepen</li>
          <li>📄 Flyers / posters</li>
          <li>📧 Email handtekeningen</li>
          <li>💬 Social media</li>
        </ul>
      </div>
    </div>
  );
}
