import dayjs, { Dayjs } from 'dayjs';


export const DATE_FORMAT = 'DD/MM/YYYY';
export const MESSAGE = {
  _NUMBER_SCORE: 'The score is only within the range of 1 - 10 and has only 2 decimal places.'
};

export const textCapitalize = (text: string, separate: string = ' ') => {
  const strings: String[] = text.split(separate);
  const stringCapitalizes = strings.map(s => s.charAt(0).toUpperCase() + s.slice(1));

  return stringCapitalizes.join(separate);
};

export const checkNumberScore = (value: string | number) => {
  const number = Number(value);
  const decimalTwoNumber = value.toString().split('.');
  const checkDecimalTwoNumber = decimalTwoNumber.length < 2 || decimalTwoNumber.length === 2 && decimalTwoNumber[1].length <= 2;  

  return number >= 0 && number <= 10 && checkDecimalTwoNumber;
};

export const roundNumber = (number: number) => {
  return Math.round(number * 100) / 100;
};

export const calculateAverage = (scores: any[]) => {
  const scoresFilter = scores.filter(o => o !== '');  
  const sum = (scoresFilter ?? []).reduce((a, b) => Number(a) + Number(b), 0);
  return sum > 0 ? roundNumber(Number(sum) / scoresFilter.length) : 0;
};

export const getDatesBetween = (from: Dayjs, to: Dayjs) => {
  if(from || to) return [];
  
  const dates: Dayjs[] = [from];
  let date: Dayjs = from;  
  do{
    date = date.add(1, 'day');
    dates.push(date);
  }
  while (date.isBefore(to));

  return dates;
};

export const getGender = (value: boolean) => {
  return value ? 'Nam': 'Nữ';
};

export const hexToRGB = (hex: string, alpha?: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha ?? 1 + ')';
};
