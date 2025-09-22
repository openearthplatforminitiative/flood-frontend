'use client';

import { Button, Box, Typography, Input } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useState } from 'react';
import { Yard } from '@mui/icons-material';
import Image from 'next/image';
import { Dict } from '../../dictionaries';

type CropHealthData = {
  ALS: number;
  ANT: number;
  BR: number;
  BS: number;
  CBSD: number;
  CMD: number;
  CSSVD: number;
  FAW: number;
  FW: number;
  HLT: number;
  MLB: number;
  MLN: number;
  MSV: number;
};

const CropHealthTranslation: Record<keyof CropHealthData, string> = {
  ALS: 'Angular Leaf Spot',
  ANT: 'Anthracnose',
  BR: 'Bean Rust',
  BS: 'Black Sigatoka',
  CBSD: 'Cassava Brown Streak Disease',
  CMD: 'Cassava Mosaic Disease',
  CSSVD: 'Cocoa Swollen Shoot Virus Disease',
  FAW: 'Fall Armyworm',
  FW: 'Fusarium Wilt Race 1',
  HLT: 'Healthy Crop',
  MLN: 'Maize Lethal Necrosis',
  MLB: 'Maize Leaf Blight',
  MSV: 'Maize Streak Virus',
};

const GetCropHealthTranslation = (key: keyof CropHealthData) => {
  return CropHealthTranslation[key];
};

type CropHealthProps = {
  dict: Dict;
};

export const CropHealth = ({ dict }: CropHealthProps) => {
  const [image, setImage] = useState<string>();
  const [data, setData] = useState<CropHealthData>();

  const [expanded, setExpanded] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (fileReaderEvent: ProgressEvent<FileReader>) => {
      if (!fileReaderEvent.target?.result) {
        console.log('No file reader target result');
        return;
      }
      setImage(fileReaderEvent.target.result as string);
    };

    await fetch('/api/crop-health', {
      method: 'POST',
      body: file,
    }).then((response) => {
      response.json().then((response) => {
        if (response.status === 'success') {
          setData(response.data);
        }
      });
    });
  };

  return (
    <>
      {image || data ? (
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          {dict.cropHealth.uploadNewImage}
          <Input
            sx={{ display: 'none' }}
            type="file"
            onChange={handleFileUpload}
          />
        </Button>
      ) : (
        <Box className="flex flex-col p-6 rounded-xl gap-5 border-2 border-gray-600 border-dashed justify-center items-center bg-neutral-90">
          <Yard className="text-9xl" />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
          >
            {dict.cropHealth.uploadImage}
            <Input
              sx={{ display: 'none' }}
              type="file"
              onChange={handleFileUpload}
            />
          </Button>
        </Box>
      )}
      <Box className="mt-5 flex flex-col lg:flex-row gap-2 lg:gap-5 lg:flex-wrap">
        {(image || data) && (
          <>
            <Box className="flex-1 h-fit rounded-3xl overflow-hidden">
              {image && (
                <Image
                  width={400}
                  height={400}
                  id="preview"
                  src={image}
                  alt="upload-preview"
                  className="object-cover w-full"
                />
              )}
            </Box>
            <Box className="flex-1 xs:p-0 lg:p-5 rounded-3xl">
              <Box
                className="flex-1 flex flex-wrap gap-5"
                onClick={() => setExpanded(!expanded)}
              >
                {data ? (
                  (Object.keys(data) as Array<keyof CropHealthData>)
                    .sort((a, b) => {
                      if (a === 'HLT') return -1; // Always put HLT first
                      if (b === 'HLT') return 1;
                      return data[b] - data[a];
                    })
                    .map((key) => {
                      if (data[key] * 100 < 2) return null;

                      const gaugeColor = (keyData: number) => {
                        const lowColor = ['#FFDF8C', '#F9CB54'];
                        const mediumColor = ['#FC9090', '#E34848'];
                        const highColor = ['#4A06A2', '#692CB7'];
                        const healthyColor = ['#1C8855', '#3EA26D'];

                        if (key === 'HLT') return healthyColor;

                        if (keyData * 100 > 2 && keyData * 100 < 30)
                          return lowColor;
                        if (keyData * 100 >= 30 && keyData * 100 < 90)
                          return mediumColor;
                        else return highColor;
                      };

                      return (
                        <Box
                          key={key}
                          className="flex-1 flex-col items-start gap-2 rounded-lg cursor-pointer"
                          sx={{
                            backgroundColor:
                              key === 'HLT'
                                ? '#D1E8D5' // Light Green
                                : data[key] * 100 > 90
                                  ? '#F9D6FF' // Light Purple
                                  : data[key] * 100 > 30
                                    ? '#FFD9D9' // Light Red
                                    : '#FFF7E1', // Light Yellow
                            padding: '10px',
                          }}
                        >
                          <Box className="flex-1 flex items-center">
                            <Gauge
                              cornerRadius="50%"
                              innerRadius="80%"
                              outerRadius="100%"
                              sx={{
                                [`& .${gaugeClasses.valueArc}`]: {
                                  fill: `url(#Gradient${key})`,
                                },
                                [`& .${gaugeClasses.valueText}`]: {
                                  fontSize: '1.5rem',
                                },
                              }}
                              width={100}
                              height={100}
                              value={parseFloat((data[key] * 100).toFixed(0))}
                              text={({ value }) => `${value}%`}
                            >
                              <linearGradient
                                id={'Gradient' + key}
                                x1="0%"
                                y1="100%"
                                x2="0%"
                                y2="0%"
                              >
                                <stop
                                  offset="0%"
                                  stopColor={gaugeColor(data[key])[0]}
                                />
                                <stop
                                  offset="100%"
                                  stopColor={gaugeColor(data[key])[1]}
                                />
                              </linearGradient>
                            </Gauge>
                          </Box>
                          <Typography
                            className={`min-w-[100px] grow text-center lg:hover:line-clamp-none ${
                              expanded ? 'line-clamp-none' : 'line-clamp-2'
                            }`}
                          >
                            {GetCropHealthTranslation(key)}
                          </Typography>
                        </Box>
                      );
                    })
                ) : (
                  <>Loading...</>
                )}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
