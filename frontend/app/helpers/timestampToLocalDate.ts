import { Dict, getDictonaryWithDefault } from '../[lang]/dictionaries';

const find = require('tz-lookup');

export const getLocalTime = (
  date: string | number | Date,
  coordinates: [number, number]
) => {
  const timeZone = find(coordinates[0], coordinates[1]);
  const utcDate = new Date(date);
  const localDate = new Date(
    utcDate.toLocaleString('en-US', { timeZone: timeZone })
  );
  if (localDate.getMinutes() > 0) {
    localDate.setMinutes(0);
  }
  return localDate;
};

export const getTimezoneDifferenceInHours = (coordinates: [number, number]) => {
  const utcDate = new Date();
  utcDate.setHours(13);
  utcDate.setMinutes(0);
  utcDate.setSeconds(0);
  const localDate = getLocalTime(utcDate, coordinates);

  return localDate.getHours() - utcDate.getHours();
};

export const getMETHour = (timeZoneDiffFromUTC: number, hour: number) => {
  // Because the MET api only provides data for 00:00, 06:00, 12:00, 18:00, we need to adjust the hour and select the nearest available data
  const pattern = [0, 1, 2, 3, -2, -1];
  let index = ((timeZoneDiffFromUTC % 6) + 6) % 6;
  return hour + pattern[index];
};

export const getMetDate = (
  timeZoneDiffFromUTC: number,
  date: string | number | Date
) => {
  const dateCopy = new Date(date);
  dateCopy.setHours(getMETHour(timeZoneDiffFromUTC, dateCopy.getHours()));
  return dateCopy;
};

export const getDayOfWeek = (date: Date, lang: string) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  const days = [
    dict.time.sunday,
    dict.time.monday,
    dict.time.tuesday,
    dict.time.wednesday,
    dict.time.thursday,
    dict.time.friday,
    dict.time.saturday,
  ];
  return days[date.getDay()];
};
