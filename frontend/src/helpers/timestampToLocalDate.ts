import { Dict, getDictionaryWithDefault } from '@/app/[lang]/dictionaries';
import { DateTime } from 'luxon';
import find from 'tz-lookup';

export const getLocalTime = (date: DateTime, coordinates: [number, number]) => {
  const timeZone = find(coordinates[0], coordinates[1]);
  const localDate = date.setZone(timeZone);
  return localDate;
};

export const getTimezoneDifferenceInMinutes = (
  coordinates: [number, number]
) => {
  const localTime = getLocalTime(DateTime.utc(), coordinates);
  return localTime.offset;
};

export const getMETHour = (localDateTime: DateTime, hour: number) => {
  // Because the MET api only provides data for 00:00, 06:00, 12:00, 18:00, we need to adjust the hour and select the nearest available data
  const pattern = [0, 1, 2, 3, -2, -1];
  const offset = localDateTime.offset;
  const index = ((Math.floor(offset / 60) % 6) + 6) % 6;
  return hour + pattern[index];
};

export const getMetDate = (localDateTime: DateTime) => {
  return localDateTime.set({
    hour: getMETHour(localDateTime, localDateTime.hour),
    minute: localDateTime.offset % 60,
  });
};

export const getDayOfWeek = (date: Date, lang: string) => {
  const dict: Dict = getDictionaryWithDefault(lang);
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
