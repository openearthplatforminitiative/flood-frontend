'use client';

import {
  Button,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  Close,
} from '@mui/icons-material';
import { WeatherDay } from './WeatherWidget';
import Image from 'next/image';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { getDayOfWeek } from '@/app/helpers/timestampToLocalDate';

type WeatherForecastModalProps = {
  lang: string;
  open: boolean;
  dayIndex: number;
  weatherDays: WeatherDay[];
  handleClose: () => void;
  handleNext: (index: number) => void;
};

export const WeatherForecastModal = ({
  lang,
  open,
  dayIndex,
  weatherDays,
  handleClose,
  handleNext,
}: WeatherForecastModalProps) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  const selectedDay = weatherDays[dayIndex];
  const displayHour = (date: Date) => {
    let hour = date.getHours();
    // if length is 1, add a 0 in front

    if (hour === 0) hour = 23;
    else hour -= 1;
    if (hour < 10) return '0' + hour;
    return hour;
  };

  const dateFormatted = (date: Date) => {
    if (dayIndex === 0) {
      return dict.time.today + ' ' + date.toLocaleDateString();
    } else {
      return getDayOfWeek(date, lang) + ' ' + date.toLocaleDateString();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="w-full h-full flex justify-center items-start md:py-12 md:px-4">
        <div className="relative overflow-y-scroll w-full h-full md:max-w-[800px] md:h-auto max-h-full bg-neutralVariant-98 p-4 md:p-6 md:rounded-xl ">
          <Typography variant="h4">
            {dateFormatted(selectedDay.date)}
          </Typography>
          <div className="absolute top-2 right-2">
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <Button
              variant="outlined"
              disabled={dayIndex === 0}
              onClick={() => handleNext(dayIndex - 1)}
            >
              <ArrowBack />
              {dict.time.previousDay}
            </Button>
            <Button
              variant="outlined"
              disabled={dayIndex === weatherDays.length - 1}
              onClick={() => handleNext(dayIndex + 1)}
            >
              {dict.time.nextDay}
              <ArrowForward />
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{dict.sites.weather.temperature}</TableCell>
                <TableCell>{dict.sites.weather.precipitation}</TableCell>
                <TableCell>{dict.sites.weather.wind}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedDay.weatherHours.map((weather, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>
                      {displayHour(weather.from)}
                      {weather.to && '-' + displayHour(weather.to)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {weather.symbol && (
                      <Image
                        width={30}
                        height={30}
                        alt={weather.symbol}
                        src={require(
                          `@/public/assets/images/weather-icons/${weather.symbol}.svg`
                        )}
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {weather.temperature !== undefined && (
                      <Typography
                        className={
                          weather.temperature > 0
                            ? 'text-red-800'
                            : 'text-blue-800'
                        }
                      >
                        {weather.temperature}°C
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Typography className="text-blue-800">
                      {weather.precipitation > 0 && weather.precipitation}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>
                      {weather.wind}
                      <ArrowDownward
                        sx={{
                          rotate: `${weather.windDirection}deg`,
                        }}
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Modal>
  );
};
