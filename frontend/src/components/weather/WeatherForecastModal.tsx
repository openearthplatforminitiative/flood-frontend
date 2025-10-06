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
import Image from 'next/image';
import { Dict } from '@/utils/dictionaries';
import { WeatherDayForecast } from './WeatherForecastActions';

type WeatherForecastModalProps = {
  dict: Dict;
  open: boolean;
  dayIndex: number;
  weatherDaysForecast: WeatherDayForecast[];
  handleClose: () => void;
  handleNext: (index: number) => void;
};

export const WeatherForecastModal = ({
  dict,
  open,
  dayIndex,
  weatherDaysForecast,
  handleClose,
  handleNext,
}: WeatherForecastModalProps) => {
  const selectedDay = weatherDaysForecast[dayIndex];

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="w-full h-full flex justify-center items-start md:py-12 md:px-4 pointer-events-none">
        <div className="relative overflow-y-scroll w-full h-full md:max-w-[800px] md:h-auto max-h-full pointer-events-auto bg-neutralvariant-98 md:rounded-xl ">
          <div className="sticky flex flex-col gap-4 top-0 w-full bg-neutralvariant-98 p-4 md:p-6 z-20">
            <Typography variant="h4">{selectedDay.formatted}</Typography>
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
                disabled={dayIndex === weatherDaysForecast.length - 1}
                onClick={() => handleNext(dayIndex + 1)}
              >
                {dict.time.nextDay}
                <ArrowForward />
              </Button>
            </div>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  {dict.sites.weather.temperature}
                </TableCell>
                <TableCell align="right">
                  {dict.sites.weather.precipitation}
                </TableCell>
                <TableCell align="right">{dict.sites.weather.wind}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedDay.weatherHours.map((weather, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{weather.formatted}</Typography>
                  </TableCell>
                  <TableCell>
                    {weather.symbol && (
                      <Image
                        width={30}
                        height={30}
                        alt={weather.symbol}
                        src={`/assets/images/weather-icons/${weather.symbol}.svg`}
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
