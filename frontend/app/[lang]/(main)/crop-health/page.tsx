'use client';

import Header from '@/app/components/Header';
import { cropHealthClient } from '@/lib/openepi-clients';
import { Box, Button, Input, Typography } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import { useState } from 'react';

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

const CropHealth = () => {
  const [image, setImage] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];

    var reader = new FileReader();

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
      <Header title="Crop Health" />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      >
        Upload file
        <Input
          sx={{ display: 'none' }}
          type="file"
          onChange={handleFileUpload}
        />
      </Button>
      {data && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'start',
            gap: 5,
          }}
        >
          {Object.keys(data).map((key) => {
            return (
              <Box
                key={key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  flex: 2,
                  gap: 1,
                }}
              >
                <Gauge
                  sx={{ width: '100px', height: '100px', flex: 1 }}
                  width={100}
                  height={100}
                  value={parseFloat((data[key] * 100).toFixed(2))}
                />
                <Typography flex={1}>
                  {GetCropHealthTranslation(key as keyof CropHealthData)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
      {image && (
        <Box
          sx={{
            height: 'fit-content',
            borderRadius: '2rem',
            overflow: 'hidden',
          }}
        >
          <img width="100%" id="preview" src={image} alt="upload-preview" />
        </Box>
      )}
    </>
  );
};

export default CropHealth;
