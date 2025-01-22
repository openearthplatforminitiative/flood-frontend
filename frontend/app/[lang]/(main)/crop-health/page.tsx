'use client';

import { ContentContainer } from '@/app/components/ContentContainer';
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
      <ContentContainer>
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
        <Box className="mt-5 flex flex-col lg:flex-row gap-2 lg:gap-5 lg:flex-wrap">
          {(image || data) && (
            <>
              <Box className="flex-1 h-fit rounded-3xl overflow-hidden">
                {image && (
                  <img
                    width="100%"
                    id="preview"
                    src={image}
                    alt="upload-preview"
                  />
                )}
              </Box>
              <Box className="flex-1 p-5 bg-neutral-90 rounded-3xl">
                <h2 className="text-6xl mb-5">Data</h2>
                <Box className="flex-1 flex justify-start items-start flex-wrap gap-5">
                  {data ? (
                    Object.keys(data).map((key) => {
                      return (
                        <Box
                          key={key}
                          className="flex-1 flex items-center gap-2"
                        >
                          <Box className="w-[100px] h-[100px]">
                            <Gauge
                              sx={{ width: '100px', height: '100px' }}
                              width={100}
                              height={100}
                              value={parseFloat((data[key] * 100).toFixed(2))}
                            />
                          </Box>
                          <Typography className="min-w-[100px] flex-grow">
                            {GetCropHealthTranslation(
                              key as keyof CropHealthData
                            )}
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
      </ContentContainer>
    </>
  );
};

export default CropHealth;
