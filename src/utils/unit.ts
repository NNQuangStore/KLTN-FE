
export const DATE_FORMAT = 'DD/MM/YYYY';

export const textCapitalize = (text: string, separate: string = ' ') => {
  const strings: String[] = text.split(separate);
  const stringCapitalizes = strings.map(s => s.charAt(0).toUpperCase() + s.slice(1));

  return stringCapitalizes.join(separate);
};