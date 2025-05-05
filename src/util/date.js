export function getLocalTime(date) {
  const localDate = new Date(date);
  const offset = localDate.getTimezoneOffset() * 60000;
  const localTime = new Date(localDate.getTime() - offset);
  return localTime;
};


export function yyyymmddToISO(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day)); // cria como UTC
  return date.toISOString();
};


export function yyyymmddToDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date;
};


export function dateToYYYYMMDD(date) {
  if (!date) {
    return "";
  }
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid Date');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // mês começa do 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};



export function dateToIso(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid Date');
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00Z`;
}



export function compareIsoDates(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);

  const dateOnly1 = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate());
  const dateOnly2 = new Date(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate());

  if (dateOnly1 > dateOnly2) return 1;
  if (dateOnly1 < dateOnly2) return -1;
  return 0;
};


export function compareDatesOnly(date1, date2) {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  if (d1.getTime() > d2.getTime()) return 1;   // date1 > date2
  if (d1.getTime() < d2.getTime()) return -1;  // date1 < date2
  return 0;                                     // date1 == date2
};


export function isOnWeek(date) {
  const inputDate = new Date(date);
  const today = new Date();

  const dateToCompare = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const day2 = new Date(baseDate);
  day2.setDate(day2.getDate() + 2);

  const day7 = new Date(baseDate);
  day7.setDate(day7.getDate() + 7);

  return dateToCompare >= day2 && dateToCompare <= day7;
};


export function isOnMonth(date, monthRef, yearRef, startDate, endDate) {
  const inputDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);

  if ((monthRef < start.getMonth() && yearRef <= start.getFullYear()) ||
    (monthRef > end.getMonth() && yearRef >= end.getFullYear())) {
    return false;
  };

  const monthStart = new Date(yearRef, monthRef, 1);
  const monthEnd = new Date(yearRef, monthRef + 1, 0);

  const visibleStart = start > monthStart ? start : monthStart;
  const visibleEnd = end < monthEnd ? end : monthEnd;

  return inputDate >= visibleStart && inputDate <= visibleEnd;
};


export function getYearMonthNumber(date) {
  return date.getFullYear() * 100 + date.getMonth(); // Ex: 202405 para maio de 2024
};
