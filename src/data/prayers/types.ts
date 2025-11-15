// Agpeya Gebeden Data Structuur Types

export interface Prayer {
  id: string;
  title: string;
  content: string;
  type?: 'prayer' | 'psalm' | 'gospel'; // Type voor speciale formatting
  verseFormat?: boolean; // Voor vers-gebaseerde layout (HSV stijl)
}

export interface PrayerHour {
  id: string;
  name: string;
  copticName?: string;
  time: string;
  description: string;
  prayers: Prayer[];
  fontFamily?: string; // Optioneel lettertype voor dit uur
}