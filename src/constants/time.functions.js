export function setEmptyHour(dayeTimeObject) {
  return dayeTimeObject.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
}

export function parseISOFormatDate(ISODateString) {
  const date = new Date(ISODateString);
  const fullYear = date.getFullYear();
  const monthNames = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  const monthIndex = date.getMonth();
  const month = monthNames[monthIndex];
  const day = date.getDate();

  return {
    date: day,
    fullYear: fullYear,
    month: month,
  };
}
