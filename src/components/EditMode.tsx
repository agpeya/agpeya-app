import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "./ui/button";
import { X, GripVertical, Plus, Minus } from "lucide-react";
import { PrayerHour } from "../data/prayers-new";

interface ButtonConfig {
  id: string;
  type: "hour" | "special";
  order: number;
  size: "small" | "medium" | "large";
  enabled: boolean;
  data?: PrayerHour | { name: string; action: string };
}

interface DraggableButtonProps {
  config: ButtonConfig;
  index: number;
  moveButton: (fromIndex: number, toIndex: number) => void;
  onSizeChange: (id: string, size: "small" | "medium" | "large") => void;
  isDarkMode: boolean;
}

const DraggableButton = ({ config, index, moveButton, onSizeChange, isDarkMode }: DraggableButtonProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "button",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "button",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveButton(item.index, index);
        item.index = index;
      }
    },
  });

  const getSizeClass = () => {
    switch (config.size) {
      case "small": return "h-12";
      case "medium": return "h-16";
      case "large": return "h-20";
      default: return "h-16";
    }
  };

  const getName = () => {
    if (config.type === "hour") {
      return (config.data as PrayerHour)?.name || "";
    }
    return (config.data as { name: string })?.name || "";
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative border-2 border-dashed rounded-lg transition-all ${
        isDragging ? "opacity-50" : "opacity-100"
      } ${isDarkMode ? "border-amber-600 bg-gray-800" : "border-amber-400 bg-white"}`}
      style={{ cursor: "move" }}
    >
      <div className={`${getSizeClass()} flex items-center justify-between px-3 py-2`}>
        <div className="flex items-center gap-2">
          <GripVertical className={`size-5 ${isDarkMode ? "text-amber-500" : "text-amber-700"}`} />
          <span className={`${isDarkMode ? "text-amber-300" : "text-amber-800"}`}>{getName()}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onSizeChange(config.id, config.size === "small" ? "small" : config.size === "medium" ? "small" : "medium")}
          >
            <Minus className="size-4" />
          </Button>
          <span className={`text-xs px-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {config.size === "small" ? "S" : config.size === "medium" ? "M" : "L"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onSizeChange(config.id, config.size === "large" ? "large" : config.size === "medium" ? "large" : "medium")}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface EditModeProps {
  buttons: ButtonConfig[];
  onSave: (buttons: ButtonConfig[]) => void;
  onCancel: () => void;
  isDarkMode: boolean;
}

export function EditMode({ buttons, onSave, onCancel, isDarkMode }: EditModeProps) {
  const [editableButtons, setEditableButtons] = useState(buttons);

  const moveButton = (fromIndex: number, toIndex: number) => {
    const updated = [...editableButtons];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    
    // Update order
    const reordered = updated.map((btn, idx) => ({
      ...btn,
      order: idx,
    }));
    
    setEditableButtons(reordered);
  };

  const handleSizeChange = (id: string, size: "small" | "medium" | "large") => {
    setEditableButtons(prev =>
      prev.map(btn => btn.id === id ? { ...btn, size } : btn)
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-amber-50 to-white'}`}>
        <div className="max-w-4xl mx-auto p-4">
          {/* Header */}
          <div className={`border-b shadow-sm mb-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-xl ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
                Knoppen aanpassen
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => onSave(editableButtons)}
                  className={`${isDarkMode ? 'bg-amber-700 hover:bg-amber-600 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white'}`}
                >
                  Opslaan
                </Button>
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}
                >
                  <X className="size-4 mr-2" />
                  Annuleren
                </Button>
              </div>
            </div>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sleep knoppen om de volgorde te wijzigen. Gebruik + en - om de grootte aan te passen.
            </p>
          </div>

          {/* Draggable Buttons */}
          <div className="space-y-2">
            {editableButtons.map((config, index) => (
              <DraggableButton
                key={config.id}
                config={config}
                index={index}
                moveButton={moveButton}
                onSizeChange={handleSizeChange}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export type { ButtonConfig };
