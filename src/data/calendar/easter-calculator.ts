// Berekening van Pasen volgens Oosterse (Koptische) traditie
// Gebruikt de Juliaanse kalender berekening

export function calculateEasternOrthodox(year: number): Date {
  // Meeus/Jones/Butcher algoritme voor Oosters-Orthodox Pasen
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  
  // Converteer Juliaanse naar Gregoriaanse datum
  const julianDate = new Date(year, month - 1, day);
  
  // In de 21e eeuw is het verschil 13 dagen
  const gregorianDate = new Date(julianDate);
  gregorianDate.setDate(gregorianDate.getDate() + 13);
  
  return gregorianDate;
}

// Bereken datum gebaseerd op offset van Pasen
export function getDateFromEasterOffset(year: number, offsetDays: number): Date {
  const easter = calculateEasternOrthodox(year);
  const resultDate = new Date(easter);
  resultDate.setDate(resultDate.getDate() + offsetDays);
  return resultDate;
}

// Belangrijke bewegelijke data voor dit jaar
export function getMovableDates(year: number) {
  const easter = calculateEasternOrthodox(year);
  
  return {
    jonahFastStart: getDateFromEasterOffset(year, -58),
    jonahFastEnd: getDateFromEasterOffset(year, -56),
    greatLentStart: getDateFromEasterOffset(year, -55),
    palmSunday: getDateFromEasterOffset(year, -7),
    holyThursday: getDateFromEasterOffset(year, -3),
    goodFriday: getDateFromEasterOffset(year, -2),
    holySaturday: getDateFromEasterOffset(year, -1),
    easter: easter,
    easterMonday: getDateFromEasterOffset(year, 1),
    thomasSunday: getDateFromEasterOffset(year, 7),
    ascension: getDateFromEasterOffset(year, 40),
    pentecost: getDateFromEasterOffset(year, 50),
    apostlesFastStart: getDateFromEasterOffset(year, 51),
  };
}