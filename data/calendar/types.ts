// Koptische Kalender Types

export interface Saint {
  id: string;
  name: string;
  description?: string;
  day: number;
  month: number; // 1-12 (Gregoriaanse maand)
}

export interface Feast {
  id: string;
  name: string;
  type: 'major' | 'minor' | 'lord';
  description?: string;
  day: number;
  month: number; // 1-12 (Gregoriaanse maand)
  isMoveable?: boolean; // Voor bewegelijke feestdagen gebaseerd op Pasen
  offsetFromEaster?: number; // Dagen vanaf Pasen (+ of -)
}

export interface FastingPeriod {
  id: string;
  name: string;
  description?: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  isMoveable?: boolean;
  offsetFromEaster?: number; // Voor start datum
  durationDays?: number; // Aantal dagen
}

export interface CalendarDay {
  date: Date;
  saints: Saint[];
  feasts: Feast[];
  fastingPeriods: FastingPeriod[];
  isFastDay: boolean;
}
